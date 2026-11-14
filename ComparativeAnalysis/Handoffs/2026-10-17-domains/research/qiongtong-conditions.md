# 穷通宝鉴 conditional stems (owner ruling R4 A)

Data: `qiongtong-conditions.json` (same folder). It adds conditions to `qiongtong-tiaohou.json` and does not change that file.

All 120 cells were read against the full Wikisource text (A). Where A is thin or disputed, the 原文 and commentary of the 徐乐吾 评注本 (X, dajiazhao pages 6079–6210) were also read. Every `quote` was checked by script: each part is a verbatim substring of A (with bold markup removed) or of X's 原文. Only two quotes come from X: 丁午 癸 and 己子 丁.

## How to read the file

- **`cells["丙.亥"]["壬"]`**: the app prints this stem only when every code in `when` holds.
  - `optional` means print it as optional support, never as a need.
  - A stem that is not in `cells` keeps its research status, so primary and secondary stems stay unconditional.
- **Fields on each entry:**
  - `rank`: where the stem sits in the research cell.
  - `src`: A or X.
  - `research_when`: the research `conditional` entry that this entry converts.
  - `alt`: other AND-sets the text gives for the same stem. These are not part of the gate; they are kept for review.
- **`overlaps`**: research `conditional` entries whose stem is already unconditional in the same cell (e.g. 甲酉 庚: 庚金再次, but 支成木局 → 庚 first). These entries never gate printing.
  - `effect: "first"`: when the condition holds, the stem moves to the front.
  - `effect: "pattern"`: 丁寅 壬, the 丁壬化木 formation, which the vocabulary cannot code.
- **Conventions:**
  - `shown:`/`absent:` never count the Day Master itself.
  - 比劫透干 is coded as `dm_strong`.
  - 柱多金水 is coded as `el_strong:Water`.
  - When the text needs two of a stem (二壬争合, 月时皆丙), the code is one `shown:` stem and the note says so.

## Counts

- **Cells:** 77 of 120 have at least one conditional stem.
- **Stems:** 117 conditional stems.
  - 81 come from the research `conditional` key.
  - 31 come from `secondary`.
  - 5 come from `primary`: 乙午 丙, 乙酉 丙, 乙亥 戊, 丙亥 戊, 丙亥 庚.
- **Optional:** 6 stems are coded `optional`: 乙巳 丙, 戊午 丙, 戊午 癸, 己戌 辛, 壬辰 癸, 壬午 辛.
- **The 98 research `conditional` entries:** each is converted exactly once.
  - 81 are gated stems in `cells`.
  - 4 are merged into a gated primary or secondary stem with the same or an alternative condition: 乙午 丙, 乙酉 丙, 丁子 戊, 壬丑 甲.
  - 13 are in `overlaps`.
- **AND entries:** 18 entries need more than one code.

| Code family | Stems using it | Cells |
|---|---|---|
| `el_strong` | 44 | 30 |
| `absent` | 32 | 28 |
| `shown` | 27 | 24 |
| `frame` | 20 | 17 |
| `half` | 9 | 6 |
| `optional` | 6 | 5 |
| `dm_strong` | 1 | 1 |

Per code (stems/cells): el_strong:Water 25/23 · absent:壬 11/10 · shown:壬 8/8 · absent:癸 7/6 · el_strong:Earth 7/7 · frame:Fire 7/4 · shown:丙 6/6 · absent:甲 5/5 · el_strong:Wood 5/4 · frame:Metal 5/5 · frame:Water 5/5 · half:second 5/4 · shown:戊 5/5 · el_strong:Metal 4/4 · half:first 4/3 · el_strong:Fire 3/3 · frame:Wood 3/3 · absent:丁/丙/庚/戊 2 each · shown:甲/癸/辛 2 each · absent:辛, dm_strong, shown:乙, shown:庚 1 each. No cell uses `el_weak` or `dm_weak`.

Six gated stems are also on the cell's `avoid` list. The text uses each one only in its stated case, so the app should let a met condition override `avoid`:

- 丙辰 庚 (absent:甲)
- 庚午 戊 and 庚午 己 (frame:Fire + absent:壬 + absent:癸)
- 辛卯 戊 (el_strong:Water)
- 壬酉 戊 (el_strong:Water)
- 癸亥 丁 (el_strong:Metal)

## Doubtful cases

1. **甲卯 丁 → absent:庚.**
   - A says: "或无庚金，有丁透，亦属文星，为木火通明之象".
   - But A's closing line reads "总之正二月甲木，有庚戊者上命。如有丁透，大富大贵之命也", and X reads "先看庚、次取丁". If 丁 is a general second, it belongs in secondary.
