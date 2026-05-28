# Brief — Ten Heavenly Stem icons (天干)

I need 30 SVG icons: **10 stems × 3 variants**. Pure icon-design scope; do not engage with broader product.

Match the Five Element marks already shipping (see attached aesthetic reference `stems-aesthetic-reference.html`): monochrome silhouette, `fill="currentColor"`, evenodd cutouts allowed, 24×24 viewBox, no text. Each stem is a specific archetype *within* an element — the elements are the parent genus, the stems are 10 species (each element has one Yang stem and one Yin stem).

## The 10 stems — symbolic meaning

| # | Stem | Pinyin | Element / Polarity | Iconic object | Archetype |
|---|---|---|---|---|---|
| 1 | 甲 | Jiǎ | Wood / Yang | great tree · structural pillar | upright principled pioneer |
| 2 | 乙 | Yǐ | Wood / Yin | climbing vine · grass | pliant adaptive persister |
| 3 | 丙 | Bǐng | Fire / Yang | the sun · public blaze | generous warm giver |
| 4 | 丁 | Dīng | Fire / Yin | candle · oil lamp · ember | refined intimate keeper |
| 5 | 戊 | Wù | Earth / Yang | mountain · dyke · fortress | stubborn anchored guardian |
| 6 | 己 | Jǐ | Earth / Yin | cultivated soil · tilled garden | methodical nurturer |
| 7 | 庚 | Gēng | Metal / Yang | axe · sword · raw ore | decisive blunt warrior |
| 8 | 辛 | Xīn | Metal / Yin | jewelry · jade hairpin · fine knife | precise sensitive aesthete |
| 9 | 壬 | Rén | Water / Yang | ocean · great river · waterfall | wise expansive philosopher |
| 10 | 癸 | Guǐ | Water / Yin | dewdrop · mist · rain | gentle intuitive mystic |

**Yang** stems read larger / sharper / rawer. **Yin** stems read smaller / softer / refined. Each pair must read as the same word said in two registers.

## Hard rules

- `viewBox="0 0 24 24"` · `fill="currentColor"` · `evenodd` allowed for cutouts
- Pure SVG primitives only (`<path><circle><rect><line><polyline>`) — no `<text>`, `<filter>`, `<mask>`, `<image>`, `<style>` inside symbols
- ≥2 px optical margin from every edge
- Each stem must silhouette-rhyme with its parent element mark
- Recognisable at 16 px without context
- Forbidden: Western tarot, runes, fantasy/game iconography, Material Design glyphs. Stay rooted in Chinese material-culture imagery.

## Deliverables (30 symbols)

Per stem, three variants:
- **`-motif`** — the iconic object as filled silhouette (most likely canonical winner)
- **`-glyph`** — the hanzi character (甲乙丙丁戊己庚辛壬癸) drawn as a designed silhouette mark, not Noto font
- **`-fused`** — motif composed over the parent element silhouette as a quiet halo/base accent

IDs: `dm-jia-motif`, `dm-jia-glyph`, `dm-jia-fused` … `dm-gui-fused`.

## Output

Single self-contained HTML file: **`tier3-iconography-ten-stems.html`**. Live SVG rendering — no `<pre><code>` dumps, no base64 inlines.

Structure: 10 stem panels stacked. Each panel = stem-head (hanzi + pinyin + element-polarity chip) above 3 variant cards in a row. Each card = 72×72 icon-field with hero SVG at 52 px + 6-step scale row (12 / 16 / 20 / 24 / 28 / 36 px) + microcopy + `<code>` token. Color-tint each card to its parent element's Deep pigment:

```
--metalDeep #6a849a   --woodDeep #587a4d   --fireDeep #9e5540
--earthDeep #927750   --waterDeep #3e5f85
```

Add a Yang/Yin pair-comparison strip at the bottom: the 5 pairs at 36 px side by side, to sniff-test the same-word-two-registers discipline.

End with `<section id="drift">` — plain-text bullet list of compromises, rule-bends, or proposed bonus variants. Each ≤2 sentences.

End of brief.
