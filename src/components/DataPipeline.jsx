import { useEffect, useRef, useState, useCallback } from "react";

const C = {
  night:"#0A1628",gold:"#F4B942",ivory:"#FAF6EE",
  cream:"#F0E8D5",rust:"#C0451A",teal:"#3A9E7E",sand:"#D4A96A",
};
const S_TOP=`repeating-linear-gradient(90deg,${C.gold} 0,${C.gold} 10px,${C.rust} 10px,${C.rust} 20px,${C.night} 20px,${C.night} 30px,${C.teal} 30px,${C.teal} 40px,${C.ivory} 40px,${C.ivory} 50px)`;
const S_KEN=`repeating-linear-gradient(90deg,${C.rust} 0,${C.rust} 7px,${C.gold} 7px,${C.gold} 14px,${C.night} 14px,${C.night} 19px,${C.gold} 19px,${C.gold} 26px,${C.rust} 26px,${C.rust} 33px,${C.teal} 33px,${C.teal} 38px,${C.night} 38px,${C.night} 43px,${C.teal} 43px,${C.teal} 50px)`;
const S_BOT=`repeating-linear-gradient(90deg,${C.night} 0,${C.night} 12px,${C.gold} 12px,${C.gold} 20px,${C.night} 20px,${C.night} 28px,${C.teal} 28px,${C.teal} 36px,${C.night} 36px,${C.night} 44px,${C.rust} 44px,${C.rust} 52px)`;
const ADINKRA=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='%23F4B942' stroke-width='1.5'/%3E%3Ccircle cx='30' cy='30' r='12' fill='none' stroke='%23F4B942' stroke-width='1'/%3E%3Cline x1='10' y1='30' x2='50' y2='30' stroke='%23F4B942' stroke-width='1'/%3E%3Cline x1='30' y1='10' x2='30' y2='50' stroke='%23F4B942' stroke-width='1'/%3E%3C/svg%3E")`;

const LANGS=[
  {code:"EN",name:"English"},{code:"ZU",name:"isiZulu"},{code:"XH",name:"isiXhosa"},
  {code:"AF",name:"Afrikaans"},{code:"ST",name:"Sesotho"},{code:"TN",name:"Setswana"},
  {code:"SS",name:"siSwati"},{code:"VE",name:"Tshivenda"},{code:"TS",name:"Xitsonga"},
  {code:"NR",name:"isiNdebele"},{code:"NS",name:"Sepedi"},
];
const INDUSTRIES=["General","Plumbing","Retail","Legal","Healthcare"];
const TAG={
  gold:{border:C.gold,color:"#7a4e06",bg:"rgba(244,185,66,.1)"},
  rust:{border:C.rust,color:C.rust,bg:"rgba(192,69,26,.08)"},
  teal:{border:C.teal,color:C.teal,bg:"rgba(58,158,126,.08)"},
};

