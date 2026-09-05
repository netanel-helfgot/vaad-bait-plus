import React,{useState,useEffect,useRef}from"react";
// ─── STYLES ──────────────────────────────────────────────────────────────────
const S=`
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;700;900&family=IBM+Plex+Mono:wght@500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0d1117;--s:#161b22;--s2:#21262d;--bd:#30363d;--g:#3fb950;--b:#58a6ff;--o:#f0883e;--r:#f85149;--p:#a371f7;--t:#e6edf3;--t2:#8b949e;--t3:#484f58;--f:'Heebo',sans-serif;--m:'IBM Plex Mono',monospace;--ra:8px;--rl:12px}
body{font-family:var(--f);background:var(--bg);color:var(--t);direction:rtl}
.app{min-height:100vh;display:flex;flex-direction:column}
.hdr{background:var(--s);border-bottom:1px solid var(--bd);padding:0 16px;height:54px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.logo{font-size:18px;font-weight:900}.logo span{color:var(--g)}
.nav{background:var(--s);border-bottom:1px solid var(--bd);display:flex;overflow-x:auto;padding:0 8px;scrollbar-width:none}
.nav::-webkit-scrollbar{display:none}
.nb{background:none;border:none;color:var(--t2);font-family:var(--f);font-size:13px;font-weight:600;padding:13px 11px;cursor:pointer;white-space:nowrap;border-bottom:2px solid transparent;transition:all .15s}
.nb:hover{color:var(--t)}.nb.act{color:var(--g);border-bottom-color:var(--g)}
.main{flex:1;padding:16px;max-width:860px;margin:0 auto;width:100%}
.pg{font-size:17px;font-weight:900;margin-bottom:14px}
.card{background:var(--s);border:1px solid var(--bd);border-radius:var(--rl);padding:16px;margin-bottom:12px}
.ct{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t2);margin-bottom:10px;display:flex;align-items:center;gap:6px}
.dot{width:5px;height:5px;border-radius:50%;background:var(--g);display:inline-block}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:12px}
.stat{background:var(--s2);border:1px solid var(--bd);border-radius:var(--ra);padding:12px;position:relative;overflow:hidden}
.stat::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--g);opacity:.5}
.stat.w::after{background:var(--o)}.stat.d::after{background:var(--r)}.stat.b::after{background:var(--b)}
.sl{font-size:10px;color:var(--t2);font-family:var(--m);text-transform:uppercase;margin-bottom:4px}
.sv{font-size:20px;font-weight:900;letter-spacing:-1px}
.sv.g{color:var(--g)}.sv.o{color:var(--o)}.sv.r{color:var(--r)}.sv.b{color:var(--b)}.sv.p{color:var(--p)}
.ss{font-size:10px;color:var(--t3);margin-top:2px}
.badge{font-size:11px;font-weight:700;padding:2px 7px;border-radius:4px;font-family:var(--m)}
.bp{background:rgba(63,185,80,.15);color:var(--g)}.bl{background:rgba(248,81,73,.15);color:var(--r)}
.bw{background:rgba(240,136,62,.15);color:var(--o)}.bo{background:rgba(88,166,255,.15);color:var(--b)}.bc{background:rgba(63,185,80,.15);color:var(--g)}
.btn{border:none;border-radius:var(--ra);padding:8px 14px;font-family:var(--f);font-weight:700;font-size:13px;cursor:pointer;transition:all .15s;display:inline-flex;align-items:center;gap:6px}
.btn-p{background:var(--g);color:#0d1117}.btn-p:hover{filter:brightness(1.08)}
.btn-s{background:var(--s2);color:var(--t);border:1px solid var(--bd)}.btn-s:hover{border-color:var(--t2)}
.btn-d{background:rgba(248,81,73,.12);color:var(--r);border:1px solid rgba(248,81,73,.25)}
.btn-b{background:rgba(88,166,255,.12);color:var(--b);border:1px solid rgba(88,166,255,.25)}
.btn-sm{padding:5px 9px;font-size:12px}.btn-bl{width:100%;justify-content:center}
.ov{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:200;display:flex;align-items:flex-end}
@media(min-width:600px){.ov{align-items:center}}
.modal{background:var(--s);border:1px solid var(--bd);border-radius:var(--rl) var(--rl) 0 0;padding:18px;width:100%;max-width:500px;margin:0 auto;max-height:92vh;overflow-y:auto}
@media(min-width:600px){.modal{border-radius:var(--rl)}}
.mh{font-size:15px;font-weight:900;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center}
.mx{background:none;border:none;color:var(--t2);cursor:pointer;font-size:20px}
.fg{margin-bottom:10px}.fl{display:block;font-size:12px;color:var(--t2);margin-bottom:4px;font-weight:600}
.fi{width:100%;background:var(--s2);border:1.5px solid var(--bd);border-radius:var(--ra);padding:9px 12px;color:var(--t);font-family:var(--f);font-size:14px;transition:border-color .15s}
.fi:focus{outline:none;border-color:var(--g)}
textarea.fi{resize:vertical;min-height:60px}select.fi{appearance:none}
.row{display:flex;gap:8px;align-items:center}.f1{flex:1}
.div{height:1px;background:var(--bd);margin:10px 0}
.ic{background:var(--s2);border:1px solid var(--bd);border-radius:var(--rl);padding:14px;margin-bottom:10px}
.ih{display:flex;align-items:flex-start;gap:8px;margin-bottom:8px}
.it{font-weight:700;font-size:13px;margin-bottom:2px}
.idesc{font-size:12px;color:var(--t2)}
.ifoot{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-top:8px}
.upload-zone{border:2px dashed var(--bd);border-radius:var(--ra);background:var(--s2);padding:14px;text-align:center;cursor:pointer;transition:all .2s}
.upload-zone:hover,.upload-zone.over{border-color:var(--g);background:rgba(63,185,80,.05)}
.upload-zone.has{border-style:solid;border-color:var(--g);padding:0;overflow:hidden}
.pcard{background:var(--s2);border:1px solid var(--bd);border-radius:var(--rl);padding:14px;margin-bottom:10px}
.po{position:relative;margin-bottom:5px;cursor:pointer}
.po input{position:absolute;opacity:0}
.pol{display:flex;align-items:center;gap:7px;background:var(--s);border:1px solid var(--bd);border-radius:var(--ra);padding:8px 10px;font-size:13px;transition:all .15s;position:relative;overflow:hidden}
.po:hover .pol{border-color:var(--b)}
.po input:checked+.pol{border-color:var(--g);background:rgba(63,185,80,.07)}
.pbf{position:absolute;top:0;right:0;height:100%;background:rgba(63,185,80,.08);transition:width .5s}
.ppc{margin-right:auto;font-family:var(--m);font-size:11px;color:var(--t2);position:relative}
.pftr{display:flex;gap:8px;margin-top:10px;align-items:center;flex-wrap:wrap}
.pm{font-size:11px;color:var(--t3);font-family:var(--m)}
.pch{font-size:11px;color:var(--o);background:none;border:none;cursor:pointer;font-family:var(--m);font-weight:700;padding:0;text-decoration:underline}
.pw{background:rgba(63,185,80,.08);border:1px solid rgba(63,185,80,.2);border-radius:var(--ra);padding:8px 12px;margin-top:6px;display:flex;align-items:center;gap:8px}
.pe{background:rgba(163,113,247,.1);border:1px solid rgba(163,113,247,.25);border-radius:var(--ra);padding:6px 10px;font-size:11px;color:var(--p);font-weight:700;display:flex;align-items:center;gap:6px;margin-top:6px}
.voters-panel{background:var(--s);border:1px solid var(--bd);border-radius:var(--ra);padding:10px;margin-top:8px}
.vr{display:flex;justify-content:space-between;padding:5px 0;font-size:12px;border-bottom:1px solid var(--bd)}
.vr:last-child{border-bottom:none}
.ei{margin-bottom:10px}.eh{display:flex;justify-content:space-between;margin-bottom:3px;font-size:13px}
.track{height:4px;background:var(--s2);border-radius:3px;overflow:hidden}
.fill{height:100%;border-radius:3px;transition:width .6s}
.ni{display:flex;gap:8px;padding:10px;background:var(--s2);border:1px solid var(--bd);border-radius:var(--ra);margin-bottom:6px}
.ni.ur{border-right:3px solid var(--b)}
.cmt{background:var(--s2);border-radius:var(--ra);padding:8px 10px;margin-bottom:6px;border-right:3px solid var(--bd)}
.cmt.me{border-right-color:var(--g)}
.cmt-hdr{font-size:11px;font-weight:700;color:var(--t2);margin-bottom:2px;display:flex;justify-content:space-between}
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px}
.pc{background:var(--s2);border:1px solid var(--bd);border-radius:var(--rl);padding:14px}
.pc:hover{border-color:var(--t3)}
.ptg{font-size:11px;padding:2px 7px;border-radius:11px;font-weight:600;background:var(--s);border:1px solid var(--bd);color:var(--t2)}
.cf{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px}
.cb{background:var(--s2);border:1px solid var(--bd);border-radius:20px;padding:5px 12px;font-family:var(--f);font-weight:600;font-size:12px;color:var(--t2);cursor:pointer;transition:all .15s}
.cb:hover{border-color:var(--t2);color:var(--t)}.cb.act{background:rgba(63,185,80,.12);border-color:var(--g);color:var(--g)}
.bal-box{background:linear-gradient(135deg,rgba(63,185,80,.08),rgba(88,166,255,.06));border:1px solid rgba(63,185,80,.25);border-radius:var(--rl);padding:20px;margin-bottom:14px;text-align:center}
.bal-lbl{font-size:12px;color:var(--t2);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;font-family:var(--m)}
.bal-amt{font-size:42px;font-weight:900;font-family:var(--m);letter-spacing:-2px}
.bal-sub{font-size:12px;color:var(--t2);margin-top:5px}
.exp-row{display:flex;align-items:center;gap:8px;background:var(--s2);border:1px solid var(--bd);border-radius:var(--ra);padding:9px 12px;margin-bottom:6px}
.reg-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.auth-tabs{display:flex;background:var(--s2);border:1px solid var(--bd);border-radius:var(--ra);padding:3px;gap:3px;margin-bottom:18px}
.auth-tab{flex:1;background:none;border:none;border-radius:6px;padding:8px;font-family:var(--f);font-size:13px;font-weight:700;color:var(--t2);cursor:pointer;transition:all .2s;text-align:center}
.auth-tab.act{background:var(--s);color:var(--t);box-shadow:0 1px 4px rgba(0,0,0,.3)}
.role-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:4px}
.role-card{background:var(--s2);border:2px solid var(--bd);border-radius:var(--ra);padding:10px 5px;cursor:pointer;text-align:center;transition:all .15s}
.role-card.sel{border-color:var(--g);background:rgba(63,185,80,.08)}
.lpage{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);padding:16px}
.lbox{background:var(--s);border:1px solid var(--bd);border-radius:var(--rl);padding:30px 24px;width:100%;max-width:390px}
.ll{text-align:center;font-size:28px;font-weight:900;margin-bottom:4px}
.ll span{color:var(--g)}
.ltg{text-align:center;font-size:12px;color:var(--t2);margin-bottom:22px}
.linp{width:100%;background:var(--s2);border:1.5px solid var(--bd);border-radius:var(--ra);padding:10px 12px;color:var(--t);font-family:var(--f);font-size:14px;transition:border-color .15s}
.linp:focus{outline:none;border-color:var(--g)}
.lbtn{width:100%;background:var(--g);color:#0d1117;border:none;border-radius:var(--ra);padding:12px;font-family:var(--f);font-weight:900;font-size:15px;cursor:pointer;transition:filter .15s}
.lbtn:hover{filter:brightness(1.08)}.lbtn:disabled{opacity:.45}
.lerr{background:rgba(248,81,73,.1);border:1px solid rgba(248,81,73,.3);border-radius:var(--ra);padding:8px 12px;font-size:13px;color:var(--r);margin-bottom:11px}
.ldiv{height:1px;background:var(--bd);margin:16px 0}
.ldb{flex:1;background:var(--s2);border:1px solid var(--bd);border-radius:var(--ra);padding:7px 5px;font-size:11px;color:var(--t2);cursor:pointer;font-family:var(--f);font-weight:600;text-align:center;transition:all .15s}
.ldb:hover{border-color:var(--g);color:var(--t)}
.uch{display:flex;align-items:center;gap:6px;background:var(--s2);border:1px solid var(--bd);border-radius:20px;padding:4px 11px 4px 5px;cursor:pointer}
.uch:hover{border-color:var(--t2)}
.tw{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:300;display:flex;flex-direction:column;gap:5px;align-items:center}
.toast{background:var(--s);border:1px solid var(--bd);border-radius:var(--ra);padding:9px 15px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px;box-shadow:0 5px 20px rgba(0,0,0,.4);min-width:180px;justify-content:center}
.toast.s{border-color:var(--g);color:var(--g)}.toast.i{border-color:var(--b);color:var(--b)}.toast.e{border-color:var(--r);color:var(--r)}
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const MONTHS_HE=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];
const CUR_MONTH=`${MONTHS_HE[new Date().getMonth()]} ${new Date().getFullYear()}`;
const USERS_DB=[
  {id:1,email:"nana@gmail.com",pass:"1234",name:"משפחת הלפגוט",role:"tenant",apt:"5"},
  {id:2,email:"committee@vaad.il",pass:"1234",name:"ועד הבית",role:"committee",apt:null},
  {id:3,email:"manager@vaad.il",pass:"1234",name:"חברת ניהול",role:"manager",apt:null},
];
const INIT_ISSUES=[
  {id:1,createdAt:Date.now()-5*86400000,title:"דלת כניסה – לא ננעלת",reporter:"משפחת פרץ",reporterRole:"tenant",apt:"1",desc:"הדלת הראשית לא ננעלת",status:"closed",cat:"🔒",openedAt:"2026-01-15T09:23:00",ts:"16/01 14:10",media:null,mediaType:null,comments:[{id:1,author:"ועד הבית",text:"הטכנאי יגיע מחר",ts:"15/01 10:00"},{id:2,author:"משפחת פרץ",text:"תודה!",ts:"15/01 10:30"}]},
  {id:2,createdAt:Date.now()-2*86400000,title:"נזילה – קומה 3",reporter:"משפחת מרקוביץ",reporterRole:"tenant",apt:"3",desc:"כתם רטיבות בתקרה",status:"inprogress",cat:"💧",openedAt:"2026-01-18T11:00:00",media:null,mediaType:null,comments:[{id:3,author:"חברת ניהול",text:"שלחנו אינסטלטור",ts:"18/01 12:00"}]},
  {id:3,createdAt:Date.now()-1*86400000,title:"מנורה שרופה – כניסה",reporter:"משפחת פורר",reporterRole:"tenant",apt:"2",desc:"מנורה בכניסה לא פועלת",status:"open",cat:"💡",openedAt:"2026-01-20T18:45:00",media:null,mediaType:null,comments:[]},
];
const INIT_POLLS=[
  {id:1,createdAt:Date.now()-3*86400000,q:"האם לאשר החלפת מעלית? (עלות: 85,000 ₪)",opts:["כן, בהחלט","כן, אך בתנאים","לא כרגע","נגד"],votes:[3,1,2,0],total:6,active:true,deadlineISO:"2026-02-28",deadlinePushSent:false,imgUrl:null,comments:[],voters:{"משפחת פרץ":"כן, בהחלט","משפחת לוי":"לא כרגע"}},
  {id:2,createdAt:Date.now()-10*86400000,q:"צבע חדש לחדר המדרגות",opts:["לבן שבור","אפור בהיר","בז' חם","כחול תכלת"],votes:[2,3,1,2],total:8,active:false,deadlineISO:"2026-01-10",deadlinePushSent:true,imgUrl:null,comments:[],voters:{"משפחת לוי":"אפור בהיר","משפחת פורר":"כחול תכלת"}},
];
const INIT_NOTIFS=[
  {id:1,ico:"🗳️",ttl:"סקר חדש נפתח",body:"האם לאשר החלפת מעלית?",ts:"לפני 3 ימים",unread:true},
  {id:2,ico:"✅",ttl:"תקלה נסגרה",body:"דלת הכניסה טופלה",ts:"לפני 5 ימים",unread:false},
];
const INIT_EXPS=[
  {id:1,name:"ביטוח בניין",amt:1200,color:"#58a6ff",month:CUR_MONTH,date:"01/01"},
  {id:2,name:"תחזוקת מעלית",amt:800,color:"#3fb950",month:CUR_MONTH,date:"05/01"},
  {id:3,name:"גינון",amt:450,color:"#f0883e",month:CUR_MONTH,date:"10/01"},
  {id:4,name:"חשמל משותף",amt:380,color:"#a371f7",month:CUR_MONTH,date:"15/01"},
  {id:5,name:"ניקיון",amt:320,color:"#ffa657",month:CUR_MONTH,date:"20/01"},
];
const TRUSTED_PROS=[
  {id:1,name:"אבי כהן",spec:"הנדימן",ico:"🔧",color:"#58a6ff",phone:"050-1112233",rating:4.9,reviews:47,avail:true,tags:["תיקונים","גבס","צבע"],lastReview:"עבודה מצוינת, הגיע בזמן!"},
  {id:2,name:"יוסי פרץ",spec:"אינסטלטור",ico:"💧",color:"#3fb950",phone:"052-3334455",rating:4.8,reviews:63,avail:true,tags:["נזילות","צנרת","דוד"],lastReview:"פתר נזילה שסבלנו ממנה חודשים"},
  {id:3,name:"דני לוי",spec:"חשמלאי",ico:"⚡",color:"#f0883e",phone:"054-5556677",rating:4.7,reviews:38,avail:false,tags:["לוח חשמל","תאורה","שקעים"],lastReview:"מהיר ומסביר בסבלנות"},
  {id:4,name:"רונית מזרחי",spec:"מנקה",ico:"🧹",color:"#a371f7",phone:"058-7778899",rating:5.0,reviews:91,avail:true,tags:["ניקיון עמוק","חלונות"],lastReview:"הכי טובה שהיתה!"},
  {id:5,name:"מוטי ברק",spec:"מנעולן",ico:"🔑",color:"#f85149",phone:"050-9990011",rating:4.6,reviews:29,avail:true,tags:["פריצה","מנעול"],lastReview:"הגיע תוך 20 דקות"},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function useClock(){const[n,sn]=useState(new Date());useEffect(()=>{const t=setInterval(()=>sn(new Date()),1000);return()=>clearInterval(t)},[]);return n;}
function fmtShort(d){return d.toLocaleDateString("he-IL",{day:"2-digit",month:"2-digit",year:"2-digit"});}
function fmtTime(d){return d.toLocaleTimeString("he-IL",{hour:"2-digit",minute:"2-digit"});}
function Toasts({list}){return(<div className="tw">{list.map(t=><div key={t.id} className={`toast ${t.type}`}>{t.ico} {t.msg}</div>)}</div>);}

// ─── EXPORT ──────────────────────────────────────────────────────────────────
function exportReport(issues,polls,exps,balance,type){
  const BOM="\uFEFF";const now=new Date();
  let rows=[];
  if(type==="monthly"){
    const totalExp=exps.reduce((s,e)=>s+Number(e.amt),0);
    rows=[
      [`"דוח חודשי ${CUR_MONTH} – ועד בית+"`,'','',''],
      [`"הופק: ${fmtShort(now)}"`,'','',''],[''],
      ['"יתרה בקופה"',`"₪${balance.toLocaleString()}""`,'',''],
      ['"סה"כ הוצאות"',`"₪${totalExp.toLocaleString()}""`,'',''],[''],
      ['"הוצאות החודש"','','',''],
      ['"#"','"קטגוריה"','"סכום"','"תאריך"'],
      ...exps.map((e,i)=>[i+1,`"${e.name}"`,e.amt,`"${e.date||''}"`]),
      [''],
      ['"תקלות פתוחות"','','',''],
      ['"קטגוריה"','"כותרת"','"מדווח"','"סטטוס"'],
      ...issues.filter(i=>i.status!=='closed').map(i=>[`"${i.cat}"`,`"${i.title}"`,`"${i.reporter}"`,`"${i.status}"`]),
    ];
  }else{
    rows=[
      [`"דוח שנתי ${now.getFullYear()} – ועד בית+"`,'','','',''],
      [`"הופק: ${fmtShort(now)}"`,'','','',''],[''],
      ['"חודש"','"הוצאות"','"תקלות שנפתחו"','"סקרים"','"הערות"'],
      ...MONTHS_HE.map(m=>{
        const mExps=exps.filter(e=>e.month&&e.month.startsWith(m));
        const mIssues=issues.filter(i=>i.openedAt&&new Date(i.openedAt).getMonth()===MONTHS_HE.indexOf(m));
        const mPolls=polls.filter(p=>p.deadlineISO&&new Date(p.deadlineISO).getMonth()===MONTHS_HE.indexOf(m));
        return[`"${m}"`,mExps.reduce((s,e)=>s+Number(e.amt),0),mIssues.length,mPolls.length,`""`];
      }),
      [''],
      ['"יתרה נוכחית"',`"₪${balance.toLocaleString()}""`,'','',''],
    ];
  }
  const csv=BOM+rows.map(r=>Array.isArray(r)?r.join(","):"").join("\n");
  const fname=type==="monthly"?`דוח_${CUR_MONTH.replace(' ','_')}.csv`:`דוח_שנתי_${now.getFullYear()}.csv`;
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download=fname;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
  setTimeout(()=>{
    // Open WhatsApp share — user chooses who to send to
    const waText=encodeURIComponent(`📊 דוח ועד בית+\n${type==="monthly"?CUR_MONTH:`שנתי ${now.getFullYear()}`}\n\nהקובץ "${fname}" מצורף.\n\nפרטים:\n• יתרה: ₪${balance.toLocaleString()}\n• הופק: ${fmtShort(now)}`);
    const wa=`https://wa.me/?text=${waText}`;
    if(window.confirm(`הקובץ "${fname}" הורד בהצלחה!\n\nלפתוח WhatsApp לשיתוף הדוח?`))window.open(wa,"_blank");
  },400);
}

