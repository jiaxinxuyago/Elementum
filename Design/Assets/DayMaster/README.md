# Day Master page paintings (D1–D3 × 10 stems)

The 30 painted masters for the Day Master reading page, one set of three per Day Master stem. Painted 2026-10-27 at fidelity F2 (xieyi freehand), as ruled by the owner on the Blade Fidelity comparison.

| File | Card on the page | Ratio | From the station field |
|---|---|---|---|
| `dm-{py}-d1.jpg` | 2 · The sign | 16:9 | `dm_overview` |
| `dm-{py}-d2.jpg` | 3 · Your nature | 4:5 | `inscription` and `yourNature_desc` |
| `dm-{py}-d3.jpg` | 5 · How your edge is built | 1:1 | `dm_mechanism` |
| `dm-{py}-stage.jpg` | the screen's stage, under every card | 4:5 | the stem's season and ground |

`{py}` is the stem's pinyin: jia 甲, yi 乙, bing 丙, ding 丁, wu 戊, ji 己, geng 庚, xin 辛, ren 壬, gui 癸.

- **These are masters**, at the size the model painted them (1536×864, 1024×1280, 1024×1024), saved as JPG at quality 90. The lossless originals are in the Figma file "Elementum · Day Master illustrations (D1–D3)".
- **The app copies** are in `Elementum_App/public/concept-arts/stems/dm/{py}-d{n}.png`. They are cover-cropped to 1280×720, 880×1100 and 1000×1000, and palette-compressed under 300 KB each. Regenerate them from these masters, never by editing them in place.
- **Subjects and prompts** are in `Design/Library/Design_Pass_2026-10/D1-D3_Day_Master_Illustrations_Brief.md`.
- **How the page uses them** (`InkArt` in `MergedViews.jsx`, `.dmp-ink` in `merged.css`): each painting is multiplied onto the cardstock after a filter lifts its paper to white, so only the ink lands on the card. Masks dissolve every edge. D1 bleeds off the top of its card, D2 is a column the text flows around, and D3 closes its card from the bottom-right corner.

- **The stage** (owner 2026-10-27: no empty space over 40% of the screen): one ground painting per stem, its scene in the lower half. It sits along the foot of the Day Master screen (`dmStage` in `MergedViews.jsx`, `.dmp-stage` in `merged.css`), so the short cards (1, 5 and 6 measured 43–62% empty) stand on the stem's own ground instead of bare paper. Repainted the same day after the owner's notes "too detailed for the background, apply the minimal shanshui aesthetic" and "take the background assets as the direction". Each stage is now a level-distance (平远) landscape in the manner of Ni Zan and Ma Yuan: the scene is a thin band in the bottom fifth, made of very few strokes, with pale ink, mist between the planes, and the rest left as blank paper (留白). It is toned on screen like the house plates in `Design/Assets/Backgrounds` (warm, pale, no contrast boost). Reusing `bg-onboarding-03-bottom-anchor` directly was compared and set aside: it is generic and lays a muddier band across every stem. The first, detailed stages are in git history at commit b2a26f5a.
