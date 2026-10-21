// ===================================================================
// ELEMENTUM · content/almanac — Your Almanac's units (EVT-1)
// ===================================================================
// Station-generated once the batch lands (sealed writers → station JSON →
// this module). Keys, as ruled in rounds 1–3:
//   ENERGY <el> · <day|month|year>.<state>[.a|.b]   the energy line
//   TEMPLATED tpl_almanac · ground.<relation>          the ground underneath
//   TEMPLATED tpl_almanac · land.<day|month>.<kind>.<gate>
//   TEMPLATED tpl_almanac · head.energy.<el>.<grow|release|even>
//   TEMPLATED tpl_almanac · head.land.<kind>.<gate> / head.<mark|return|turned|void|star>
//   GOD <id> · favours.<day|month>.<Domain>.<helping|heavy>   "lean|over"
//   TEMPLATED tpl_almanac · favours_land.<kind>.<gate>          "lean|over"
//   TEMPLATED tpl_almanac · echo.<gate> / pillar.<return|turned> / mark.<…> / season.<…>
//   PUSH · <code>
// Until then every unit renders its draft line, tagged "draft" (B3).
// ===================================================================
export const ALMANAC_UNITS = {};