const STAGES=[
  {id:0,icon:"📥",label:"Data\nSources",dark:true,badge:"Entry Layer",signal:5,
   industry:{General:{title:"Multi-channel data intake",desc:"Web forms, AI chatbot, WhatsApp and direct API submissions feed raw structured and unstructured data into the pipeline."},Plumbing:{title:"Customer job requests intake",desc:"Call-backs, WhatsApp quotes, website job forms and walk-in requests are captured from all channels into a single queue."},Retail:{title:"Shopper & order data capture",desc:"Online orders, in-store enquiries, WhatsApp product questions and loyalty sign-ups all feed into one unified intake point."},Legal:{title:"Client matter intake",desc:"Consultation requests, referral emails, website contact forms and WhatsApp enquiries are captured and queued for triage."},Healthcare:{title:"Patient enquiry capture",desc:"Appointment requests, WhatsApp health questions, referral forms and walk-in registrations enter the pipeline automatically."}},
   lang:{EN:"Web forms, AI chatbot, WhatsApp and direct API submissions feed raw data into the pipeline.",ZU:"Amafomu ewebhu, ingxoxo ye-AI, i-WhatsApp kanye nezicelo ze-API zihlinzeka idatha ehlanzekile.",XH:"Iifom zewebhu, ingxoxo ye-AI, i-WhatsApp kunye nezicelo ze-API zifaka idatha esiseko.",AF:"Webvorms, KI-kletsbots, WhatsApp en direkte API-indiening voed rou data in die pyplyn.",ST:"Mefuta ya tsebišo, AI chatbot, WhatsApp le dikopo tsa API di kenela data pipeline.",TN:"Diformi tsa wepesaete, AI chatbot, WhatsApp le dikopo tsa API di tshela data mo pipeleng.",SS:"Emafomu ewebhu, ingxoxo ye-AI, i-WhatsApp kanye izicelo ze-API zifaka idatha ku-pipeline.",VE:"Mafomo a vhutshilo, AI chatbot, WhatsApp na zwitatiswa zwa API zwi isa data kha pipeline.",TS:"Mifomu ya wepusayiti, AI chatbot, WhatsApp na swikombelo swa API swi nghenisa data.",NR:"Amafomu wewebhu, ingxoxo ye-AI, i-WhatsApp kanye nezicelo ze-API zifaka idatha.",NS:"Mefomo ya inthanete, AI chatbot, WhatsApp le dikopo tša API di laetša datha go pipeline."},
   tags:[["Lead Capture","rust"],["AI Chat","gold"],["WhatsApp","teal"]]},
  {id:1,icon:"⚡",label:"Trigger\n& Events",dark:false,badge:"Routing Layer",signal:5,
   industry:{General:{title:"Automated triggers & routing",desc:"Make.com workflows fire on real-time webhooks or time schedules. Every record is validated, normalised and routed correctly."},Plumbing:{title:"Job urgency routing",desc:"Emergency plumbing calls trigger instant escalation. Scheduled maintenance jobs are queued by area and availability."},Retail:{title:"Order & stock event triggers",desc:"New orders, low-stock alerts and abandoned carts fire automated workflows that route each event to the right team."},Legal:{title:"Matter priority routing",desc:"Urgent litigation requests are separated from general enquiries and routed to the correct practice area automatically."},Healthcare:{title:"Appointment priority routing",desc:"Emergency referrals are flagged and fast-tracked. Routine bookings are queued and routed to available practitioners."}},
   lang:{EN:"Make.com workflows fire on real-time webhooks or schedules. Every record is validated and routed.",ZU:"Imisebenzi ye-Make.com iqala ngama-webhooks esikhathi sangempela. Irekodi ngayinye iqinisekiswa.",XH:"Iinkqubo ze-Make.com ziqala kwi-webhooks zexesha lokwenyani. Irekhodi nganye iqinisekiswa.",AF:"Make.com-werkvloeie aktiveer op intydse webhooks of skedules. Elke rekord word gevalideer.",ST:"Mesebetsi ya Make.com e thoma ho webhooks tsa nako ya nnete. Rekoto e nngwe le e nngwe e netefatswa.",TN:"Mešomo ya Make.com e simolola go webhooks tsa nako ya gone. Rekoto nngwe le nngwe e netefatswa.",SS:"Imisebenzi ye-Make.com iqala ema-webhooks. Irekodi ngayinye iqinisekiswa futsi iyatiwa.",VE:"Mishumo ya Make.com i thoma kha webhooks dza tshifhinga tsha zwino. Rekodo i rekhiwa.",TS:"Misava ya Make.com yi sungula eka webhooks. Rekodi yin'wana na yin'wana yi ringanyetwa.",NR:"Imisebenzi ye-Make.com iqala kuwebhooks. Irekodi ngayinye iqinisekiswa bese iyatiwa.",NS:"Mešomo ya Make.com e thoma go webhooks tša nako ya bjale. Rekoto ye nngwe le ye nngwe e netefatšwa."},
   tags:[["Workflow Auto","gold"],["Event Triggers","rust"],["Real-time","teal"]]},
  {id:2,icon:"🗄️",label:"Data\nStorage",dark:true,badge:"Memory Layer",signal:4,
   industry:{General:{title:"CRM logging & persistence",desc:"Validated records land in the CRM and structured database. Each lead gets a unique business reference number."},Plumbing:{title:"Job card & client logging",desc:"Every job request creates a digital job card in the CRM linked to the client profile, property address and job history."},Retail:{title:"Order & customer record storage",desc:"Orders, customer profiles, purchase history and loyalty points are persisted in the CRM and product database."},Legal:{title:"Matter file & client storage",desc:"Every client matter opens a structured file in the CRM with timestamps, documents and billing reference numbers."},Healthcare:{title:"Patient record persistence",desc:"Patient details, appointment history and referral documents are stored securely with unique patient reference numbers."}},
   lang:{EN:"Validated records land in the CRM and database. Each lead gets a unique business reference number.",ZU:"Amarekhodi aqinisekisiwe afika ku-CRM nasedatabhasini. Ikheli ngalinye lithole inombolo eyodwa.",XH:"Iirekhodi eziqinisekisiweyo zifika kwi-CRM kunye nedatabase. Ikheli ngalinye lifumana inombolo.",AF:"Gevalideerde rekords land in die CRM en databasis. Elke lood kry 'n unieke verwysingsnommer.",ST:"Direkoto tse netefaditsweng di fihla CRM le database. Khothaletso e nngwe le e nngwe e fumana nomoro.",TN:"Direkoto tse netefetsweng di fika CRM le database. Khothatso nngwe le nngwe e bona nomoro.",SS:"Emarekodi laqinisekisiwe afika ku-CRM nasedatabase. Ikheli ngalinye litfola inombolo eyodwa.",VE:"Rekodo dzi rekhiwaho dzi swika kha CRM na database. Ṱhoho i nngwe na i nngwe i wana nomboro.",TS:"Tirekodi leti ringanyweke ti fika eka CRM na database. Swikhombo swin'wana na swin'wana swi wana nomboro.",NR:"Amarekodi aqinisekisiwe afika ku-CRM nasedatabase. Ikheli ngalinye litfola inombolo eyodwa.",NS:"Direkoto tše netefaditšwego di fihla CRM le database. Khothalo ye nngwe le ye nngwe e hwetša nomoro."},
   tags:[["CRM Logging","rust"],["Lead Tracking","teal"],["Reference IDs","gold"]]},
  {id:3,icon:"🤖",label:"AI\nEngine",dark:false,badge:"Brain Layer",signal:5,
   industry:{General:{title:"Lead scoring & content gen",desc:"Gemini AI scores qualification likelihood, classifies intent and generates personalised outreach copy automatically."},Plumbing:{title:"Job value scoring & quoting",desc:"AI estimates job complexity and value, scores urgency and drafts a personalised WhatsApp quote for the plumber to approve."},Retail:{title:"Product recommendation engine",desc:"AI scores purchase intent, recommends products based on browsing history and generates personalised promotional messages."},Legal:{title:"Matter complexity scoring",desc:"AI classifies the legal matter type, scores complexity and urgency, and drafts an initial client response letter."},Healthcare:{title:"Symptom triage & appointment AI",desc:"AI classifies appointment urgency from patient descriptions and drafts a personalised booking confirmation message."}},
   lang:{EN:"Gemini AI scores leads, classifies intent and generates personalised outreach copy automatically.",ZU:"I-Gemini AI ihlola amakheli, ihlukanisa inhloso futhi yakha umlayezo wokufinyelela owahlukiwe.",XH:"I-Gemini AI iphonononga amakheli, ihlela injongo kwaye iyenza imiyalezo yokufikelela.",AF:"Gemini KI punte leidrade, klassifiseer bedoeling en genereer gepersonaliseerde boodskappe.",ST:"Gemini AI e lekanya dikhothaletso, e hlophisa merero le ho theha melaetsa ya botho.",TN:"Gemini AI e batlisisa dikhothatso, e hlophisa maikaelelo le go bopa melaetsa ya motho.",SS:"I-Gemini AI ihlola amakheli, ihlukanisa inhloso futsi yakha umlayezo wokufinyelela.",VE:"Gemini AI i vhiga mahosi, i khetha ndivhuwo na u bumba mafhungo a u thikhedza.",TS:"Gemini AI yi kambela swi fikeleleki, yi hlawula xiyimo na ku bumba mhaka ya ndhawulo.",NR:"I-Gemini AI ihlola amakheli, ihlukanisa inhloso futhi yakha umlayezo wokufinyelela.",NS:"Gemini AI e lekanya dikhothatso, e hlophisa maikaelelo le go bopa melaetsa ya motho."},
   tags:[["Lead Scoring","gold"],["AI Classify","teal"],["Content Gen","rust"]]},
  {id:4,icon:"🔁",label:"Automation\nNode",dark:true,badge:"Action Layer",signal:4,
   industry:{General:{title:"CRM writeback & booking",desc:"Enriched data writes back to CRM with AI scores. Booking confirmations and email sequences fire automatically."},Plumbing:{title:"Job scheduling & team dispatch",desc:"Confirmed jobs write to the job board. The nearest available plumber receives a dispatch notification automatically."},Retail:{title:"Order fulfilment & notifications",desc:"Confirmed orders trigger picking lists, courier bookings and automated customer delivery notifications."},Legal:{title:"Matter filing & billing triggers",desc:"Accepted matters create billing records, schedule follow-up tasks and send automated client onboarding emails."},Healthcare:{title:"Appointment booking & reminders",desc:"Confirmed appointments write to the practitioner schedule and trigger automated patient reminder sequences."}},
   lang:{EN:"Enriched data writes back to CRM with AI scores. Booking confirmations fire automatically.",ZU:"Idatha enokulengwa ibhala ku-CRM ngamaphuzu e-AI. Iziqinisekiso zokubhukha ziqala ngokuzenzakalela.",XH:"Idatha ephiwe amaphuzu ibhala kwi-CRM. Iziqinisekiso zebhukhu ziqala ngokuzenzekelayo.",AF:"Verrykte data skryf terug na CRM met KI-tellings. Besprekingsbevestigings brand outomaties.",ST:"Data e eketsehileng e ngola CRM ka dipalo tsa AI. Ditlhomamiso tsa poloko di thoma ka ho zithata.",TN:"Data e e tlhoatsitsweng e kwala CRM ka dipalo tsa AI. Ditlhomamiso tsa poloko di simolola ka bo tsona.",SS:"Idatha lehlabiweko ibhala ku-CRM ngemaphuzu e-AI. Tiqinisekiso tekubhukha tiqala ngekwendzeka.",VE:"Data i nnzhi i nwala kha CRM na maipfi a AI. Vhunekhedzwa ha u bukha vhu thoma nga u tshene.",TS:"Data leyi kuleke yi tsala eka CRM na tiphuzu ta AI. Swipimelo swa ku buka swi sungula swo tshena.",NR:"Idatha enokulengwa ibhala ku-CRM ngemaphuzu e-AI. Iziqinisekiso zokubhukha ziqala ngokwendzeka.",NS:"Datha ye e okeditšwego e ngwala CRM ka dipalo tša AI. Ditlhomamiso tša poloko di thoma ka bo tšona."},
   tags:[["CRM Writeback","rust"],["Booking Flows","gold"],["Email Sequences","teal"]]},
  {id:5,icon:"📊",label:"Live\nDashboard",dark:false,badge:"Output Layer",signal:5,isFinal:true,
   industry:{General:{title:"Analytics & client delivery",desc:"Real-time visibility over leads, pipeline health and conversion rates via live dashboard, Looker Studio and mobile app."},Plumbing:{title:"Live job board & revenue view",desc:"See all active jobs, technician locations, completed work and monthly revenue in one live operations dashboard."},Retail:{title:"Sales & inventory dashboard",desc:"Real-time sales figures, stock levels, top-selling products and customer acquisition costs in a single view."},Legal:{title:"Matter pipeline & billing view",desc:"Active matters, outstanding billing, court dates and client communication history in one practitioner dashboard."},Healthcare:{title:"Patient flow & appointment view",desc:"Today's appointments, patient queue, referral status and practitioner availability in a live clinic dashboard."}},
   lang:{EN:"Real-time visibility over leads, pipeline health and conversion rates via live dashboard.",ZU:"Ukubona kwesikhathi sangempela phezu kwamakheli, impilo yepayipi kanye nezinga lokuguqulwa.",XH:"Ukubona kwexesha lokwenyani phezu kwamakheli, impilo yepayipi kunye namaphepha oguqulelo.",AF:"Intydse sigbaarheid oor leidrade, pyplyn gesondheid en omskakelingsyfers via lewendige dashboard.",ST:"Pono ya nako ya nnete ho dikhothaletso, bophelo ba pipeline le diperesente tsa phetoho.",TN:"Paono ya nako ya gone go dikhothatso, boitekanelo jwa pipeline le diperesente tsa phetoho.",SS:"Kubona kwesikhashana kwe-real-time phezu kwamakheli, empilo ye-pipeline ne-conversion rates.",VE:"U vhona ha tshifhinga tsha zwino kha mahosi, vupo ha pipeline na ndivhuwo ya u shandukisa.",TS:"Ku vona ka nkarhi wa zwino eka swi fikeleleki, vulavuleri bya pipeline na maphersente ya ku hundzulukela.",NR:"Kubona kwesikhashana kwe-real-time phezu kwamakheli, nempilo ye-pipeline ne-conversion rates.",NS:"Go bona ga nako ya bjale go dikhothatso, bophelo bja pipeline le diperesente tša phetoho."},
   tags:[["Live Dashboard","gold"],["Analytics","teal"],["Client Delivery","rust"]]},
];

