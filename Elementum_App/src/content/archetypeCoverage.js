// ===================================================================
// ELEMENTUM · Archetype coverage helper
//
// Walks an archetype record against the schema and reports, per field:
//   - present / missing / deprecated
//   - constraint violations (word caps, array length, enum mismatch)
//
// Used by the DevBar Schema panel to visualize field coverage for
// whichever stem is currently active.
// ===================================================================

import { ARCHETYPE_SCHEMA, cardinalityOf } from './archetypeSchema.js';

// A leaf descriptor is anything with a `type` string field.
function isLeaf(node) {
  return node && typeof node === 'object' && typeof node.type === 'string';
}

function countWords(str) {
  if (typeof str !== 'string') return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function countSentences(str) {
  if (typeof str !== 'string') return 0;
  // Rough: split on sentence-terminating punctuation.
  return str.split(/[.!?—·]+/).map(s => s.trim()).filter(Boolean).length;
}

function checkLeaf(value, leaf) {
  if (value === undefined || value === null || value === '') {
    return leaf.required ? 'missing' : 'optional-missing';
  }

  // Placeholder values are accepted but flagged — a known-generic fallback
  // that the field will eventually replace (e.g. identityIcon: 'ArchetypeSeal').
  if (Array.isArray(leaf.placeholderValues) && leaf.placeholderValues.includes(value)) {
    return `placeholder:${value}`;
  }

  const issues = [];

  // Type check (shallow)
  if (leaf.type === 'string' && typeof value !== 'string') issues.push('type');
  if (leaf.type === 'string[]' && !Array.isArray(value)) issues.push('type');
  if (leaf.type === 'object[]' && !Array.isArray(value)) issues.push('type');

  // String constraints
  if (typeof value === 'string') {
    const w = countWords(value);
    if (leaf.wordCap != null && w > leaf.wordCap) issues.push(`words>${leaf.wordCap}`);
    if (leaf.wordMin != null && w < leaf.wordMin) issues.push(`words<${leaf.wordMin}`);
    if (leaf.wordMax != null && w > leaf.wordMax) issues.push(`words>${leaf.wordMax}`);
    if (leaf.sentenceMin != null) {
      const s = countSentences(value);
      if (s < leaf.sentenceMin) issues.push(`sent<${leaf.sentenceMin}`);
    }
    if (leaf.splitOn && !value.includes(leaf.splitOn)) {
      issues.push(`missing "${leaf.splitOn}"`);
    }
  }

  // Array constraints
  if (Array.isArray(value)) {
    if (leaf.arrayLen != null && value.length !== leaf.arrayLen) {
      issues.push(`len=${value.length}≠${leaf.arrayLen}`);
    }
    if (leaf.arrayMin != null && value.length < leaf.arrayMin) {
      issues.push(`len<${leaf.arrayMin}`);
    }
    if (leaf.arrayMax != null && value.length > leaf.arrayMax) {
      issues.push(`len>${leaf.arrayMax}`);
    }
    if (leaf.itemWordCap != null) {
      const bad = value.filter(v => typeof v === 'string' && countWords(v) > leaf.itemWordCap).length;
      if (bad) issues.push(`${bad} item(s) >${leaf.itemWordCap}w`);
    }
    if (Array.isArray(leaf.valid)) {
      const bad = value.filter(v => !leaf.valid.includes(v));
      if (bad.length) issues.push(`invalid: ${bad.join(',')}`);
    }
  }

  // Enum-ish check for scalar values
  if (!Array.isArray(value) && Array.isArray(leaf.valid) && !leaf.valid.includes(value)) {
    issues.push(`not in valid set`);
  }

  return issues.length === 0 ? 'present' : `violates:${issues.join(';')}`;
}

export function walkSchema(schema, data, path = [], inherited = {}) {
  const rows = [];

  for (const [key, node] of Object.entries(schema)) {
    if (key === '_meta') continue;

    const here = [...path, key];
    const value = data != null ? data[key] : undefined;

    // Deprecated branch — flag the whole subtree and don't descend.
    const meta = node?._meta;
    if (meta?.status === 'deprecated') {
      rows.push({
        path: here.join('.'),
        kind: 'group',
        tier: meta.tier || inherited.tier || '—',
        varyBy: meta.varyBy ?? inherited.varyBy ?? null,
        status: 'deprecated',
        note: meta.note || 'deprecated',
      });
      continue;
    }

    // Resolve tier and varyBy from leaf → node._meta → inherited → default.
    const effectiveTier = node.tier || meta?.tier || inherited.tier || '—';
    const effectiveVaryBy = node.varyBy ?? meta?.varyBy ?? inherited.varyBy ?? null;

    if (isLeaf(node)) {
      rows.push({
        path: here.join('.'),
        kind: 'leaf',
        tier: effectiveTier,
        varyBy: effectiveVaryBy,
        cardinality: cardinalityOf(effectiveVaryBy),
        type: node.type,
        required: !!node.required,
        status: checkLeaf(value, node),
        value,
      });
      continue;
    }

    if (node && typeof node === 'object') {
      rows.push({
        path: here.join('.'),
        kind: 'group',
        tier: effectiveTier,
        varyBy: effectiveVaryBy,
        cardinality: cardinalityOf(effectiveVaryBy),
        section: meta?.section,
        status: value === undefined ? 'missing' : 'present',
      });
      rows.push(...walkSchema(
        node,
        value ?? {},
        here,
        { tier: effectiveTier, varyBy: effectiveVaryBy },
      ));
    }
  }

  return rows;
}

export function coverageSummary(rows) {
  let present = 0, missing = 0, violates = 0, optionalMissing = 0, deprecated = 0, placeholder = 0;
  for (const r of rows) {
    if (r.kind !== 'leaf') continue;
    if (r.status === 'present') present++;
    else if (r.status === 'missing') missing++;
    else if (r.status === 'optional-missing') optionalMissing++;
    else if (r.status === 'deprecated') deprecated++;
    else if (typeof r.status === 'string' && r.status.startsWith('violates')) violates++;
    else if (typeof r.status === 'string' && r.status.startsWith('placeholder')) placeholder++;
  }
  const total = present + missing + violates + placeholder;
  return { present, missing, violates, optionalMissing, deprecated, placeholder, total };
}

export function coverageFor(archetypeRecord) {
  const rows = walkSchema(ARCHETYPE_SCHEMA, archetypeRecord || {});
  return { rows, summary: coverageSummary(rows) };
}