2. **甲未 癸 → half:first.**
   - A only says "先丁后庚，无癸亦可".
   - The half-month split comes from X's commentary ("大暑前，无癸不能取贵…大暑后，无癸见庚丁，亦可取贵") and from the summary table's 上半月同五月用癸.
   - The alternative is `optional`.
3. **甲亥 戊 → shown:壬.**
   - A says: "忌壬水泛身，须戊土制之". X's commentary says "壬水不透，不必用戊土也".
   - But X's closing 原文 says "戊土亦不可少".
4. **乙午 丙 → half:second.**
   - A says: "上半月属阳，仍用癸水。下半月属阴…丙癸齐用".
   - X reads "上半月属阳，先癸次丙", which would make 丙 a second use in both halves.
5. **乙亥 戊 (primary) → el_strong:Water.**
   - A's opening line is unconditional: "取丙为用，戊土次之".
   - A's own paragraph ("或水多无戊…或一点壬水，即多见戊土，亦为不妙") and X ("丙为尊，或壬多，用戊土") tie 戊 to heavy water.
6. **丁午.**
   - 甲 → el_strong:Water. A's condition, "若干支无火局，有水透干", also needs no 火局, and the vocabulary has no negated frame. X: "壬癸太旺用甲木".
   - 癸 → absent:壬. This rests on X only: "或支无壬水，得一癸透". A has just "得一癸透，名独杀当权".
7. **丁亥 / 丁丑 戊 → shown:壬.**
   - The text needs two 壬: "或时月二壬争合，取戊破之". One shown 壬 will over-trigger.
   - The month rule "癸戊权宜酌用" could instead be read as `optional` for both 癸 and 戊.
8. **己亥 / 己子 / 己丑 甲 → el_strong:Earth.**
   - A says "甲木参酌", which on its own would be `optional`.
   - The coded situation is "或一派戊己，取甲制之". X: "即使土旺用甲木制之".
9. **己戌 辛 → optional.**
   - A says: "九月土盛，宜甲木疏之，余皆酌用".
   - X keeps 癸丙 as regular supports ("癸丙为辅，最为普通也"), so only 辛 was dropped to optional.
10. **壬酉 庚 → absent:甲.**
    - A's closing line is "专用甲木，庚金次之".
    - But the body says "设见庚破，又属常人……无甲用金". X's closing line drops 庚, and X calls 体全 "乃破格也".
11. **壬亥 庚 → shown:甲.**
    - A's closing line is "次取庚金".
    - X says "庚金为应病与药之用也", and that with 丙戊 both shown "无须再用庚金制甲矣".
12. **壬丑 丁 and 癸丑 丁 → shown:辛.**
    - The research has 丁 in secondary. A's closing line for 壬 reads "先取丙火，丁甲为佐".
    - The body uses 丁 only to free 丙 from 辛: "即丙透遇辛，亦不为妙，见丁颇吉" and "或无癸水，有辛与合…有丁出、颇吉". X: "或丙遭辛合，须见丁制，乃吉". X's 壬 closing line names no 丁.
13. **丙子 己 → absent:戊.**
    - A reads "无戊见己，异路功名", but X reads "多戊见己" (the opposite case).
14. **戊午 癸 → optional.**
    - A says "用癸力微", and X says "用癸恐其力微".
    - It could instead stay a plain weak support.
15. **Narrower or wider than the text:**
    - 庚午 戊/己 requires no 壬癸, although the text also says "又见戊己透者则吉" with 壬癸 present.
    - 戊寅 / 戊卯 庚 drops the line's 无丙, because "或丙多甲多，宜以癸庚参用" uses 庚 with 丙 present.
    - Single-stem stand-ins where the text names two stems:
      - 甲申 戊: coded shown:癸; X also counts 壬.
      - 乙子 戊: coded shown:壬; the text also counts 癸.
      - 庚辰 壬: coded shown:丙; the text also counts 丁.
16. **Kept unconditional, though arguable:**
    - 乙申 己: "己土必不可少" vs the exception "或癸透、丙藏、庚少，此不用己".
    - 乙未 丙: the 三夏 rule "五六月先丙后癸" vs "总之夏月之乙木…丙火酌用".
    - 丙辰 甲 and 丙丑 甲: X says "不论土之有无多寡也".
    - 辛午 癸: "五月辛金，壬、癸、己、三者皆用" vs "无壬、癸亦可用".
    - 丙子 戊: X says "壬戊酌用".