// ── Canvas helpers ─────────────────────────────────────────────────────────────
function rrect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
function bezPts(ax,ay,bx,by,n=22){const mx=(ax+bx)/2,my=(ay+by)/2-Math.abs(bx-ax)*0.1;return Array.from({length:n+1},(_,i)=>{const t=i/n;return{x:(1-t)*(1-t)*ax+2*(1-t)*t*mx+t*t*bx,y:(1-t)*(1-t)*ay+2*(1-t)*t*my+t*t*by};});}

class Particle{
  constructor(path,delay){this.path=path;this.t=-(delay||0);this.speed=0.004+Math.random()*0.003;this.color=[C.gold,C.rust,C.teal][Math.floor(Math.random()*3)];this.r=3+Math.random()*1.5;}
  tick(){this.t+=this.speed;if(this.t>1)this.t=-0.25-Math.random()*0.25;}
  draw(ctx){if(this.t<0)return;const tt=Math.min(this.t,1);const seg=(this.path.length-1)*tt;const i=Math.min(Math.floor(seg),this.path.length-2);const f=seg-i;const px=this.path[i].x+(this.path[i+1].x-this.path[i].x)*f;const py=this.path[i].y+(this.path[i+1].y-this.path[i].y)*f;const op=tt<0.08?tt/0.08:tt>0.92?(1-tt)/0.08:1;ctx.save();ctx.globalAlpha=op*0.9;ctx.beginPath();ctx.arc(px,py,this.r,0,Math.PI*2);ctx.fillStyle=this.color;ctx.shadowColor=this.color;ctx.shadowBlur=9;ctx.fill();ctx.restore();}
}

