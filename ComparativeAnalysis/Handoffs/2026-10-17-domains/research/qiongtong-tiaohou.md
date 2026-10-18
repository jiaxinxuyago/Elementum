# 穷通宝鉴 调候用神 table — research summary

Data: `qiongtong-tiaohou.json` (same folder). 120/120 cells filled; every quote was checked to be a verbatim substring of the Wikisource text.

## Sources

- **A — Wikisource 《穷通宝鉴》** (base text, quotes come from here; raw wikitext via `?action=raw`): https://zh.wikisource.org/wiki/%E7%A9%B7%E9%80%9A%E5%AE%9D%E9%89%B4
- **B — 古文岛/古诗文网 《穷通宝鉴》 卷二–卷六** (independent transcription of the same 穷通宝鉴本 text): https://m.gushiwen.cn/guwen/book_112f16f9deeb.aspx — 论木 https://m.gushiwen.cn/guwen/bookv_bbc940bfd959.aspx, 论火 https://m.gushiwen.cn/guwen/bookv_ef269d9ba448.aspx, 论土 https://m.gushiwen.cn/guwen/bookv_4d487c9bc133.aspx, 论金 https://m.gushiwen.cn/guwen/bookv_5a069b0a3ca6.aspx, 论水 https://m.gushiwen.cn/guwen/bookv_0c21f7ba5b30.aspx
- **X — 徐乐吾 评注本 (《造化元钥评注》)**, serialised on 大家找, one page per stem-month (IDs 6079–6210): https://www.dajiazhao.com/sm/qtbj/ (e.g. 三月庚金 https://www.dajiazhao.com/sm/qtbj/6165.html)
- **T — "十干喜用提要" summary table** ("节录於穷通宝鉴和造化元钥", 炎黄午阳 blog): https://blog.sina.com.cn/s/blog_4a66051f01018z6g.html; copies: https://blog.sina.com.cn/s/blog_62b4d8cb010169v0.html, https://www.sina.cn/news/detail/4739154715345105.html
- **D — 王鸣 variant summary table**: https://blog.sina.com.cn/s/blog_67cfcf33010312qf.html
- **E — yi958 "十天干生十二月调候用神诀"** (T's notes without stem lists): https://bz.yi958.com/Article_6607.html
- **F — 太极书馆 8bei8** (己土 spot-check; same lineage as A): https://www.8bei8.com/book/qiongtongbaojian_7.html

Not reachable from this environment: ctext.org (403/anti-scrape), zhihu (403), douban (security redirect), blog.udn.com (403), 360doc (DNS). No print edition was checked.

## How cells were filled

- `primary` = the stems the month's own line names as 用, in the book's order (先X次Y, X为君Y为臣, X为尊, 专用X; "X为先，Y次之" counts both). `secondary` = third-tier and support stems (佐/辅/酌用/再次/亦不可少). `avoid` = stems marked 忌/病/嫌/不宜 for that month.
- Two keys were added beyond the requested shape: `conditional` (stems used only in a stated situation or as a fallback, with the condition) and `summary_table` (T's list, for comparison). `month` is also included.
- Example: 庚 辰 → primary 甲, 丁 (先甲后丁, "不用庚噼甲"), secondary none, conditional 癸 (支成火局) / 壬 (丙丁出干). T folds those conditionals into its list: 甲丁壬癸.
- Where A has no separate paragraph for a month (乙 十二月 is labelled 十一月; 丁 七–十二月, 戊 正/二月 and 己 四–十二月 are given only by season), the season rule fills each month and X's per-month page was checked.

## Disagreements: 36 cells (18 substantive, 18 minor)

**Overall pattern:** A, B and X mostly agree with each other. Most substantive conflicts come from the T summary table that apps copy: it often reorders the stems (甲 申/酉: T puts 庚 first, the text puts 丁 first) or merges conditional stems into the main list (庚 寅: T 戊甲壬丙丁 vs the text 丙甲, then 丁). Where T and the text differ, `primary` follows the text.

### Substantive

| Cell | Month | Note |
|---|---|---|
| 甲卯 | 二月 | 徐乐吾本 (造化元钥评注) adds '正二月甲木一例，木乘旺气，无金必殃，先看庚、次取丁' (庚 then 丁); summary table lists 庚丙丁戊己 (专用庚金，以戊己滋杀为佐，无庚用丙丁泄秀). Wikisource/古文岛 only give 庚 + 财 (戊己) support, with 丁 as the alternative when 庚 is absent; 丙 is not named for 二月. |
| 甲辰 | 三月 | Summary table (and 王鸣 table) give 庚丁壬 with 丁 second (用庚金必须丁火制之); all three texts (Wikisource, 古文岛, 徐乐吾本 '先取庚，次取壬') say 先庚后壬 and that 三月无用丁之法 unless 支成金局. |
| 甲巳 | 四月 | Summary table orders 癸庚丁 (庚 before 丁); texts say 先癸后丁 with 庚 as support (徐乐吾本: 先癸次丁，又须有庚透); 王鸣 table has 癸丁庚, matching the text. |
| 甲午 | 五月 | Summary table orders 癸庚丁; text says 先癸后丁、庚金次之 (王鸣 table 癸丁庚 matches the text). The text also allows 木盛先庚. |
| 甲未 | 六月 | Summary table gives 癸庚丁 (上半月同五月用癸，下半月用庚丁); the text gives 先丁后庚、无癸亦可 with no 上/下半月 split; 王鸣 table gives 癸丁壬. |
| 甲申 | 七月 | Summary table (and 王鸣) give 庚丁壬 with 庚 first (yi958 note: 先用庚，再取丁…无丁用壬); all texts (incl. 徐乐吾本 '总之七月甲木，丁火为尊，庚金次之') put 丁 first. |
| 甲酉 | 八月 | Summary table (and 王鸣) give 庚丁丙 with 庚 first; all texts say 丁火为先，次用丙火，庚金再次. |
| 甲戌 | 九月 | Summary table gives 庚甲丁壬癸 (土旺者用甲木，木旺者用庚金，丁壬癸为佐), demoting 丁壬癸 to supports; the text makes 丁 (with 癸/壬) the main use and 庚 indispensable (凡四季甲木，总不外乎庚金); 甲 as a 用 is not in the text. |
| 甲丑 | 十二月 | Summary table gives 丁庚丙 (丁火必不可少…用庚劈甲引丁) with 丁 first and adds 丙; the text orders 先庚…故丁次之 (while saying 乏丁无用) and names no 丙 (only 徐乐吾's commentary adds 不能无丙解冻). |
| 丁寅 | 正月 | Summary table (and 王鸣) list 甲庚 (甲 first; note 用庚金劈甲引丁); Wikisource/古文岛 say 姑用庚金 (甲 is already 月令); 徐乐吾本 says 先庚次壬. |
| 戊戌 | 九月 | Summary table (and 王鸣) order 甲丙癸; all texts (incl. 徐乐吾本 '先看甲木，次取癸水，再取丙火') order 甲癸丙 and say 不可专用丙. |
| 己申 | 七月 | 癸/丙 order: Wikisource & 古文岛 '癸先丙后…先癸后丙' (徐乐吾本 三秋总论 also '先透癸，次透丙'), but 徐乐吾本's closing line reads '先丙后癸', and the summary table (and 王鸣) give 丙癸. |
| 己酉 | 八月 | Same 癸/丙 order conflict as 申: texts 先癸后丙 vs 徐乐吾本 closing line and summary table 丙癸. |
| 己戌 | 九月 | Summary table gives 甲丙癸 (九月土盛，宜甲木疏之，次用丙癸); text agrees 甲 comes first but its 三秋 rule is 先癸后丙 (徐乐吾本 closing line 先丙后癸). |
| 庚寅 | 正月 | Summary table orders 戊甲壬丙丁 (王鸣 戊甲丙壬丁), putting 戊 first; the text says 先用丙…须甲 (丙甲为上，丁火次之), with 戊 only when 火多 and 壬 only for 支成火局. 徐乐吾本 has 先用丙…次甲 but its summary line reads '用甲为上，丁火次之'. |
| 庚子 | 十一月 | 徐乐吾本 reads '十一月天气严寒，仍先取丙照' and comments 丙之为用，重於丁甲 (丙 first); Wikisource/古文岛 and the summary table give 丁甲 then 丙. |
| 辛子 | 十一月 | Summary table (and 王鸣) give 丙戊壬甲 with 丙 first (冬月辛金，不能缺丙火温暖); 徐乐吾's commentary also puts 丙 first (尤以丙火调候为先). The text says 壬丙两透 with no explicit 先/次, so primary keeps the text's order. |
| 壬午 | 五月 | 徐乐吾本 reads '取庚为君，癸为臣' (庚 first); Wikisource/古文岛 read '取癸为用，取庚为佐'; the summary table lists 癸庚辛 but its note says 取庚为源，取癸为佐. |

### Minor

| Cell | Month | Note |
|---|---|---|
| 乙未 | 六月 | 徐乐吾本 reads 丙癸两透，大富大贵 where Wikisource/古文岛 read 癸水透干，大富大贵; same stems, slightly more weight on 丙. |
| 乙亥 | 十月 | 徐乐吾本: 丙为尊，或壬多，用戊土 — 戊 only when 壬 is heavy; table 丙戊. |
| 乙丑 | 十二月 | Wikisource and 古文岛 have no 十二月乙木 heading: the 寒谷回春 paragraph is labelled 十一月乙木 (evident slip); 徐乐吾本 has it as 十二月乙木 ('十二月寒木见丙，有回春之意'). Stems agree (专用丙). |
| 丙午 | 五月 | Textual variant: Wikisource 得壬高透; 古文岛 '五月丙火愈炎，得壬庚高透'; 徐乐吾本 '得二壬一庚出干' — the latter two make 庚 co-primary with 壬 (table 壬庚). |
| 丁亥 | 十月 | Wording/order variant in the 三冬 rule: Wikisource/古文岛 '耑用庚甲。甲乃庚之良友'; 徐乐吾本 '专用甲庚，庚乃甲之良友'. All agree on the conclusion 甲木为尊，庚金佐之 (table 甲庚). |
| 丁子 | 十一月 | Same 三冬 wording variant as 亥 (耑用庚甲 vs 专用甲庚); conclusion 甲尊庚佐 agrees. |
| 丁丑 | 十二月 | Wikisource/古文岛 have no separate 十二月丁火 paragraph (covered by 三冬丁火); same 庚甲/甲庚 wording variant as 亥; table 甲庚 agrees. |
| 戊寅 | 正月 | 古文岛 drops 甲 ('正二月先丙後，癸又次之') — transcription slip; Wikisource, 徐乐吾本 and the table agree on 丙甲癸. |
| 戊卯 | 二月 | Same 古文岛 slip as 寅 (drops 甲); other sources agree on 丙甲癸. |
| 己子 | 十一月 | Summary table lists 丙甲戊 for 子/丑 too (壬水太旺取戊土制之); the text reserves 戊 for 初冬壬旺 (亥) or when 壬 is heavy. |
| 己丑 | 十二月 | Same as 子: table lists 丙甲戊; text uses 戊 only against heavy 壬. |
| 庚辰 | 三月 | 古文岛 reads 得丁甲丙透 where Wikisource reads 得丁甲两透 (transcription variant). 徐乐吾本 phrases the rule as 先用甲疏土，次用丁火煅炼成器. Summary table 甲丁壬癸 folds in the conditional 壬/癸 (支火宜癸，干火宜壬). |
| 庚亥 | 十月 | 徐乐吾本: 用丁不离甲木，丁为主，丙甲为佐 (丙 as support rather than co-primary); summary table 丁丙 (甲木辅丁). |
| 癸寅 | 正月 | 古文岛 reads '丙亦可少' (drops 不), contradicting Wikisource '丙亦不可少' and the table note 丙不可少 — transcription slip. |
| 癸辰 | 三月 | 徐乐吾本: '鼓雨后虽用丙火，还宜辛金佐之…若生下半月，丙虽不可少，然必须庚金蓄源' (names 辛/庚 rather than 辛甲); Wikisource/古文岛 and table: 丙辛甲. |
| 癸酉 | 八月 | 古文岛 reads '丙辛怕用' for Wikisource '丙辛皆用' (transcription slip). |
| 癸亥 | 十月 | 徐乐吾's commentary argues 亥月 normally takes 丙 for 调候 (与十一月一理共推), using 庚辛 only when 卯未 form a 木局; base text and table give 庚辛 (戊丁 conditional). |
| 癸子 | 十一月 | 古文岛 reads '要不见壬透' (only 壬) where Wikisource reads '要不见壬癸'. |

### Summary-table copy variants (not counted per cell)

- T (炎黄午阳 copy) 辛 子: "丙，戊，壬，申" — 申 is a typo for 甲 (the JSON stores 丙戊壬甲).
- T2 (sina blog_62b4d8cb010169v0 copy) 辛 丑: "壬，戊，己", dropping 丙, although its own note says 丙先壬后. T has 丙壬戊己.
- All D (王鸣) vs T differences (those that matter for a cell are also noted in the tables above; D adds its own paraphrased notes and has an evident typo at 丁午, 寅 for 庚):
  - 甲巳: T 癸庚丁 / D 癸丁庚
  - 甲午: T 癸庚丁 / D 癸丁庚
  - 甲未: T 癸庚丁 / D 癸丁壬
  - 丙巳: T 壬癸庚 / D 壬庚癸
  - 丁辰: T 甲庚 / D 甲庚戊
  - 丁午: T 壬庚癸 / D 壬寅癸
  - 庚寅: T 戊甲壬丙丁 / D 戊甲丙壬丁
  - 庚卯: T 丁甲庚丙 / D 丁甲丙庚
  - 庚巳: T 壬戊丙丁 / D 壬丙丁戊
  - 辛酉: T 壬甲 / D 壬甲丁
  - 壬辰: T 甲庚 / D 甲庚丙
  - 壬丑: T 丙丁甲 / D 丙甲丁
  - 癸午: T 庚辛壬癸 / D 庚壬癸
  - 癸未: T 庚辛壬癸 / D 庚辛癸
  - 癸戌: T 辛甲壬癸 / D 辛甲癸壬

## 庚 row (from the JSON)

| Branch | Month | Primary | Secondary | Conditional | Avoid | T |
|---|---|---|---|---|---|---|
| 寅 | 正月 | 丙甲 | 丁 | 戊（火多则用土）; 壬（支成火局：壬透有根） | 癸 | 戊甲壬丙丁 |
| 卯 | 二月 | 丁甲 | 庚 | 丙（无丁用丙（富贵多出于勉强）） | 乙戊 | 丁甲庚丙 |
| 辰 | 三月 | 甲丁 | — | 癸（支成火局：癸水透）; 壬（丙丁出干：见壬制之） | — | 甲丁壬癸 |
| 巳 | 四月 | 壬戊 | 丙 | 丁（支成金局，变弱为强：用丁方妙） | — | 壬戊丙丁 |
| 午 | 五月 | 壬癸 | — | 戊（支成火局、无壬癸：戊己出干补金洩火）; 己（同上） | 戊己 | 壬癸 |
| 未 | 六月 | 丁甲 | — | 甲（支会土局：甲先丁后） | 癸 | 丁甲 |
| 申 | 七月 | 丁甲 | — | 丙（支成水局：乏丁用丙）; 甲（支成土局：先甲后丁） | 壬癸 | 丁甲 |
| 酉 | 八月 | 丁甲 | 丙 | — | — | 丁甲丙 |
| 戌 | 九月 | 甲壬 | — | 丙（支成水局：丙透救之） | 己 | 甲壬 |
| 亥 | 十月 | 丁丙 | 甲 | 己（支见亥子：得己出制） | — | 丁丙 |
| 子 | 十一月 | 丁甲 | 丙 | — | 癸 | 丁甲丙 |
| 丑 | 十二月 | 丙丁 | 甲 | — | — | 丙丁甲 |