// ─── UPLOAD ZONE ─────────────────────────────────────────────────────────────
function UploadZone({value,onChange}){
  const ref=useRef(null);const[over,setOver]=useState(false);
  function handle(file){if(!file)return;const url=URL.createObjectURL(file);onChange({url,type:file.type.startsWith("video/")?"video":"image",name:file.name});}
  return(<div>
    <input ref={ref} type="file" accept="image/*,video/*" style={{display:"none"}} onChange={e=>handle(e.target.files[0])}/>
    <div className={`upload-zone${over?" over":value?" has":""}`}
      onClick={()=>!value&&ref.current.click()}
      onDragOver={e=>{e.preventDefault();setOver(true);}} onDragLeave={()=>setOver(false)}
      onDrop={e=>{e.preventDefault();setOver(false);handle(e.dataTransfer.files[0]);}}>
      {value
        ?<div style={{position:"relative"}}>
          {value.type==="video"?<video src={value.url} controls style={{width:"100%",maxHeight:150,display:"block"}}/>:<img src={value.url} alt="" style={{width:"100%",maxHeight:150,objectFit:"cover",display:"block"}}/>}
          <button onClick={e=>{e.stopPropagation();onChange(null);}} style={{position:"absolute",top:5,left:5,background:"rgba(0,0,0,.7)",color:"#fff",border:"none",borderRadius:4,padding:"2px 8px",cursor:"pointer",fontSize:12}}>✕ הסר</button>
        </div>
        :<><div style={{fontSize:24,marginBottom:4}}>📎</div><div style={{fontSize:12,color:"var(--t2)"}}>גרור תמונה/סרטון · או <span style={{color:"var(--b)"}}>לחץ לבחירה</span></div><div style={{fontSize:10,color:"var(--t3)",marginTop:2}}>JPG PNG MP4 MOV</div></>
      }
    </div>
  </div>);
}