const INJECTED_CSS=`
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:ital,wght@0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
@keyframes inkHint{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(1.6)}}
@keyframes ttIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
@keyframes ctrlGlow{0%,100%{box-shadow:0 0 0 0 rgba(244,185,66,0)}50%{box-shadow:0 0 18px 3px rgba(244,185,66,0.09)}}
.ink-hint{animation:inkHint 1.4s ease-in-out infinite;}
.ink-ctrl-panel{
  display:grid;
  grid-template-columns:1fr 1px 1fr;
  gap:0;
  background:rgba(255,255,255,0.03);
  border:1.5px solid rgba(244,185,66,0.2);
  border-radius:14px;
  overflow:hidden;
  animation:ctrlGlow 3s ease-in-out infinite;
}
.ink-ctrl-divider{background:rgba(244,185,66,0.12);width:1px;align-self:stretch;}
.ink-ctrl-col{padding:14px 18px;display:flex;flex-direction:column;gap:10px;}
.ink-ctrl-col:first-child{border-right:none;}
.ink-ctrl-heading{
  display:flex;align-items:center;gap:7px;
  font-family:'Cinzel',serif;
  font-size:8px;letter-spacing:2.5px;
  text-transform:uppercase;color:#D4A96A;opacity:.85;
  margin-bottom:2px;
}
.ink-ctrl-icon{
  width:22px;height:22px;border-radius:6px;
  display:flex;align-items:center;justify-content:center;
  font-size:12px;flex-shrink:0;
}
.ink-ctrl-icon-lang{background:rgba(244,185,66,.15);}
.ink-ctrl-icon-ind{background:rgba(58,158,126,.15);}
.ink-lang-btn{
  display:flex;align-items:center;gap:8px;
  background:rgba(244,185,66,.1);
  border:1.5px solid rgba(244,185,66,.35);
  border-radius:10px;
  padding:9px 14px;
  cursor:pointer;
  font-size:13px;font-weight:600;
  color:#F4B942;
  font-family:"DM Sans",sans-serif;
  transition:background .2s,border-color .2s;
  width:100%;
  min-height:44px;
}
.ink-lang-btn:hover{background:rgba(244,185,66,.18);border-color:rgba(244,185,66,.6);}
.ink-lang-drop{
  position:absolute;top:calc(100% + 8px);left:0;right:0;
  z-index:300;
  background:#0d1e38;
  border:1.5px solid rgba(244,185,66,.28);
  border-radius:12px;
  padding:6px;
  max-height:240px;overflow-y:auto;
  box-shadow:0 16px 48px rgba(0,0,0,.8);
}
.ink-lang-drop::-webkit-scrollbar{width:4px;}
.ink-lang-drop::-webkit-scrollbar-thumb{background:rgba(244,185,66,.2);border-radius:2px;}
.ink-lang-item{
  display:flex;align-items:center;gap:9px;
  padding:9px 12px;border-radius:8px;
  cursor:pointer;font-size:12px;
  transition:background .15s;
}
.ink-lang-item:hover{background:rgba(244,185,66,.1);}
.ink-lang-item.active{background:rgba(244,185,66,.14);color:#F4B942;}
.ink-lang-code{
  font-family:"Cinzel",serif;font-size:9px;
  letter-spacing:1px;color:#D4A96A;
  min-width:28px;font-weight:600;
}
.ink-pills{display:flex;flex-wrap:wrap;gap:6px;}
.ink-pill{
  font-size:11px;font-weight:500;
  padding:7px 13px;border-radius:20px;
  border:1.5px solid;cursor:pointer;
  font-family:"DM Sans",sans-serif;
  transition:all .2s;letter-spacing:.3px;
  min-height:36px;display:flex;align-items:center;
}
.ink-pill-off{
  border-color:rgba(58,158,126,.28);
  background:rgba(58,158,126,.05);
  color:rgba(58,158,126,.7);
}
.ink-pill-off:hover{
  border-color:rgba(58,158,126,.6);
  background:rgba(58,158,126,.12);
  color:#3A9E7E;
}
.ink-pill-on{
  border-color:#3A9E7E;
  background:rgba(58,158,126,.18);
  color:#3A9E7E;
  box-shadow:0 0 10px rgba(58,158,126,.2);
}
@media(max-width:600px){
  .ink-ctrl-panel{
    grid-template-columns:1fr;
    grid-template-rows:auto 1px auto;
  }
  .ink-ctrl-divider{
    width:auto;height:1px;
    grid-column:1;
  }
  .ink-ctrl-col{padding:14px 16px;}
}
`;

