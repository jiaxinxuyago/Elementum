// ===================================================================
// ELEMENTUM · Geocoding service
// Wraps the Open-Meteo Geocoding API — free, no API key, returns
// structured city results with longitude/latitude/country/population.
// https://open-meteo.com/en/docs/geocoding-api
//
// Per DOC5 §22: on any failure (network, no match, API error) the
// caller falls back silently to Beijing longitude (120°E). This
// module returns an empty array on failure; it never throws.
// ===================================================================

const ENDPOINT = 'https://geocoding-api.open-meteo.com/v1/search';
const DEFAULT_COUNT = 5;

/**
 * Search for cities matching a user-typed query.
 * @param {string} query - partial or full city name
 * @param {object} [opts]
 * @param {number} [opts.count=5] - max results to return
 * @param {AbortSignal} [opts.signal] - abort signal for debouncing
 * @returns {Promise<Array<City>>}
 */
export async function searchCities(query, opts = {}) {
  const q = (query || '').trim();
  if (q.length < 2) return []; // too short — wait for more characters

  const count = opts.count ?? DEFAULT_COUNT;
  const url = `${ENDPOINT}?name=${encodeURIComponent(q)}&count=${count}&language=en&format=json`;

  try {
    const res = await fetch(url, { signal: opts.signal });
    if (!res.ok) return [];
    const data = await res.json();
    const results = Array.isArray(data?.results) ? data.results : [];

    // Map to a compact shape we actually use.
    return results.map((r) => ({
      id: r.id,
      name: r.name,
      admin1: r.admin1 || null, // state / province
      admin2: r.admin2 || null, // county / region
      country: r.country || null,
      countryCode: r.country_code || null,
      latitude: r.latitude,
      longitude: r.longitude,
      timezone: r.timezone || null,
      population: r.population ?? null,
    }));
  } catch (err) {
    // Network failure, abort, CORS error, whatever — return empty.
    // Step5_Location will keep whatever the user typed and the calc
    // will silently use Beijing longitude at chart time (DOC5 §22).
    if (err?.name !== 'AbortError') {
      console.warn('[geocoding] searchCities failed:', err?.message || err);
    }
    return [];
  }
}

/**
 * Format a city result for single-line display:
 *   "London · England · United Kingdom"
 *   "Tokyo · Japan"       (when admin1 is absent)
 */
export function formatCityLine(city) {
  if (!city) return '';
  const parts = [city.name, city.admin1, city.country].filter(Boolean);
  return parts.join(' · ');
}

/**
 * Build the string that will be displayed inside the Location input
 * once the user has picked a suggestion.
 */
export function formatCityForInput(city) {
  if (!city) return '';
  const locale = city.admin1 ? `${city.admin1}` : '';
  const country = city.country || '';
  const tail = [locale, country].filter(Boolean).join(', ');
  return tail ? `${city.name}, ${tail}` : city.name;
}