// ─── COMMENTS ────────────────────────────────────────────────────────────────
function Comments({comments,onAdd,user,locked}){
  const[txt,setTxt]=useState("");
  function submit(){if(!txt.trim()||locked)return;const ts=`${fmtShort(new Date())} ${fmtTime(new Date())}`;onAdd({id:Date.now(),author:user?user.name:"אנונימי",text:txt.trim(),ts});setTxt("");}
  return(<div style={{marginTop:10,borderTop:"1px solid var(--bd)",paddingTop:10}}>
    <div style={{fontSize:11,color:"var(--t2)",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",marginBottom:7}}>
      💬 תגובות ({(comments||[]).length}){locked&&<span style={{fontSize:10,color:"var(--t3)",fontWeight:400,marginRight:6}}>· נסגר להגבות</span>}
    </div>
    {(comments||[]).length===0&&<div style={{fontSize:12,color:"var(--t3)",padding:"6px 0"}}>אין תגובות</div>}
    {(comments||[]).map(cm=><div key={cm.id} className={`cmt ${user&&cm.author===user.name?"me":""}`}><div className="cmt-hdr"><span>{cm.author}</span><span style={{fontSize:10,color:"var(--t3)"}}>{cm.ts}</span></div><div style={{fontSize:13}}>{cm.text}</div></div>)}
    {!locked&&<div style={{display:"flex",gap:7,marginTop:8}}>
      <input className="fi f1" placeholder="כתוב תגובה..." value={txt} onChange={ev=>setTxt(ev.target.value)} onKeyDown={ev=>ev.key==="Enter"&&submit()}/>
      <button className="btn btn-p btn-sm" onClick={submit} disabled={!txt.trim()}>שלח</button>
    </div>}
    {locked&&(comments||[]).length>0&&<div style={{fontSize:11,color:"var(--t3)",marginTop:6,textAlign:"center"}}>🔒 הפריט נסגר – לא ניתן להוסיף תגובות</div>}
  </div>);
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({onLogin}){
  const[scr,setScr]=useState("login");
  const[email,setEmail]=useState("nana@gmail.com");const[pass,setPass]=useState("1234");
  const[err,setErr]=useState("");const[loading,setLoading]=useState(false);
  const[rName,setRName]=useState("");const[rEmail,setREmail]=useState("");const[rPhone,setRPhone]=useState("");
  const[rPass,setRPass]=useState("");const[rPass2,setRPass2]=useState("");const[rApt,setRApt]=useState("");
  const[rRole,setRRole]=useState("tenant");const[rErr,setRErr]=useState("");const[ok,setOk]=useState("");
  function doLogin(){setErr("");const em=email.trim().toLowerCase();if(!em||!pass){setErr("יש למלא אימייל וסיסמה");return}setLoading(true);setTimeout(()=>{const u=USERS_DB.find(x=>x.email.toLowerCase()===em&&x.pass===pass);setLoading(false);if(u)onLogin(u);else setErr("אימייל או סיסמה שגויים");},400);}
  function quickLogin(em,pw){setTimeout(()=>{const u=USERS_DB.find(x=>x.email.toLowerCase()===em&&x.pass===pw);if(u)onLogin(u);},50);}
  function doReg(){setRErr("");if(!rName.trim()||!rEmail.includes("@")||!rPhone.trim()||rPass.length<4){setRErr("יש למלא כל השדות (סיסמה – לפחות 4 תווים)");return}if(rPass!==rPass2){setRErr("הסיסמאות אינן תואמות");return}if(rRole==="tenant"&&!rApt.trim()){setRErr("יש להזין מספר דירה");return}const u={id:Date.now(),name:rName.trim(),email:rEmail.trim().toLowerCase(),phone:rPhone,pass:rPass,apt:rRole==="tenant"?rApt.trim():null,role:rRole};USERS_DB.push(u);setOk("ההרשמה הצליחה!");setTimeout(()=>onLogin(u),900);}
  const ROLES=[{id:"tenant",ico:"🏠",lbl:"דייר",dsc:"גישה לתקלות וסקרים"},{id:"committee",ico:"🏛️",lbl:"ועד בית",dsc:"ניהול הבניין"},{id:"manager",ico:"👔",lbl:"חברת ניהול",dsc:"גישה מלאה"}];
  const fi=(lbl,val,set,type="text",ph="",dir="rtl")=>(<div style={{marginBottom:10}}><label style={{display:"block",fontSize:12,color:"var(--t2)",marginBottom:4,fontWeight:600}}>{lbl}</label><input className="linp" type={type} placeholder={ph} dir={dir} value={val} onChange={ev=>set(ev.target.value)}/></div>);
  return(<div className="lpage"><div className="lbox">
    <div className="ll">ועד<span>בית</span>+</div>
    <div className="ltg">קהילה · תקלות · סקרים · שקיפות</div>
    <div className="auth-tabs">
      <button className={`auth-tab ${scr==="login"?"act":""}`} onClick={()=>{setScr("login");setErr("");setOk("")}}>כניסה</button>
      <button className={`auth-tab ${scr==="register"?"act":""}`} onClick={()=>{setScr("register");setRErr("");setOk("")}}>הרשמה</button>
    </div>
    {scr==="login"&&<div>
      <div style={{fontSize:16,fontWeight:900,marginBottom:14}}>כניסה למערכת</div>
      {err&&<div className="lerr">⚠️ {err}</div>}
      {fi("📧 אימייל",email,setEmail,"email","your@email.com","ltr")}
      {fi("🔒 סיסמה",pass,setPass,"password","••••","ltr")}
      <button className="lbtn" disabled={loading} onClick={doLogin}>{loading?"מתחבר...":"כניסה ←"}</button>
      <div className="ldiv"/>
      <div style={{fontSize:11,color:"var(--t3)",textAlign:"center",marginBottom:7}}>כניסה מהירה:</div>
      <div style={{display:"flex",gap:5}}>
        <button className="ldb" onClick={()=>quickLogin("nana@gmail.com","1234")}>🏠 דייר<br/><span style={{fontSize:9,color:"var(--t3)"}}>הלפגוט</span></button>
        <button className="ldb" onClick={()=>quickLogin("committee@vaad.il","1234")}>🏛️ ועד<br/><span style={{fontSize:9,color:"var(--t3)"}}>בית</span></button>
        <button className="ldb" onClick={()=>quickLogin("manager@vaad.il","1234")}>👔 מנהל<br/><span style={{fontSize:9,color:"var(--t3)"}}>ניהול</span></button>
      </div>
    </div>}
    {scr==="register"&&<div>
      <div style={{fontSize:16,fontWeight:900,marginBottom:14}}>הרשמה</div>
      {rErr&&<div className="lerr">⚠️ {rErr}</div>}
      {ok&&<div style={{background:"rgba(63,185,80,.1)",border:"1px solid rgba(63,185,80,.3)",borderRadius:"var(--ra)",padding:"9px 12px",fontSize:13,color:"var(--g)",marginBottom:11,textAlign:"center",fontWeight:700}}>✅ {ok}</div>}
      <div style={{marginBottom:10}}><label style={{display:"block",fontSize:12,color:"var(--t2)",marginBottom:4,fontWeight:600}}>סוג משתמש</label><div className="role-cards">{ROLES.map(r=><div key={r.id} className={`role-card ${rRole===r.id?"sel":""}`} onClick={()=>setRRole(r.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div style={{fontSize:20}}>{r.ico}</div><div style={{fontSize:11,fontWeight:700}}>{r.lbl}</div><div style={{fontSize:9,color:"var(--t3)"}}>{r.dsc}</div></div>)}</div></div>
      {fi("👤 שם מלא *",rName,setRName,"text","ישראל ישראלי")}
      <div className="reg-grid">{fi("📧 אימייל *",rEmail,setREmail,"email","","ltr")}{fi("📱 טלפון *",rPhone,setRPhone,"tel","050-","ltr")}</div>
      <div className="reg-grid">{fi("🔒 סיסמה *",rPass,setRPass,"password","4+ תווים","ltr")}{fi("🔒 אימות *",rPass2,setRPass2,"password","חזור","ltr")}</div>
      {rRole==="tenant"&&fi("🚪 מספר דירה *",rApt,setRApt,"text","למשל: 5")}
      <button className="lbtn" style={{marginTop:8}} onClick={doReg}>הרשמה וכניסה ←</button>
    </div>}
  </div></div>);
}

// ─── USER CHIP ────────────────────────────────────────────────────────────────
function UserChip({user,onLogout}){
  const[open,setOpen]=useState(false);
  const ico={tenant:"🏠",committee:"🏛️",manager:"👔"}[user.role];
  return(<>
    <div className="uch" onClick={()=>setOpen(true)}>
      <div style={{width:25,height:25,borderRadius:"50%",background:{tenant:"#1a3a5c",committee:"#1a3d2a",manager:"#2d1a5c"}[user.role],display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900}}>{user.name.charAt(0)}</div>
      <span style={{fontSize:12,fontWeight:700,maxWidth:80,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name.split(" ")[0]}</span>
      <span style={{fontSize:11}}>{ico}</span>
    </div>
    {open&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:18}} onClick={()=>setOpen(false)}>
      <div style={{background:"var(--s)",border:"1px solid var(--bd)",borderRadius:"var(--rl)",padding:24,width:270,textAlign:"center"}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:38,marginBottom:6}}>{ico}</div>
        <div style={{fontWeight:900,fontSize:16,marginBottom:3}}>{user.name}</div>
        <div style={{fontSize:12,color:"var(--t2)",marginBottom:16,fontFamily:"var(--m)"}}>{user.email}</div>
        <button className="btn btn-s btn-bl" style={{marginBottom:7}} onClick={()=>setOpen(false)}>סגור</button>
        <button className="btn btn-d btn-bl" onClick={()=>{setOpen(false);onLogout();}}>🚪 התנתק</button>
      </div>
    </div>}
  </>);
}

// ─── FINANCE (manager/committee only) ────────────────────────────────────────
function Finance({user,exps,setExps,notifs,setNotifs,issues,polls,addToast,balance,setBalance}){
  const isAdmin=user.role==="manager"||user.role==="committee";
  const[editBal,setEditBal]=useState(false);
  const[newBal,setNewBal]=useState("");
  const[showAddExp,setShowAddExp]=useState(false);
  const[ne,setNe]=useState({name:"",amt:"",date:""});
  const totalExp=exps.reduce((s,e)=>s+Number(e.amt),0);
  const netBalance=balance-totalExp;
  const EXP_COLORS=["#58a6ff","#3fb950","#f0883e","#a371f7","#ffa657","#f85149","#58c0ff","#7ee787"];
  function addExp(){
    if(!ne.name||!ne.amt)return;
    const color=EXP_COLORS[exps.length%EXP_COLORS.length];
    const now=new Date();
    setExps(p=>[...p,{id:Date.now(),name:ne.name.trim(),amt:Number(ne.amt),color,month:CUR_MONTH,date:ne.date||fmtShort(now)}]);
    addToast("✅",`הוצאה "${ne.name}" ₪${ne.amt} נוספה`,"s");
    setNe({name:"",amt:"",date:""});setShowAddExp(false);
  }
  function sendBalanceNotif(){
    const msg=`יתרת הקופה נכון להיום: ₪${netBalance.toLocaleString()}`;
    setNotifs(p=>[{id:Date.now(),ico:"💰",ttl:"עדכון יתרה",body:msg,ts:"עכשיו",unread:true},...p]);
    addToast("📱","עדכון יתרה נשלח לדיירים","i");
  }
  return(<div>
    <div className="pg">💰 ניהול כספים</div>
    {/* Balance box */}
    <div className="bal-box">
      <div className="bal-lbl">יתרה בקופה כרגע</div>
      <div className={`bal-amt`} style={{color:netBalance>=0?"var(--g)":"var(--r)"}}>{netBalance>=0?"+":""}₪{netBalance.toLocaleString()}</div>
      <div className="bal-sub">קרן: ₪{balance.toLocaleString()} · הוצאות: ₪{totalExp.toLocaleString()}</div>
      {isAdmin&&<div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12}}>
        <button className="btn btn-s btn-sm" onClick={()=>{setEditBal(true);setNewBal(String(balance));}}>✏️ עדכן יתרה</button>
        <button className="btn btn-b btn-sm" onClick={sendBalanceNotif}>📱 שלח לדיירים</button>
      </div>}
    </div>
    {editBal&&<div className="ov" onClick={()=>setEditBal(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <div className="mh">עדכון יתרת קופה<button className="mx" onClick={()=>setEditBal(false)}>×</button></div>
      <div className="fg"><label className="fl">יתרה חדשה (₪)</label><input className="fi" type="number" value={newBal} onChange={e=>setNewBal(e.target.value)} placeholder="הזן סכום"/></div>
      <button className="btn btn-p btn-bl" onClick={()=>{setBalance(Number(newBal));setEditBal(false);addToast("✅","יתרה עודכנה ל-₪"+Number(newBal).toLocaleString(),"s");}}>שמור</button>
    </div></div>}
    {/* Expenses */}
    <div className="card">
      <div className="ct"><span className="dot"/>הוצאות – {CUR_MONTH}
        {isAdmin&&<button className="btn btn-p btn-sm" style={{marginRight:"auto"}} onClick={()=>setShowAddExp(true)}>+ הוסף הוצאה</button>}
      </div>
      {showAddExp&&<div style={{background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:"var(--ra)",padding:"12px",marginBottom:10}}>
        <div className="reg-grid" style={{marginBottom:8}}>
          <div className="fg" style={{margin:0}}><label className="fl">שם הוצאה</label><input className="fi" placeholder="ביטוח, גינון..." value={ne.name} onChange={e=>setNe(p=>({...p,name:e.target.value}))}/></div>
          <div className="fg" style={{margin:0}}><label className="fl">סכום ₪</label><input className="fi" type="number" placeholder="0" value={ne.amt} onChange={e=>setNe(p=>({...p,amt:e.target.value}))}/></div>
        </div>
        <div className="fg" style={{margin:"0 0 8px"}}><label className="fl">תאריך</label><input className="fi" type="date" value={ne.date} onChange={e=>setNe(p=>({...p,date:e.target.value}))}/></div>
        <div style={{display:"flex",gap:7}}>
          <button className="btn btn-p btn-sm" disabled={!ne.name||!ne.amt} onClick={addExp}>הוסף</button>
          <button className="btn btn-s btn-sm" onClick={()=>setShowAddExp(false)}>ביטול</button>
        </div>
      </div>}
      {exps.length===0&&<div style={{textAlign:"center",fontSize:13,color:"var(--t3)",padding:"10px 0"}}>אין הוצאות החודש</div>}
      {exps.map((e,i)=><div key={e.id} className="exp-row">
        <div style={{width:8,height:8,borderRadius:"50%",background:e.color,flexShrink:0}}/>
        <span style={{flex:1,fontSize:13,fontWeight:600}}>{e.name}</span>
        {e.date&&<span style={{fontSize:11,color:"var(--t3)",fontFamily:"var(--m)"}}>{e.date}</span>}
        <span style={{fontFamily:"var(--m)",fontWeight:700}}>₪{Number(e.amt).toLocaleString()}</span>
        {isAdmin&&<button onClick={()=>{if(window.confirm("למחוק?"))setExps(p=>p.filter((_,j)=>j!==i));}} style={{background:"none",border:"none",color:"var(--r)",cursor:"pointer",fontSize:14,padding:0}}>🗑️</button>}
      </div>)}
      <div className="div"/>
      <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:13}}>
        <span>סה"כ הוצאות:</span><span style={{fontFamily:"var(--m)",color:"var(--r)"}}>₪{totalExp.toLocaleString()}</span>
      </div>
    </div>
    {/* Stats */}
    <div className="stats">
      <div className="stat b"><div className="sl">קרן</div><div className="sv b">₪{balance.toLocaleString()}</div><div className="ss">יתרה שהוזנה</div></div>
      <div className="stat w"><div className="sl">הוצאות</div><div className="sv o">₪{totalExp.toLocaleString()}</div><div className="ss">החודש</div></div>
      <div className={`stat ${netBalance>=0?"":"d"}`}><div className="sl">נטו</div><div className={`sv ${netBalance>=0?"g":"r"}`}>{netBalance>=0?"+":""}₪{netBalance.toLocaleString()}</div><div className="ss">{netBalance>=0?"עודף":"גירעון"}</div></div>
    </div>
    {/* Export */}
    {isAdmin&&<div className="card"><div className="ct"><span className="dot"/>ייצוא דוחות</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <button className="btn btn-s" onClick={()=>exportReport(issues,polls,exps,netBalance,"monthly")}>📊 דוח חודשי (CSV + WhatsApp)</button>
        <button className="btn btn-s" onClick={()=>exportReport(issues,polls,exps,netBalance,"annual")}>📋 דוח שנתי (CSV + WhatsApp)</button>
      </div>
    </div>}
  </div>);
}

// ─── ISSUES ───────────────────────────────────────────────────────────────────
function CloseUpload({techId,onClose,onSubmit}){
  const[afterMedia,setAfterMedia]=useState(null);
  const[notes,setNotes]=useState("");
  return(<div>
    <div className="fg"><label className="fl">📎 תמונה/סרטון לאחר הטיפול (מומלץ)</label>
      <UploadZone value={afterMedia} onChange={setAfterMedia}/>
    </div>
    <div className="fg"><label className="fl">📝 סיכום הטיפול</label>
      <textarea className="fi" placeholder="תאר את הפתרון..." value={notes} onChange={e=>setNotes(e.target.value)}/>
    </div>
    <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
      <button className="btn btn-s" onClick={onClose}>ביטול</button>
      <button className="btn btn-p" onClick={()=>onSubmit(techId,afterMedia,notes)}>✅ סגור ושלח פוש לדיירים</button>
    </div>
    {!afterMedia&&<div style={{textAlign:"center",fontSize:11,color:"var(--t3)",marginTop:6}}>ניתן לסגור גם ללא תמונה</div>}
  </div>);
}


function Issues({user,issues,setIssues,addNotif,addToast}){
  const now=useClock();
  const isAdmin=user&&(user.role==="manager"||user.role==="committee");
  const isTenant=!isAdmin;
  const[showRep,setShowRep]=useState(false);
  const[ni,setNi]=useState({title:"",desc:"",apt:"1",cat:"🔒",media:null});
  const[techId,setTechId]=useState(null);
  const SL={open:"פתוח",inprogress:"בטיפול",closed:"נסגר"};
  const SC={open:"bo",inprogress:"bw",closed:"bc"};
  function submit(){
    if(!ni.title)return;
    const aptVal=isAdmin?"כללי":ni.apt;
    const rep=user?user.name:"דייר";
    const newI={id:Date.now(),createdAt:Date.now(),title:ni.title,desc:ni.desc,apt:aptVal,reporter:rep,reporterRole:user?user.role:null,cat:ni.cat,status:"open",openedAt:new Date().toISOString(),media:ni.media?ni.media.url:null,mediaType:ni.media?ni.media.type:null,comments:[]};
    setIssues(p=>[newI,...p]);
    if(addNotif)addNotif("🔧",`תקלה חדשה: ${ni.title}`,`${ni.cat} · דווח ע"י ${rep}`);
    addToast("✅","הקריאה נפתחה ונשמרה","s");
    setShowRep(false);setNi({title:"",desc:"",apt:"1",cat:"🔒",media:null});
  }
  function closeIssue(id){
    setIssues(p=>p.map(i=>i.id===id?{...i,status:"closed",closedAt:new Date().toISOString(),ts:`${fmtShort(now)} ${fmtTime(now)}`}:i));
    setTechId(null);addToast("✅","הקריאה נסגרה","s");
    if(addNotif)setTimeout(()=>addNotif("✅","תקלה נסגרה",issues.find(i=>i.id===id)?.title||""),300);
  }
  return(<div>
    <div className="row" style={{marginBottom:12}}><div className="pg" style={{margin:0}}>🔧 תקלות</div><button className="btn btn-p btn-sm" onClick={()=>setShowRep(true)}>+ דווח תקלה</button></div>
    {issues.map(issue=><div key={issue.id} className="ic">
      <div className="ih">
        <span style={{fontSize:18,lineHeight:1.2}}>{issue.cat}</span>
        <div style={{flex:1}}><div className="it">{issue.title}</div><div className="idesc">{issue.desc}</div></div>
        <span className={`badge ${SC[issue.status]}`}>{SL[issue.status]}</span>
      </div>
      {issue.media&&<div style={{marginBottom:8}}>
        <div style={{fontSize:10,color:"var(--t3)",fontFamily:"var(--m)",marginBottom:4}}>📷 לפני הטיפול</div>
        {issue.mediaType==="video"?<video src={issue.media} controls style={{width:"100%",maxHeight:160,borderRadius:"var(--ra)",border:"1px solid var(--bd)"}}/>:<img src={issue.media} alt="" style={{width:"100%",maxHeight:160,objectFit:"cover",borderRadius:"var(--ra)",border:"1px solid var(--bd)"}}/>}
      </div>}
      {issue.afterMedia&&<div style={{marginBottom:8}}>
        <div style={{fontSize:10,color:"var(--g)",fontFamily:"var(--m)",marginBottom:4}}>✅ אחרי הטיפול</div>
        {issue.afterMediaType==="video"?<video src={issue.afterMedia} controls style={{width:"100%",maxHeight:160,borderRadius:"var(--ra)",border:"1px solid rgba(63,185,80,.4)"}}/>:<img src={issue.afterMedia} alt="" style={{width:"100%",maxHeight:160,objectFit:"cover",borderRadius:"var(--ra)",border:"1px solid rgba(63,185,80,.4)"}}/>}
        {issue.closingNotes&&<div style={{fontSize:12,color:"var(--t2)",padding:"6px 0"}}>{issue.closingNotes}</div>}
      </div>}
      <div className="ifoot">
        <span style={{fontFamily:"var(--m)",fontSize:10,color:"var(--t3)"}}>📅 {new Date(issue.openedAt).toLocaleDateString("he-IL")}</span>
        <span style={{fontSize:12,color:"var(--t2)"}}>{issue.apt==="כללי"?"📋 כללי":`דירה ${issue.apt}`} · {issue.reporter}{issue.reporterRole==="manager"&&<span style={{color:"var(--p)",fontWeight:700}}> (חברת ניהול)</span>}{issue.reporterRole==="committee"&&<span style={{color:"var(--g)",fontWeight:700}}> (ועד בית)</span>}</span>
        {issue.status!=="closed"&&isAdmin&&<button className="btn btn-s btn-sm" style={{marginRight:"auto"}} onClick={()=>setTechId(issue.id)}>🔧 סגור</button>}
        {issue.status!=="closed"&&isTenant&&<span style={{fontSize:11,color:"var(--t3)",marginRight:"auto"}}>ממתין לטיפול</span>}
        {issue.status==="closed"&&<span style={{fontSize:11,color:"var(--g)",marginRight:"auto"}}>✅ {issue.ts||"טופל"}</span>}
        {isAdmin&&<button className="btn btn-d btn-sm" onClick={()=>{if(window.confirm("למחוק?"))setIssues(p=>p.filter(i=>i.id!==issue.id));}}>🗑️</button>}
        {issue.createdAt&&<span style={{fontSize:10,color:"var(--t3)",fontFamily:"var(--m)"}}>{Math.round((Date.now()-issue.createdAt)/86400000)}י</span>}
      </div>
      <Comments comments={issue.comments||[]} user={user} locked={issue.status==="closed"} onAdd={cmt=>setIssues(p=>p.map(i=>i.id===issue.id?{...i,comments:[...(i.comments||[]),cmt]}:i))}/>
    </div>)}
    {showRep&&<div className="ov" onClick={()=>setShowRep(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <div className="mh">דיווח תקלה<button className="mx" onClick={()=>setShowRep(false)}>×</button></div>
      <div className="fg"><label className="fl">קטגוריה</label><select className="fi" value={ni.cat} onChange={e=>setNi(p=>({...p,cat:e.target.value}))}>{["🔒 נעילה","💧 אינסטלציה","💡 חשמל","🛗 מעלית","🏗️ תשתיות","🧹 ניקיון"].map(c=><option key={c} value={c.split(" ")[0]}>{c}</option>)}</select></div>
      <div className="fg"><label className="fl">כותרת *</label><input className="fi" placeholder="תאר בקצרה" value={ni.title} onChange={e=>setNi(p=>({...p,title:e.target.value}))}/></div>
      <div className="fg"><label className="fl">פירוט</label><textarea className="fi" placeholder="פרט..." value={ni.desc} onChange={e=>setNi(p=>({...p,desc:e.target.value}))}/></div>
      {isAdmin&&<div style={{background:"rgba(163,113,247,.08)",border:"1px solid rgba(163,113,247,.2)",borderRadius:"var(--ra)",padding:"8px 12px",marginBottom:10,fontSize:13,fontWeight:700,color:"var(--p)"}}>📋 מדווח ע"י: {user.name} ({user.role==="manager"?"חברת ניהול":"ועד בית"})</div>}
      {!isAdmin&&<div className="fg"><label className="fl">דירה</label><select className="fi" value={ni.apt} onChange={e=>setNi(p=>({...p,apt:e.target.value}))}>{Array.from({length:18},(_,i)=><option key={i+1} value={String(i+1)}>דירה {i+1}</option>)}</select></div>}
      <div className="fg"><label className="fl">📎 תמונה / סרטון</label><UploadZone value={ni.media} onChange={v=>setNi(p=>({...p,media:v}))}/></div>
      <button className="btn btn-p btn-bl" disabled={!ni.title} style={{opacity:ni.title?1:.4}} onClick={submit}>שלח דיווח</button>
    </div></div>}
    {techId&&(()=>{
      const ti=issues.find(i=>i.id===techId);
      return(<div className="ov" onClick={()=>setTechId(null)}><div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="mh">🔧 סגירת תקלה<button className="mx" onClick={()=>setTechId(null)}>×</button></div>
        <div style={{background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:"var(--ra)",padding:"10px 12px",marginBottom:12}}>
          <div style={{fontWeight:700,marginBottom:2}}>{ti?.title}</div>
          <div style={{fontSize:12,color:"var(--t2)"}}>דווח ע"י {ti?.reporter} · {ti?.cat}</div>
        </div>
        <div style={{fontFamily:"var(--m)",fontSize:13,color:"var(--g)",textAlign:"center",marginBottom:12,letterSpacing:1}}>⏱ {new Date().toLocaleTimeString("he-IL")} · {fmtShort(new Date())}</div>
        <CloseUpload techId={techId} onClose={()=>setTechId(null)} onSubmit={(id,afterMedia,notes)=>{
          setIssues(p=>p.map(i=>i.id===id?{...i,status:"closed",closedAt:new Date().toISOString(),ts:`${fmtShort(now)} ${fmtTime(now)}`,afterMedia:afterMedia?afterMedia.url:null,afterMediaType:afterMedia?afterMedia.type:null,closingNotes:notes}:i));
          setTechId(null);addToast("✅","הקריאה נסגרה עם תיעוד","s");
          if(addNotif)setTimeout(()=>addNotif("✅","תקלה טופלה ונסגרה",ti?.title||""),300);
        }}/>
      </div></div>);
    })()}
  </div>);
}

// ─── POLLS ────────────────────────────────────────────────────────────────────
function Polls({user,polls,setPolls,addNotif,addToast}){
  const isAdmin=user&&(user.role==="manager"||user.role==="committee");
  const isTenant=!isAdmin;
  const[voted,setVoted]=useState({});
  const[showNew,setShowNew]=useState(false);
  const[np,setNp]=useState({q:"",opts:["",""],deadlineISO:"",imgUrl:null});
  const[showV,setShowV]=useState({});
  const[over,setOver]=useState(false);
  const imgRef=useRef(null);
  useEffect(()=>{function chk(){const now=new Date();setPolls(p=>p.map(pp=>{if(!pp.active)return pp;if(now>new Date(pp.deadlineISO))return{...pp,active:false};return pp;}))}chk();const t=setInterval(chk,15000);return()=>clearInterval(t);},[]);
  function handleImg(file){if(!file||!file.type.startsWith("image/"))return;setNp(p=>({...p,imgUrl:URL.createObjectURL(file)}));}
  function vote(pid,idx){
    const prev=voted[pid];const name=user?user.name:`אנונימי`;
    if(prev===idx){setVoted(v=>{const n={...v};delete n[pid];return n});setPolls(ps=>ps.map(p=>p.id!==pid?p:{...p,votes:p.votes.map((v,i)=>i===idx?Math.max(0,v-1):v),total:Math.max(0,p.total-1),voters:{...p.voters,[name]:undefined}}));}
    else{setPolls(ps=>ps.map(p=>{if(p.id!==pid)return p;const v=[...p.votes];if(prev!==undefined)v[prev]=Math.max(0,v[prev]-1);v[idx]++;return{...p,votes:v,total:prev!==undefined?p.total:p.total+1,voters:{...(p.voters||{}),[name]:p.opts[idx]}};}));setVoted(v=>({...v,[pid]:idx}));}
  }
  function create(){
    const opts=np.opts.filter(o=>o.trim());
    if(!np.q||opts.length<2||!np.deadlineISO)return;
    const newP={id:Date.now(),createdAt:Date.now(),q:np.q,opts,votes:opts.map(()=>0),total:0,active:true,deadlineISO:np.deadlineISO,deadlinePushSent:false,imgUrl:np.imgUrl||null,author:user?user.name:"",comments:[],voters:{}};
    setPolls(p=>[newP,...p]);
    if(addNotif)addNotif("🗳️",`סקר חדש: ${np.q.slice(0,40)}`,`פורסם ע"י ${user?user.name:"מנהל"} · הצבע עכשיו!`);
    addToast("🗳️","סקר חדש נפתח ונשמר","s");
    setShowNew(false);setNp({q:"",opts:["",""],deadlineISO:"",imgUrl:null});
  }
  function sendPush(p){
    const w=p.total>0?p.opts[p.votes.indexOf(Math.max(...p.votes))]:"";
    addToast("📱",`פוש עם תוצאות נשלח`,"i");
    setPolls(ps=>ps.map(pp=>pp.id===p.id?{...pp,deadlinePushSent:true}:pp));
    if(addNotif)addNotif("🗳️","תוצאות סקר",`"${w}" ניצחה בסקר: ${p.q.slice(0,30)}`);
  }
  function winnerOf(p){if(!p.total)return null;const m=Math.max(...p.votes);const i=p.votes.indexOf(m);return{opt:p.opts[i],pct:Math.round((m/p.total)*100),idx:i};}
  function daysLeft(iso){const d=Math.ceil((new Date(iso)-new Date())/86400000);if(d<0)return null;if(d===0)return"נגמר היום";return`${d} ימים`;}
  return(<div>
    <div className="row" style={{marginBottom:12}}><div className="pg" style={{margin:0}}>🗳️ סקרים</div>{isAdmin&&<button className="btn btn-p btn-sm" onClick={()=>setShowNew(true)}>+ סקר חדש</button>}</div>
    {polls.map(p=>{
      const mv=voted[p.id];const hv=mv!==undefined;const dl=daysLeft(p.deadlineISO);const w=!p.active?winnerOf(p):null;
      const dlFmt=new Date(p.deadlineISO).toLocaleDateString("he-IL",{day:"numeric",month:"long",year:"numeric"});
      const voterList=Object.entries(p.voters||{}).filter(([,v])=>v);
      return(<div key={p.id} className="pcard">
        <div className="row" style={{marginBottom:8}}><div style={{fontWeight:700,fontSize:13,flex:1}}>{p.q}</div><span className={`badge ${p.active?"bo":"bc"}`}>{p.active?"פעיל":"הסתיים"}</span></div>
        {p.imgUrl&&<img src={p.imgUrl} alt="" style={{width:"100%",maxHeight:150,objectFit:"cover",borderRadius:"var(--ra)",marginBottom:8,border:"1px solid var(--bd)"}}/>}
        {p.opts.map((opt,i)=>{const pct=p.total>0?Math.round((p.votes[i]/p.total)*100):0;const isSel=mv===i;const isW=!p.active&&w&&w.idx===i;return(
          <div key={i} className="po" onClick={()=>p.active&&vote(p.id,i)}>
            <input type="radio" readOnly checked={!!isSel}/>
            <div className="pol" style={isW?{borderColor:"var(--g)",background:"rgba(63,185,80,.08)"}:{}}>
              <div className="pbf" style={{width:hv||!p.active?`${pct}%`:"0%"}}/>
              <span style={{position:"relative"}}>{isW&&"🏆 "}{opt}</span>
              {(hv||!p.active)&&<span className="ppc">{pct}%</span>}
            </div>
          </div>
        )})}
        <div className="pftr">
          <span className="pm">📅 {dlFmt}</span><span className="pm">{p.total} הצביעו</span>
          {p.active&&dl&&<span style={{fontSize:11,color:"var(--o)",fontFamily:"var(--m)"}}>⏱ {dl}</span>}
          {p.active&&!hv&&<span style={{fontSize:12,color:"var(--b)",marginRight:"auto"}}>לחץ להצבעה</span>}
          {p.active&&hv&&<button className="pch" onClick={()=>vote(p.id,mv)}>↩ שנה</button>}
          {p.active&&isAdmin&&<button style={{background:"none",border:"1px solid var(--bd)",borderRadius:"var(--ra)",padding:"3px 9px",cursor:"pointer",fontSize:11,color:"var(--t2)"}} onClick={()=>addToast("📱","פוש תזכורת נשלח","i")}>📱 תזכורת</button>}
          {voterList.length>0&&<button style={{background:"none",border:"1px solid var(--bd)",borderRadius:"var(--ra)",padding:"3px 9px",cursor:"pointer",fontSize:11,color:"var(--b)"}} onClick={()=>setShowV(s=>({...s,[p.id]:!s[p.id]}))}>👥 מי הצביע?</button>}
        </div>
        {showV[p.id]&&voterList.length>0&&<div className="voters-panel">{voterList.map(([name,choice])=><div key={name} className="vr"><span style={{fontWeight:600}}>{name}</span><span className="badge bo">{choice}</span></div>)}</div>}
        {!p.active&&w&&<div>
          <div className="pw"><span style={{fontSize:17}}>🏆</span><div><div style={{fontSize:11,color:"var(--t2)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:2}}>תוצאה סופית</div><div style={{fontSize:13,fontWeight:900,color:"var(--g)"}}>{w.opt} – {w.pct}%</div></div></div>
          {!p.deadlinePushSent&&isAdmin&&<button className="btn btn-p btn-bl" style={{marginTop:6}} onClick={()=>sendPush(p)}>📱 שלח פוש עם תוצאות</button>}
          {p.deadlinePushSent&&<div className="pe">✅ פוש נשלח לדיירים</div>}
        </div>}
        {isAdmin&&<div style={{display:"flex",justifyContent:"flex-end",gap:6,marginTop:8}}>
          <span style={{fontSize:10,color:"var(--t3)",fontFamily:"var(--m)",alignSelf:"center"}}>{p.createdAt?Math.round((Date.now()-p.createdAt)/86400000)+" ימים":""}</span>
          <button className="btn btn-d btn-sm" onClick={()=>{if(window.confirm("למחוק סקר?"))setPolls(p=>p.filter(pp=>pp.id!==p.id));}}>🗑️ מחק</button>
        </div>}
        <Comments comments={p.comments||[]} user={user} locked={!p.active} onAdd={cmt=>setPolls(ps=>ps.map(pp=>pp.id===p.id?{...pp,comments:[...(pp.comments||[]),cmt]}:pp))}/>
      </div>);
    })}
    {showNew&&<div className="ov" onClick={()=>setShowNew(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <div className="mh">🗳️ סקר חדש<button className="mx" onClick={()=>setShowNew(false)}>×</button></div>
      <div className="fg"><label className="fl">שאלה</label><textarea className="fi" placeholder="מה לשאול?" value={np.q} onChange={e=>setNp(p=>({...p,q:e.target.value}))}/></div>
      <div className="fg"><label className="fl">🖼️ תמונה (גרור או לחץ)</label>
        <input ref={imgRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleImg(e.target.files[0])}/>
        <div className={`upload-zone${over?" over":np.imgUrl?" has":""}`} onClick={()=>!np.imgUrl&&imgRef.current.click()} onDragOver={e=>{e.preventDefault();setOver(true);}} onDragLeave={()=>setOver(false)} onDrop={e=>{e.preventDefault();setOver(false);handleImg(e.dataTransfer.files[0]);}}>
          {np.imgUrl?<div style={{position:"relative"}}><img src={np.imgUrl} alt="" style={{width:"100%",maxHeight:110,objectFit:"cover",display:"block"}}/><button onClick={e=>{e.stopPropagation();setNp(p=>({...p,imgUrl:null}));}} style={{position:"absolute",top:4,left:4,background:"rgba(0,0,0,.7)",color:"#fff",border:"none",borderRadius:4,padding:"2px 7px",cursor:"pointer",fontSize:11}}>✕</button></div>:<><div style={{fontSize:22}}>🖼️</div><div style={{fontSize:12,color:"var(--t2)",marginTop:4}}>גרור תמונה · או <span style={{color:"var(--b)"}}>לחץ</span></div></>}
        </div>
      </div>
      {np.opts.map((opt,i)=><div key={i} className="fg"><label className="fl">אפשרות {i+1}</label><input className="fi" value={opt} onChange={e=>{const o=[...np.opts];o[i]=e.target.value;setNp(p=>({...p,opts:o}));}}/></div>)}
      <button className="btn btn-s btn-sm" style={{marginBottom:9}} onClick={()=>setNp(p=>({...p,opts:[...p.opts,""]}))}>+ הוסף אפשרות</button>
      <div className="fg"><label className="fl">📅 תאריך סגירה</label><input type="date" className="fi" value={np.deadlineISO} onChange={e=>setNp(p=>({...p,deadlineISO:e.target.value}))}/></div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        <button className="btn btn-p btn-bl" style={{opacity:np.q&&np.deadlineISO?1:.5}} disabled={!np.q||!np.deadlineISO} onClick={create}>✅ פרסם סקר</button>
        <button className="btn btn-s btn-bl" style={{opacity:np.q&&np.deadlineISO?1:.5}} disabled={!np.q||!np.deadlineISO} onClick={()=>{create();addToast("📱","פוש נשלח לדיירים","i");}}>📱 פרסם + שלח פוש</button>
      </div>
    </div></div>}
  </div>);
}

// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
function Notifs({notifs,setNotifs,addToast}){
  const[showC,setShowC]=useState(false);
  const[msg,setMsg]=useState({title:"",body:"",type:"info"});
  const PTYPES=[{id:"urgent",ico:"🚨",lbl:"דחוף"},{id:"info",ico:"ℹ️",lbl:"עדכון"},{id:"issue",ico:"🔧",lbl:"תקלה"},{id:"poll",ico:"🗳️",lbl:"סקר"},{id:"finance",ico:"💰",lbl:"כספים"}];
  function send(){
    if(!msg.title.trim())return;
    const t=PTYPES.find(x=>x.id===msg.type);
    setNotifs(p=>[{id:Date.now(),ico:t.ico,ttl:msg.title,body:msg.body||"",ts:"עכשיו",unread:true},...p]);
    addToast("📱",`פוש נשלח: ${msg.title}`,"i");setShowC(false);setMsg({title:"",body:"",type:"info"});
  }
  const uc=(notifs||[]).filter(n=>n.unread).length;
  return(<div>
    <div className="row" style={{marginBottom:12}}><div className="pg" style={{margin:0}}>🔔 התראות {uc>0&&<span style={{background:"var(--b)",color:"#fff",borderRadius:10,padding:"1px 6px",fontSize:11,marginRight:4}}>{uc}</span>}</div>
      <div style={{display:"flex",gap:7}}>
        {uc>0&&<button className="btn btn-s btn-sm" onClick={()=>setNotifs(p=>p.map(n=>({...n,unread:false})))}>סמן כנקרא</button>}
        <button className="btn btn-p btn-sm" onClick={()=>setShowC(true)}>📱 שלח פוש</button>
      </div>
    </div>
    {(notifs||[]).map(n=><div key={n.id} className={`ni ${n.unread?"ur":""}`}>
      <span style={{fontSize:16,flexShrink:0}}>{n.ico}</span>
      <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,marginBottom:2}}>{n.ttl}</div><div style={{fontSize:12,color:"var(--t2)"}}>{n.body}</div><div style={{fontFamily:"var(--m)",fontSize:10,color:"var(--t3)",marginTop:2}}>{n.ts}</div></div>
      {n.unread&&<div style={{width:7,height:7,borderRadius:"50%",background:"var(--b)",flexShrink:0}}/>}
    </div>)}
    {showC&&<div className="ov" onClick={()=>setShowC(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <div className="mh">📱 שלח פוש לדיירים<button className="mx" onClick={()=>setShowC(false)}>×</button></div>
      <div className="fg"><label className="fl">סוג</label><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>{PTYPES.map(t=><button key={t.id} style={{background:"var(--s2)",border:`2px solid ${msg.type===t.id?"var(--g)":"var(--bd)"}`,borderRadius:"var(--ra)",padding:"7px 5px",cursor:"pointer",fontFamily:"var(--f)",color:"var(--t)",fontSize:12,fontWeight:600,display:"flex",flexDirection:"column",alignItems:"center",gap:3}} onClick={()=>setMsg(m=>({...m,type:t.id}))}><span style={{fontSize:16}}>{t.ico}</span>{t.lbl}</button>)}</div></div>
      <div className="fg"><label className="fl">כותרת</label><input className="fi" placeholder="כותרת ההודעה" value={msg.title} onChange={e=>setMsg(m=>({...m,title:e.target.value}))}/></div>
      <div className="fg"><label className="fl">תוכן</label><textarea className="fi" placeholder="פרטים..." value={msg.body} onChange={e=>setMsg(m=>({...m,body:e.target.value}))}/></div>
      {msg.title&&<div style={{background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:"var(--ra)",padding:"10px 12px",marginBottom:10}}><div style={{fontSize:10,color:"var(--t3)",marginBottom:4,textTransform:"uppercase"}}>תצוגה מקדימה</div><div style={{display:"flex",gap:8,alignItems:"flex-start"}}><span style={{fontSize:18}}>{PTYPES.find(t=>t.id===msg.type)?.ico}</span><div><div style={{fontWeight:700,fontSize:13}}>{msg.title}</div>{msg.body&&<div style={{fontSize:12,color:"var(--t2)",marginTop:2}}>{msg.body}</div>}</div></div></div>}
      <button className="btn btn-p btn-bl" style={{opacity:msg.title?1:.4}} disabled={!msg.title} onClick={send}>📱 שלח לכל הדיירים</button>
    </div></div>}
  </div>);
}

// ─── TRUSTED PROS ─────────────────────────────────────────────────────────────
function TrustedPros({addToast}){
  const[f,setF]=useState("הכל");
  const cats=["הכל","הנדימן","אינסטלטור","חשמלאי","מנקה","מנעולן"];
  const shown=f==="הכל"?TRUSTED_PROS:TRUSTED_PROS.filter(p=>p.spec===f);
  const strs=n=>"★".repeat(Math.floor(n))+(n%1>=.5?"☆":"");
  return(<div>
    <div className="pg">⭐ אנשי מקצוע אמינים</div>
    <div className="cf">{cats.map(x=><button key={x} className={`cb ${f===x?"act":""}`} onClick={()=>setF(x)}>{x}</button>)}</div>
    <div className="pgrid">{shown.map(pro=><div key={pro.id} className="pc">
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <div style={{width:42,height:42,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,border:`2px solid ${pro.color}55`,background:pro.color+"22",flexShrink:0}}>{pro.ico}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:900,fontSize:14,marginBottom:1}}>{pro.name}</div>
          <div style={{fontSize:12,color:"var(--t2)"}}>{pro.spec}</div>
          <div style={{display:"flex",alignItems:"center",gap:5,marginTop:2,flexWrap:"wrap"}}>
            <span style={{color:"#f5c518",fontSize:12}}>{strs(pro.rating)}</span>
            <span style={{fontSize:11,color:"var(--t2)",fontFamily:"var(--m)"}}>{pro.rating} ({pro.reviews})</span>
            <span style={{fontSize:11,color:pro.avail?"var(--g)":"var(--o)"}}>{pro.avail?"● זמין":"○ עסוק"}</span>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>{pro.tags.map(t=><span key={t} className="ptg">{t}</span>)}</div>
      <div style={{background:"var(--s)",borderRadius:"var(--ra)",padding:"8px 10px",fontSize:12,color:"var(--t2)",lineHeight:1.5,borderRight:"3px solid var(--bd)",marginBottom:10}}>💬 "{pro.lastReview}"</div>
      <div style={{display:"flex",gap:7}}>
        <button style={{flex:1,background:"var(--g)",color:"#0d1117",border:"none",borderRadius:"var(--ra)",padding:8,fontFamily:"var(--f)",fontWeight:700,fontSize:12,cursor:"pointer"}} onClick={()=>addToast("📞",`מתקשר ל${pro.name}`,"s")}>📞 התקשר</button>
        <button style={{background:"var(--s2)",border:"1px solid var(--bd)",color:"var(--t)",borderRadius:"var(--ra)",padding:"8px 10px",fontFamily:"var(--f)",fontWeight:700,fontSize:12,cursor:"pointer"}} onClick={()=>addToast("💬",`הודעה ל${pro.name}`,"i")}>💬 WhatsApp</button>
      </div>
    </div>)}</div>
  </div>);
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const[user,setUser]=useState(null);
  const[tab,setTab]=useState("issues");
  const[toasts,setToasts]=useState([]);
  const[issues,setIssues]=useState(INIT_ISSUES);
  const[polls,setPolls]=useState(INIT_POLLS);
  const[notifs,setNotifs]=useState(INIT_NOTIFS);
  const[exps,setExps]=useState(INIT_EXPS);
  const[balance,setBalance]=useState(6700);
  // Auto-remove items older than 100 days from state
  useEffect(()=>{
    const LIMIT=100*86400000;
    const now=Date.now();
    setIssues(p=>p.filter(i=>!i.createdAt||now-i.createdAt<LIMIT));
    setPolls(p=>p.filter(p=>!p.createdAt||now-p.createdAt<LIMIT));
  },[]);
  function addToast(ico,msg,type="s"){const id=Date.now();setToasts(p=>[...p,{id,ico,msg,type}]);setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3200);}
  function addNotif(ico,ttl,body){setNotifs(p=>[{id:Date.now(),ico,ttl,body,ts:"עכשיו",unread:true},...p]);}
  function login(u){setUser(u);setTab("issues");}
  function logout(){setUser(null);setTab("issues");}
  if(!user)return(<><style>{S}</style><LoginScreen onLogin={login}/><Toasts list={toasts}/></>);
  const isAdmin=user.role==="manager"||user.role==="committee";
  const uc=notifs.filter(n=>n.unread).length;
  const TABS=[
    {id:"issues",lbl:"תקלות",ico:"🔧"},
    {id:"polls",lbl:"סקרים",ico:"🗳️"},
    {id:"finance",lbl:"כספים",ico:"💰"},
    {id:"pros",lbl:"בעלי מקצוע",ico:"⭐"},
    ...(isAdmin?[{id:"notifs",lbl:`התראות${uc>0?` (${uc})`:""}`,ico:"🔔"}]:[]),
  ];
  return(<>
    <style>{S}</style>
    <div className="app">
      <header className="hdr">
        <div className="logo">ועד<span>בית</span>+ <span style={{fontSize:11,fontFamily:"var(--m)",color:"var(--t3)",fontWeight:400}}>קהילה</span></div>
        <UserChip user={user} onLogout={logout}/>
      </header>
      <nav className="nav">{TABS.map(t=><button key={t.id} className={`nb ${tab===t.id?"act":""}`} onClick={()=>setTab(t.id)}>{t.ico} {t.lbl}</button>)}</nav>
      <main className="main">
        {tab==="issues"&&<Issues user={user} issues={issues} setIssues={setIssues} addNotif={addNotif} addToast={addToast}/>}
        {tab==="polls"&&<Polls user={user} polls={polls} setPolls={setPolls} addNotif={addNotif} addToast={addToast}/>}
        {tab==="pros"&&<TrustedPros addToast={addToast}/>}
        {tab==="finance"&&<Finance user={user} exps={exps} setExps={setExps} notifs={notifs} setNotifs={setNotifs} issues={issues} polls={polls} addToast={addToast} balance={balance} setBalance={setBalance}/>}
        {tab==="notifs"&&isAdmin&&<Notifs notifs={notifs} setNotifs={setNotifs} addToast={addToast}/>}
      </main>
    </div>
    <Toasts list={toasts}/>
  </>);
}
