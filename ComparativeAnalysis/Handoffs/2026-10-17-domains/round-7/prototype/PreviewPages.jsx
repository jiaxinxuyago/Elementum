// LOCAL PROTOTYPE ONLY (round 7 mockup screenshots). Never committed.
import './previewBeats.css';
const SEATS = [['year', 'stem', 'Steward', 'wood'], ['year', 'branch', 'Artisan', 'water'], ['month', 'stem', 'Twin', 'metal'], ['month', 'branch', 'Alchemist', 'earth'], ['day', 'branch', 'Horizon', 'wood'], ['hour', 'stem', 'Steward', 'wood'], ['hour', 'branch', 'Rival', 'metal']];
const GN = { year: 'Early', month: 'Rising', day: 'Home', hour: 'Late' }; const GA = { year: 'birth–15', month: '16–34', day: '35–47', hour: '48 on' };
function Life({ lit }) {
  return (
    <div className="pv-life pv-life-lg">
      {['year', 'month', 'day', 'hour'].map((g, i) => (
        <span key={g} className={`pv-gate${i === 1 ? ' cur' : i > 1 ? ' fut' : ''}`}>
          <span className="pv-gname">{GN[g]}</span>
          <span className="pv-gseats">{SEATS.filter((s) => s[0] === g).map((s) => <span key={s[1]} className={`node n-${s[3]} pv-mini${lit && !lit.includes(`${g}-${s[1]}`) ? ' dim' : ''}`} />)}</span>
          <span className="pv-gage">{GA[g]}</span>
        </span>
      ))}
      <span className="pv-you" style={{ left: '44%' }}><span>you · 31</span></span>
    </div>
  );
}
const Lock = ({ tier = 'Seeker', what }) => (
  <div className="pv-lock"><p className="body2 el-domlock" style={{ margin: 0 }}>{what}</p><button type="button" className="el-domsheet-cta">Open with {tier}</button></div>
);
const Tabs = ({ on }) => (
  <div className="pv-tabs">{['By position', 'By decade', 'By year'].map((t, i) => <span key={t} className={`pv-tab${i === on ? ' on' : ''}${i > 0 ? ' adv' : ''}`}>{t}{i > 0 ? ' · Advisor' : ''}</span>)}</div>
);
function SeatBlock({ name, meta, text, locked }) {
  return (
    <div className="pv-seat">
      <span className="pv-seatname">{name}</span><span className="pv-seatmeta">{meta}</span>
      {locked ? <p className="pv-locked">This seat's Wealth reading opens with Seeker.</p> : <><p className="elpos-domread pv-text">{text}</p><span className="pv-more">Read this seat ›</span></>}
    </div>
  );
}
export default function PreviewPage({ page, Use }) {
  const back = { domains: 'YOUR DOMAINS', wealth: 'YOUR DOMAINS · WEALTH', 'wealth-free': 'YOUR DOMAINS · WEALTH', chapters: 'YOUR LIFE CHAPTERS', stars: 'YOUR STARS', 'stars-free': 'YOUR STARS', bp: 'YOUR ENERGY BLUEPRINT', 'bp-free': 'YOUR ENERGY BLUEPRINT' }[page];
  return (
    <div className="jscreen active pv-screen" data-screen="pv">
      <div className="plateimg a-plate-rice" /><div className="eltint" />
      <button className="backrow" aria-label="Back"><span className="bico"><Use id="ico-chev-l" /></span><span className="bl el-back">YOUR READING · {back.replace('YOUR ', '')}</span></button>
      <div className="scrollwrap"><div className="padv2 pv-pad">
        {page === 'domains' && (<>
          <div className="cardstock pv-head"><span className="laylab">YOUR DOMAINS</span><span className="serifline el-teasetitle pv-title">Eight parts of your life, and who rules them</span>
            <p className="body2" style={{ margin: 0 }}>One of ten characters sits in each seat of your chart, and each character rules certain parts of your life. Where several seats rule the same domain, that domain carries more weight for you.</p></div>
          <div className="pv-domgrid">
            {[['Wealth', 4, ['wood', 'wood', 'wood', 'metal'], 'Your money comes through the people close to you.'], ['Family', 4, ['wood', 'water', 'wood', 'metal'], 'You were fed well, and you became the one who feeds.'], ['Career', 2, ['metal', 'earth'], 'Your work pays for what only you know.'], ['Social', 2, ['metal', 'wood'], 'Your friends are your equals, or they drift.'], ['Mind', 1, ['earth'], 'Your mind runs best on what others find strange.'], ['Growth', 1, ['earth'], 'You grow late, and mostly in private.'], ['Health', 1, ['water'], 'Your body trusts food and rest to put it right.'], ['Love', 1, ['wood'], 'You fall for people who widen your life.']].map(([d, n, els, h]) => (
              <span key={d} className={`cardstock pv-domcard${n >= 4 ? ' heavy' : ''}`}>
                <span className="pv-dom"><span className="pv-domring"><Use id={`dom-${d.toLowerCase()}`} /></span><span className="pv-domname">{d}</span><span className="pv-pips">{els.map((e, i) => <i key={i} style={{ background: `var(--${e}Deep)` }} />)}</span></span>
                <span className="pv-domh">{h}</span>
              </span>))}
          </div>
          <p className="body2 el-domlock" style={{ textAlign: 'center' }}>Every headline and each domain's first reading are free.</p>
        </>)}
        {(page === 'wealth' || page === 'wealth-free') && (<>
          <div className="cardstock pv-head"><span className="laylab"><Use id="dom-wealth" className="pv-labic" />THE DOMAINS · WEALTH</span><span className="serifline el-teasetitle pv-title">Your money comes through the people close to you.</span>
            <p className="body2" style={{ margin: '0 0 2px' }}>Four seats rule Wealth in your chart: one in your Early Chapter, one in your Home Chapter and two in your Late Chapter.</p>
            <Life lit={['year-stem', 'day-branch', 'hour-stem', 'hour-branch']} /></div>
          <Tabs on={0} />
          <div className="pv-step"><span className="pv-stepey">How you are</span>
            <p className="elpos-domread pv-text">You find money through other people, in a tip from a friend or a side venture with someone close. Because your openings arrive through people you trust, you say yes before you read the terms, and you earn in bursts more than in a steady line. The money you make fastest is the money you hold on to least.</p>
            <p className="elpos-domread pv-text">You lose money most easily where you share it with friends and family, and you also find your safety net among those same people.</p></div>
          <span className="pv-stepey" style={{ display: 'block', margin: '14px 2px 4px' }}>The four seats that rule your Wealth</span>
          <div className="cardstock pv-seats">
            <SeatBlock locked={page === 'wealth-free'} name="The Steward at the Year Gate" meta="Early Chapter · birth to 15 · in plain view · lived" text="You learned what things cost before most children do. Money at home was counted and spent with care, and by your teens you were already saving what your friends spent." />
            <div className="pv-gaprow"><b>Rising Chapter · 16 to now · no Wealth seat.</b> {page === 'wealth-free' ? 'Opens with Seeker.' : 'Since sixteen you have put work, study and friends before money, and your income has stayed below what you could earn.'}</div>
            <SeatBlock locked={page === 'wealth-free'} name="The Horizon inside the Day Gate" meta="Home Chapter · from 35 · 2030 · inside · coming" text="From your mid-thirties your income starts to rise through the life you share with a partner, through a joint venture, a move or an opening from their side. You will earn more in these years than in all the years before, and you keep only what has both names written down." />
            <SeatBlock locked={page === 'wealth-free'} name="The Steward at the Hour Gate" meta="Late Chapter · from 48 · 2043 · in plain view · coming" text="Your late forties are when years of steady saving finally show. Debts close and the accounts settle, and you become the one in your family who has enough." />
            <SeatBlock locked={page === 'wealth-free'} name="The Rival inside the Hour Gate" meta="Late Chapter · from 48 · 2043 · inside · coming" text="Younger people start to make claims on your money from your late forties. You will give more than you planned each time, and you will keep your own floor only where you set the number before anyone asks." />
            {page === 'wealth-free' && <Lock what="Your four Wealth seats, what they have already done and what they bring next, open with Seeker." />}
          </div>
          <p className="pv-go2">See your Wealth across your Life Chapters ›</p>
        </>)}
        {page === 'chapters' && (<>
          <div className="cardstock pv-head"><span className="laylab"><Use id="tab-today" className="pv-labic" />YOUR LIFE CHAPTERS</span><span className="serifline el-teasetitle pv-title">You are in your Rising Chapter, in a Magistrate decade.</span>
            <p className="body2" style={{ margin: '0 0 2px' }}>Your chart has four gates, and each one is a stretch of your life. Every gate holds two seats, one in plain view and one inside, and the characters in them set the tone of those years. Your decades run inside the chapters, ten years each.</p>
            <Life />
            <div className="pv-strip">{[['8', 'Sage', 'hv'], ['18', 'Alchemist', 'hv'], ['28', 'Magistrate', 'hp now'], ['38', 'General', 'hp'], ['48', 'Steward', 'hp'], ['58', 'Horizon', 'hp']].map(([a, g, c]) => <span key={a} className={`pv-dc ${c}`}><b>{a}</b>{g}</span>)}</div>
            <p className="body2 el-domlock" style={{ margin: '4px 0 0' }}>Green decades help your chart. Grey ones weigh on it.</p></div>
          <div className="cardstock pv-chap"><div className="pv-chh"><span className="pv-cn">The Early Chapter</span><span className="pv-cs">birth to 15 · lived</span></div>
            <span className="pv-cseat">The Steward at · the Artisan inside · Wealth, Family, Health</span>
            <p className="elpos-domread pv-text">Your Early Chapter was an orderly one, with money counted at home and promises kept in front of you. You came out of it careful, and the habits you formed then still run your accounts.</p></div>
          <div className="cardstock pv-chap cur"><div className="pv-chh"><span className="pv-cn">The Rising Chapter</span><span className="pv-cs now">16 to 34 · now</span></div>
            <span className="pv-cseat">The Twin at · the Alchemist inside, your strongest seat · Career, Social, Mind, Growth</span>
            <p className="elpos-domread pv-text">Your Rising Chapter is the one where you prove yourself alone, taking whole jobs and signing your name to them. Inside it runs a private education, and you are building the knowledge your later work will be paid for.</p>
            <div className="pv-dec"><span className="pv-when">Now · a Magistrate decade · 2023 to 2032 · helping</span>
              <p className="elpos-domread pv-text" style={{ marginTop: 2 }}>This decade gives your life a structure it did not have before, a clear role and people who rely on you to keep it. You take on more responsibility than you planned, and it steadies you more than it weighs.</p>
              <div className="pv-years">{['2023 Virtuoso', '2024 Horizon', '2025 Steward', '2026 General', '2027 Magistrate', '2028 Alchemist', '2029 Sage', '2030 Twin', '2031 Rival', '2032 Artisan'].map((y) => <span key={y} className={`pv-yr${y.startsWith('2026') ? ' now' : ''}`}>{y}</span>)}</div>
              <Lock tier="Advisor" what="2026, a General year: what this year brings you, and each year to 2032." /></div></div>
          <div className="cardstock pv-chap fut"><div className="pv-chh"><span className="pv-cn">The Home Chapter</span><span className="pv-cs">35 to 47 · from 2030</span></div>
            <span className="pv-cseat">The Horizon inside · Love, Social, Wealth · a General decade from 38</span>
            <p className="elpos-domread pv-text">Your Home Chapter opens wider than the ones before it, through a partner whose world is bigger than yours. Love, friends and money start to move together in these years, and you say yes to more than you ever have.</p></div>
          <div className="cardstock pv-chap fut"><div className="pv-chh"><span className="pv-cn">The Late Chapter</span><span className="pv-cs">48 on · from 2043</span></div>
            <span className="pv-cseat">The Steward at · the Rival inside · Wealth, Family · Steward and Horizon decades</span>
            <p className="elpos-domread pv-text">Your Late Chapter is the well-kept one, when the saving of every earlier decade finally shows. Inside it, the people after you push against you and fight for you, and you keep your own part only where you fixed its size early.</p></div>
        </>)}
        {(page === 'stars' || page === 'stars-free') && (<>
          <div className="cardstock pv-head"><span className="laylab"><Use id="ico-spark" className="pv-labic" />YOUR STARS</span><span className="serifline el-teasetitle pv-title">Six old stars sit in your chart, and a helper is arriving.</span>
            <p className="body2" style={{ margin: 0 }}>The symbolic stars are an older, lighter layer of the reading. Each one colours the gate it sits in, and none of them overrides the characters in your seats.</p></div>
          {[['Stars that help', [['gift', 'Scholar’s Star', '文昌', 'Year Gate · Early Chapter', 'Words and learning came easily to you from the start.', 'You learned to read early and took to schoolwork faster than your effort explains. Written work and anything you could study for went better for you than for most, and you still trust a book to get you through a hard problem.'], ['gift', 'Red Phoenix', '红鸾', 'Month Gate · Rising Chapter · now', 'Attraction runs high through your working years.', 'Your Rising Chapter carries more attraction than you planned for, much of it through work and study and the circles those years bring. You have been noticed more than you noticed, and you kept at least one feeling from these years to yourself.']]],
            ['Stars that test', [['test', 'Lonely Star', '孤辰', 'Day Gate · the partner’s seat', 'You need more time alone inside closeness than most.', 'You need stretches of solitude even inside a close relationship, and partners have read it as distance more than once. You stay longest with the person who lets you go quiet without asking why.'], ['test', 'Ram’s Edge', '羊刃', 'Hour Gate · Late Chapter', 'A hard, protective force in your later years.', 'Your later years hold a will that does not bend, and you keep it for the moments that matter. You defend what you have built hard enough that people step back, and you keep the peace by choosing which fights are worth it.'], ['test', 'Robbery Star · Lost Spirit', '劫煞 · 亡神', 'Year Gate · Day Gate', 'Something early taught you to guard, and you keep part of yourself out of sight.', null]]],
            ['Stars arriving with your time', [['come', 'Nobleman', '天乙贵人', 'Arrives with your decade, 2023 to 2032 · again in 2027', 'A helper with standing arrives in this decade.', 'Someone with standing opens a door for you in these years, a mentor or a sponsor or an older ally who backs you before you have proved yourself. The help comes while you are already working hard, and you recognise it because it costs you nothing to accept.'], ['come', 'Peach Blossom', '桃花', 'Arrives with your decade, 2033 to 2042', 'Your Home Chapter’s first decade brings new people in numbers.', null]]]].map(([grp, list]) => (
            <div key={grp}><span className="pv-stepey" style={{ display: 'block', margin: '14px 2px 4px' }}>{grp}</span>
              {list.map(([k, n, zh, where, one, reading]) => (
                <div key={n} className={`cardstock pv-starcard ${k}`}>
                  <span className={`pv-star ${k}`} style={{ alignSelf: 'flex-start' }}>{n}</span><span className="pv-zh">{zh}</span>
                  <span className="pv-seatmeta">{where}</span>
                  <p className="pv-one">{one}</p>
                  {reading && (page === 'stars' ? <p className="elpos-domread pv-text">{reading}</p> : <p className="pv-locked">Its full reading opens with Seeker.</p>)}
                </div>))}
            </div>))}
          {page === 'stars-free' && <Lock what="Every star's reading, and the stars your decades bring, open with Seeker." />}
        </>)}
        {page === 'bp-free' && (<>
          <div className="cardstock pv-head pv-deep"><span className="laylab"><Use id="ico-lock" className="pv-labic" />YOUR ENERGY BLUEPRINT</span><span className="serifline el-teasetitle pv-title">A Steward structure · 正财格</span>
            <p className="body2" style={{ margin: 0 }}>The decoding of your chart: why the rest of your reading comes out the way it does.</p></div>
          {['Your structure', 'What your chart runs on and lacks', 'Seen and unseen', 'Pairings and clashes'].map((t) => <div key={t} className="cardstock pv-lockrow"><Use id="ico-lock" className="pv-labic" />{t}</div>)}
          <Lock tier="Advisor" what="The four parts of your Blueprint open with Advisor." />
        </>)}
        {page === 'bp' && (<>
          <div className="cardstock pv-head pv-deep"><span className="laylab">YOUR ENERGY BLUEPRINT</span><span className="serifline el-teasetitle pv-title">A Steward structure · 正财格</span>
            <p className="body2" style={{ margin: 0 }}>The decoding of your chart: why the rest of your reading comes out the way it does.</p></div>
          <div className="cardstock pv-bp"><span className="pv-stepey">1 · Your structure</span>
            <p className="elpos-domread pv-text">Your chart is built around money kept and value earned. The Wood hidden in your strongest seat shows on two of your stems. That makes the Steward the organising force of your life, more than the Alchemist who holds that seat. You do best when the work in front of you has a clear return.</p>
            <p className="elpos-domread pv-text"><b className="el-funclab">Formed, under strain.</b> The Twin and the Rival stand close to your Stewards, so equals keep claiming a share. Fire would protect the structure, the pressure your chart lacks, and the decades you are in now and next bring it.</p></div>
          <div className="cardstock pv-bp"><span className="pv-stepey">2 · What your chart runs on and lacks</span>
            <p className="elpos-domread pv-text"><b className="el-funclab">Strongest.</b> Wood and Earth carry two thirds of your chart, what you earn and what you think.</p>
            <p className="elpos-domread pv-text"><b className="el-funclab">Missing.</b> No Magistrate, General, Sage or Virtuoso sits in your seats. Nobody inside your chart tells you what to do or praises you for doing it, so you borrow structure and approval from outside, and the Magistrate decade you are in now is the first to give them to you.</p>
            <p className="elpos-domread pv-text"><b className="el-funclab">Your season · 调候.</b> Born in late spring with heavy Earth around your Metal, your season asks for strong Wood to break the Earth up and Fire to temper you. Your chart carries the softer Wood and almost no Fire, so you sharpen fastest under a deadline someone else sets.</p>
            <div className="pv-seekease"><span className="role-pill cat"><Use id="ar-up" />Seek</span><span className="node n-wood pv-mini" /><span className="node n-water pv-mini" /><span className="node n-fire pv-mini" /><span className="role-pill fric" style={{ marginLeft: 10 }}><Use id="ar-down" />Ease</span><span className="node n-earth pv-mini" /><span className="node n-metal pv-mini" /></div></div>
          <div className="cardstock pv-bp"><span className="pv-stepey">3 · Seen and unseen</span>
            <p className="elpos-domread pv-text"><b className="el-funclab">In plain view.</b> The Steward twice and the Twin. People meet a careful provider who carries their own weight.</p>
            <p className="elpos-domread pv-text"><b className="el-funclab">Inside.</b> The Artisan, the Alchemist, the Horizon and the Rival. The private you wants comfort, strange ideas, open roads and a contest, and only the people you live with meet that side.</p></div>
          <div className="cardstock pv-bp"><span className="pv-stepey">4 · Pairings and clashes</span>
            {[['Peers beside the purse · 比劫夺财', 'You lose money most easily where you share it, and you find your safety net among the same people.'], ['The maker feeds the purse · 食伤生财', 'What you make turns into money more easily for you than for most.'], ['Thinking starves making · 枭神夺食', 'You think so long about a thing that you miss the moment to make it.'], ['Day binds with Year · 寅亥合', 'Your home life keeps pulling you back toward the family you came from.'], ['Month binds with Hour · 辰酉合', 'What you build at work binds into what you keep in later life.']].map(([h, t]) => <p key={h} className="elpos-domread pv-text"><b className="el-funclab">{h}.</b> {t}</p>)}
            <p className="body2 el-domlock" style={{ margin: '6px 0 0' }}>No clashes, punishments or harms: your chart argues less with itself than most.</p></div>
        </>)}
      </div></div>
    </div>
  );
}