// ── Sub-components ─────────────────────────────────────────────────────────────
function LangSelector({activeLang,onSelect}){
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  const cur=LANGS.find(l=>l.code===activeLang);
  useEffect(()=>{
    const fn=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",fn);
    return()=>document.removeEventListener("mousedown",fn);
  },[]);
  return(
    <div ref={ref} style={{position:"relative",width:"100%"}}>
      <button
        className="ink-lang-btn"
        onClick={()=>setOpen(o=>!o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span style={{fontSize:18}}>🇿🇦</span>
        <span style={{flex:1,textAlign:"left"}}>{cur?.name}</span>
        <span style={{
          fontSize:11,opacity:.55,
          transform:open?"rotate(180deg)":"rotate(0deg)",
          transition:"transform .2s",
          display:"inline-block",
        }}>▾</span>
      </button>
      {open&&(
        <div className="ink-lang-drop" role="listbox">
          {LANGS.map(l=>(
            <div
              key={l.code}
              role="option"
              aria-selected={l.code===activeLang}
              className={`ink-lang-item${l.code===activeLang?" active":""}`}
              onClick={()=>{onSelect(l.code);setOpen(false);}}
              style={{color:l.code===activeLang?C.gold:"rgba(250,246,238,.75)"}}
            >
              <span className="ink-lang-code">{l.code}</span>
              <span>{l.name}</span>
              {l.code===activeLang&&(
                <span style={{marginLeft:"auto",color:C.gold,fontSize:12}}>✓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function IndustryPills({active,onSelect}){
  const icons={General:"⚙️",Plumbing:"🔧",Retail:"🛍️",Legal:"⚖️",Healthcare:"🏥"};
  return(
    <div className="ink-pills">
      {INDUSTRIES.map(ind=>(
        <button
          key={ind}
          className={`ink-pill ${ind===active?"ink-pill-on":"ink-pill-off"}`}
          onClick={()=>onSelect(ind)}
          aria-pressed={ind===active}
        >
          <span style={{marginRight:5,fontSize:13}}>{icons[ind]}</span>
          {ind}
        </button>
      ))}
    </div>
  );
}

function Tooltip({node,industry,lang,pos,arrowLeft}){
  if(!node)return null;
  const ind=node.industry[industry]||node.industry.General;
  const desc=node.lang[lang]||node.lang.EN;
  const langName=LANGS.find(l=>l.code===lang)?.name;
  return(
    <div style={{position:"absolute",left:pos.x,top:pos.y,zIndex:100,maxWidth:240,minWidth:200,animation:"ttIn .22s ease forwards",pointerEvents:"none"}}>
      <div style={{position:"absolute",top:-6,left:arrowLeft,width:0,height:0,borderLeft:"6px solid transparent",borderRight:"6px solid transparent",borderBottom:"6px solid rgba(244,185,66,.38)"}}/>
      <div style={{background:"linear-gradient(135deg,#0d1e38,#0A1628)",border:"1px solid rgba(244,185,66,.38)",borderRadius:10,padding:"14px 16px",boxShadow:"0 10px 36px rgba(0,0,0,.65)"}}>
        <div style={{display:"inline-block",fontFamily:"'Cinzel',serif",fontSize:8,fontWeight:700,letterSpacing:1.5,padding:"2px 9px",background:C.gold,color:C.night,textTransform:"uppercase",marginBottom:7}}>{node.badge}</div>
        <p style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:600,color:C.ivory,lineHeight:1.4,marginBottom:6}}>{ind.title}</p>
        <p style={{fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:C.teal,marginBottom:4,fontWeight:500}}>{langName} explanation:</p>
        <p style={{fontSize:11,color:"rgba(250,246,238,.65)",lineHeight:1.78,marginBottom:9}}>{desc}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:2}}>
          {node.tags.map(([label,type])=>(
            <span key={label} style={{fontSize:9,fontWeight:500,letterSpacing:.3,padding:"2px 7px",border:"1px solid",textTransform:"uppercase",borderColor:TAG[type].border,color:TAG[type].color,background:TAG[type].bg}}>{label}</span>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"flex-end",gap:3,marginTop:8}}>
          <span style={{fontSize:8,letterSpacing:1,textTransform:"uppercase",color:"rgba(212,169,106,.5)",marginRight:4}}>Signal</span>
          {[1,2,3,4,5].map(b=><div key={b} style={{width:5,borderRadius:1,height:5+b*3,background:b<=node.signal?C.teal:"rgba(58,158,126,.15)"}}/>)}
          <span style={{fontSize:9,color:"rgba(58,158,126,.7)",marginLeft:4}}>{node.signal===5?"Excellent":"Good"}</span>
        </div>
        {node.isFinal&&(
          <a href="https://inkanyezi-technologies-ch6grb.cal.com" target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:8,background:"rgba(244,185,66,.1)",border:"1px solid rgba(244,185,66,.3)",borderRadius:8,padding:"9px 12px",marginTop:10,textDecoration:"none",pointerEvents:"all"}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#1a2e50,#0f1e36)",border:"1.5px solid rgba(244,185,66,.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>🚀</div>
            <div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:600,color:C.gold}}>Book a free call</div>
              <div style={{fontSize:9,color:"rgba(212,169,106,.65)",marginTop:1}}>Sanele · Inkanyezi Technologies</div>
            </div>
            <div style={{marginLeft:"auto",fontSize:14,color:"rgba(244,185,66,.6)"}}>→</div>
          </a>
        )}
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function DataPipeline(){
  const canvasRef=useRef(null);
  const wrapRef=useRef(null);
  const sr=useRef({W:800,H:270,DPR:1,nodePos:[],particles:[],activeNode:-1,hoverNode:-1,raf:null});
  const [activeLang,setActiveLang]=useState("EN");
  const [activeIndustry,setActiveIndustry]=useState("General");
  const [activeNode,setActiveNode]=useState(-1);
  const [ttState,setTtState]=useState(null);

  function computeLayout(W,H){
    const pos=[];
    if(W<500){const pX=44,pY=50,cols=2,cW=(W-pX*2)/cols,rH=(H-pY*2)/3;STAGES.forEach((_,i)=>pos.push({x:pX+cW*(i%cols)+cW/2,y:pY+rH*Math.floor(i/cols)+rH/2}));}
    else if(W<800){const pX=52,pY=44,cols=3,cW=(W-pX*2)/cols,rH=(H-pY*2)/2;STAGES.forEach((_,i)=>pos.push({x:pX+cW*(i%cols)+cW/2,y:pY+rH*Math.floor(i/cols)+rH/2}));}
    else{const pX=64,gap=(W-pX*2)/(STAGES.length-1);STAGES.forEach((_,i)=>pos.push({x:pX+gap*i,y:H/2}));}
    return pos;
  }
  function buildParticles(np){const p=[];for(let i=0;i<STAGES.length-1;i++){const path=bezPts(np[i].x,np[i].y,np[i+1].x,np[i+1].y);for(let k=0;k<3;k++)p.push(new Particle(path,k*0.33));}return p;}

  function drawNode(ctx,node,pos,NW,NH,isActive,isHover){
    if(!pos)return;const{x,y}=pos,isDark=node.dark,R=11;
    if(isActive||isHover){ctx.save();ctx.shadowColor=C.gold;ctx.shadowBlur=isActive?26:13;rrect(ctx,x-NW/2,y-NH/2,NW,NH,R);ctx.fillStyle="transparent";ctx.fill();ctx.restore();}
    const g=ctx.createLinearGradient(x-NW/2,y-NH/2,x+NW/2,y+NH/2);
    if(isActive){g.addColorStop(0,"#2e3d18");g.addColorStop(1,"#1a2a08");ctx.strokeStyle=C.gold;ctx.lineWidth=2;}
    else if(isDark){g.addColorStop(0,"#1e3258");g.addColorStop(1,"#0f1e38");ctx.strokeStyle=isHover?"rgba(244,185,66,.55)":"rgba(244,185,66,.2)";ctx.lineWidth=1;}
    else{g.addColorStop(0,"#ffffff");g.addColorStop(1,"#f0e8d5");ctx.strokeStyle=isHover?"rgba(192,69,26,.6)":"rgba(192,69,26,.22)";ctx.lineWidth=1;}
    ctx.fillStyle=g;rrect(ctx,x-NW/2,y-NH/2,NW,NH,R);ctx.fill();ctx.stroke();
    const sh=ctx.createLinearGradient(x,y-NH/2,x,y);sh.addColorStop(0,"rgba(255,255,255,0.13)");sh.addColorStop(1,"rgba(255,255,255,0)");ctx.fillStyle=sh;rrect(ctx,x-NW/2,y-NH/2,NW,NH/2,R);ctx.fill();
    ctx.save();ctx.beginPath();ctx.moveTo(x+NW/2-13,y-NH/2);ctx.lineTo(x+NW/2,y-NH/2);ctx.lineTo(x+NW/2,y-NH/2+13);ctx.closePath();ctx.fillStyle=isDark?"rgba(244,185,66,.5)":"rgba(192,69,26,.38)";ctx.fill();ctx.restore();
    ctx.font="19px serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(node.icon,x,y-7);
    ctx.font="700 8px sans-serif";ctx.fillStyle=isActive?C.gold:isDark?"rgba(212,169,106,.72)":C.rust;ctx.textAlign="center";ctx.textBaseline="alphabetic";ctx.fillText(String(node.id+1).padStart(2,"0"),x,y+14);
    const lines=node.label.split("\n"),lblY=y+NH/2+13;ctx.font="600 8px sans-serif";ctx.fillStyle=isActive?C.gold:isDark?"rgba(212,169,106,.5)":"rgba(10,22,40,.45)";lines.forEach((l,li)=>ctx.fillText(l.toUpperCase(),x,lblY+li*10));
    if(isActive){ctx.beginPath();ctx.arc(x,y,NW/2+6,0,Math.PI*2);ctx.strokeStyle="rgba(244,185,66,.28)";ctx.lineWidth=7;ctx.stroke();}
  }

  const drawFrame=useCallback(()=>{
    const s=sr.current;const cvs=canvasRef.current;if(!cvs)return;
    const ctx=cvs.getContext("2d");const{W,H}=s;ctx.clearRect(0,0,W,H);
    if(W>=800){ctx.fillStyle=C.night;ctx.fillRect(0,0,W/2,H);ctx.fillStyle=C.cream;ctx.fillRect(W/2,0,W/2,H);const fade=ctx.createLinearGradient(W/2-48,0,W/2+48,0);fade.addColorStop(0,"rgba(10,22,40,0.55)");fade.addColorStop(1,"rgba(240,232,213,0.55)");ctx.fillStyle=fade;ctx.fillRect(W/2-48,0,96,H);}
    else{ctx.fillStyle=C.night;ctx.fillRect(0,0,W,H);}
    ctx.save();ctx.globalAlpha=0.025;for(let gx=0;gx<W;gx+=28)for(let gy=0;gy<H;gy+=28){ctx.beginPath();ctx.arc(gx,gy,0.7,0,Math.PI*2);ctx.fillStyle=gx<W/2?"#F4B942":"#C0451A";ctx.fill();}ctx.restore();
    for(let i=0;i<STAGES.length-1;i++){const a=s.nodePos[i],b=s.nodePos[i+1];if(!a||!b)continue;const mx=(a.x+b.x)/2,my=(a.y+b.y)/2-Math.abs(b.x-a.x)*0.1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo(mx,my,b.x,b.y);ctx.strokeStyle="rgba(212,169,106,0.18)";ctx.lineWidth=2.5;ctx.setLineDash([7,6]);ctx.stroke();ctx.setLineDash([]);const t2=0.91;const px2=(1-t2)*(1-t2)*a.x+2*(1-t2)*t2*mx+t2*t2*b.x;const py2=(1-t2)*(1-t2)*a.y+2*(1-t2)*t2*my+t2*t2*b.y;const ang=Math.atan2(b.y-py2,b.x-px2);ctx.save();ctx.translate(b.x,b.y);ctx.rotate(ang);ctx.beginPath();ctx.moveTo(-11,-5);ctx.lineTo(0,0);ctx.lineTo(-11,5);ctx.strokeStyle="rgba(244,185,66,0.55)";ctx.lineWidth=2;ctx.lineJoin="round";ctx.stroke();ctx.restore();}
    s.particles.forEach(p=>{p.tick();p.draw(ctx);});
    const NW=s.W<500?60:68,NH=s.W<500?60:68;
    STAGES.forEach((node,i)=>{if(i!==s.activeNode)drawNode(ctx,node,s.nodePos[i],NW,NH,false,i===s.hoverNode);});
    if(s.activeNode>=0)drawNode(ctx,STAGES[s.activeNode],s.nodePos[s.activeNode],NW,NH,true,false);
    s.raf=requestAnimationFrame(drawFrame);
  },[]);

  const handleResize=useCallback(()=>{
    const s=sr.current;const cvs=canvasRef.current,wrap=wrapRef.current;if(!cvs||!wrap)return;
    const DPR=window.devicePixelRatio||1,W=wrap.getBoundingClientRect().width||800;
    const H=W<500?380:W<800?310:270;s.W=W;s.H=H;s.DPR=DPR;
    cvs.width=W*DPR;cvs.height=H*DPR;cvs.style.width=W+"px";cvs.style.height=H+"px";
    cvs.getContext("2d").setTransform(DPR,0,0,DPR,0,0);
    s.nodePos=computeLayout(W,H);s.particles=buildParticles(s.nodePos);
  },[]);

  function getNodeAt(cx,cy){const s=sr.current,cvs=canvasRef.current;if(!cvs)return -1;const rect=cvs.getBoundingClientRect();const mx=(cx-rect.left)*(s.W/rect.width),my=(cy-rect.top)*(s.H/rect.height);const NW=s.W<500?62:70,NH=62;return s.nodePos.findIndex(p=>p&&mx>=p.x-NW/2-8&&mx<=p.x+NW/2+8&&my>=p.y-NH/2-8&&my<=p.y+NH/2+8);}

  function openTooltip(idx){
    const s=sr.current;s.activeNode=idx;setActiveNode(idx);
    if(idx<0){setTtState(null);return;}
    const pos=s.nodePos[idx];const NW=s.W<500?62:70,NH=62;
    let tx=pos.x-105,ty=pos.y+NH/2+14;tx=Math.max(6,Math.min(tx,s.W-246));
    if(ty+290>s.H)ty=pos.y-NH/2-300;
    setTtState({node:STAGES[idx],pos:{x:tx,y:ty},arrowLeft:Math.min(100,Math.max(10,pos.x-tx-6))});
  }

  function onClick(e){const idx=getNodeAt(e.clientX,e.clientY);openTooltip(idx===sr.current.activeNode?-1:idx);}
  function onMove(e){const idx=getNodeAt(e.clientX,e.clientY);sr.current.hoverNode=idx;canvasRef.current.style.cursor=idx>=0?"pointer":"default";}
  function onLeave(){sr.current.hoverNode=-1;}
  function onTouch(e){e.preventDefault();const t=e.changedTouches[0];const idx=getNodeAt(t.clientX,t.clientY);openTooltip(idx===sr.current.activeNode?-1:idx);}

  useEffect(()=>{
    if(!document.getElementById("ink-dp-css")){const el=document.createElement("style");el.id="ink-dp-css";el.textContent=INJECTED_CSS;document.head.appendChild(el);}
    handleResize();sr.current.raf=requestAnimationFrame(drawFrame);
    let timer;const onR=()=>{clearTimeout(timer);timer=setTimeout(handleResize,130);};window.addEventListener("resize",onR);
    return()=>{cancelAnimationFrame(sr.current.raf);window.removeEventListener("resize",onR);};
  },[drawFrame,handleResize]);

  useEffect(()=>{if(sr.current.activeNode>=0)openTooltip(sr.current.activeNode);},[activeLang,activeIndustry]);

  return(
    <section id="how-it-works" style={{width:"100%",padding:"60px 0",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 16px"}}>
        <div style={{borderRadius:16,overflow:"hidden"}}>
          <div style={{height:9,background:S_TOP}}/>
          <div style={{background:C.night,padding:"22px 20px 20px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:ADINKRA,pointerEvents:"none"}}/>

            {/* Title */}
            <p style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:4,color:C.sand,textTransform:"uppercase",marginBottom:5,opacity:.8}}>
              Inkanyezi Technologies — Signal Architecture
            </p>
            <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(16px,3.5vw,22px)",fontWeight:700,color:C.ivory,lineHeight:1.2,margin:"0 0 10px"}}>
              We are the{" "}
              <em style={{fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",color:C.gold,fontSize:"clamp(18px,4vw,26px)",fontWeight:300}}>signal</em>
              {" "}in the noise
            </h2>

            {/* Interaction hint */}
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(244,185,66,.1)",border:"1px solid rgba(244,185,66,.25)",borderRadius:20,padding:"5px 14px",marginBottom:18}}>
              <div className="ink-hint" style={{width:7,height:7,borderRadius:"50%",background:C.gold,flexShrink:0}}/>
              <span style={{fontSize:11,color:C.sand,letterSpacing:.4,fontWeight:500}}>
                Tap any node to explore — available in all 11 SA official languages
              </span>
            </div>

            {/* ── Controls panel ── */}
            <div className="ink-ctrl-panel">

              {/* Language column */}
              <div className="ink-ctrl-col">
                <div className="ink-ctrl-heading">
                  <div className="ink-ctrl-icon ink-ctrl-icon-lang">🌍</div>
                  <span>Explain in your language</span>
                </div>
                <LangSelector activeLang={activeLang} onSelect={setActiveLang}/>
              </div>

              {/* Divider */}
              <div className="ink-ctrl-divider"/>

              {/* Industry column */}
              <div className="ink-ctrl-col">
                <div className="ink-ctrl-heading">
                  <div className="ink-ctrl-icon ink-ctrl-icon-ind">🏢</div>
                  <span>Show pipeline for your industry</span>
                </div>
                <IndustryPills active={activeIndustry} onSelect={setActiveIndustry}/>
              </div>

            </div>
          </div>
          <div style={{height:6,background:S_KEN}}/>
          <div ref={wrapRef} style={{position:"relative",width:"100%",background:C.night}}>
            <canvas ref={canvasRef} style={{display:"block",width:"100%",height:"auto",touchAction:"none"}} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave} onTouchEnd={onTouch}/>
            {ttState&&<Tooltip node={ttState.node} industry={activeIndustry} lang={activeLang} pos={ttState.pos} arrowLeft={ttState.arrowLeft}/>}
          </div>
          <div style={{height:6,background:S_KEN}}/>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:7,padding:"11px 16px",background:C.night,flexWrap:"wrap"}}>
            {STAGES.map((_,i)=>(
              <button key={i} onClick={()=>openTooltip(i===activeNode?-1:i)} style={{width:i===activeNode?22:7,height:7,borderRadius:i===activeNode?3:"50%",background:i===activeNode?C.gold:"rgba(212,169,106,.22)",border:"none",cursor:"pointer",padding:0,transition:"all .22s ease"}}/>
            ))}
          </div>
          <div style={{height:9,background:S_BOT}}/>
        </div>
      </div>
    </section>
  );
}
