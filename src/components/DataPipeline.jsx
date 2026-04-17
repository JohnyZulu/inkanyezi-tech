import { useEffect, useRef, useState, useCallback } from "react";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  night:"#0A1628", gold:"#F4B942", ivory:"#FAF6EE",
  cream:"#F0E8D5", rust:"#C0451A", teal:"#3A9E7E", sand:"#D4A96A",
};
const S_TOP=`repeating-linear-gradient(90deg,${C.gold} 0,${C.gold} 10px,${C.rust} 10px,${C.rust} 20px,${C.night} 20px,${C.night} 30px,${C.teal} 30px,${C.teal} 40px,${C.ivory} 40px,${C.ivory} 50px)`;
const S_KEN=`repeating-linear-gradient(90deg,${C.rust} 0,${C.rust} 7px,${C.gold} 7px,${C.gold} 14px,${C.night} 14px,${C.night} 19px,${C.gold} 19px,${C.gold} 26px,${C.rust} 26px,${C.rust} 33px,${C.teal} 33px,${C.teal} 38px,${C.night} 38px,${C.night} 43px,${C.teal} 43px,${C.teal} 50px)`;
const S_BOT=`repeating-linear-gradient(90deg,${C.night} 0,${C.night} 12px,${C.gold} 12px,${C.gold} 20px,${C.night} 20px,${C.night} 28px,${C.teal} 28px,${C.teal} 36px,${C.night} 36px,${C.night} 44px,${C.rust} 44px,${C.rust} 52px)`;
const ADINKRA=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='%23F4B942' stroke-width='1.5'/%3E%3Ccircle cx='30' cy='30' r='12' fill='none' stroke='%23F4B942' stroke-width='1'/%3E%3Cline x1='10' y1='30' x2='50' y2='30' stroke='%23F4B942' stroke-width='1'/%3E%3Cline x1='30' y1='10' x2='30' y2='50' stroke='%23F4B942' stroke-width='1'/%3E%3C/svg%3E")`;

// ─── Languages ────────────────────────────────────────────────────────────────
const LANGS=[
  {code:"EN",name:"English"},{code:"ZU",name:"isiZulu"},{code:"XH",name:"isiXhosa"},
  {code:"AF",name:"Afrikaans"},{code:"ST",name:"Sesotho"},{code:"TN",name:"Setswana"},
  {code:"SS",name:"siSwati"},{code:"VE",name:"Tshivenda"},{code:"TS",name:"Xitsonga"},
  {code:"NR",name:"isiNdebele"},{code:"NS",name:"Sepedi"},
];

// ─── Industries ───────────────────────────────────────────────────────────────
const INDUSTRIES=[
  {id:"General",    icon:"⚙️", label:"General"},
  {id:"Trades",     icon:"🔧", label:"Trades"},
  {id:"Retail",     icon:"🛍️", label:"Retail"},
  {id:"Legal",      icon:"⚖️", label:"Legal"},
  {id:"Healthcare", icon:"🏥", label:"Healthcare"},
  {id:"Education",  icon:"🎓", label:"Education"},
  {id:"Property",   icon:"🏘️", label:"Property"},
  {id:"Transport",  icon:"🚛", label:"Transport"},
  {id:"Finance",    icon:"💳", label:"Finance"},
  {id:"Food",       icon:"🍽️", label:"Food & Catering"},
  {id:"Beauty",     icon:"💇", label:"Beauty & Wellness"},
  {id:"Security",   icon:"🔒", label:"Security"},
  {id:"Events",     icon:"🎪", label:"Events"},
  {id:"Agri",       icon:"🌾", label:"Agriculture"},
  {id:"NGO",        icon:"🤝", label:"NPO / NGO"},
];

const TAG={
  gold:{border:C.gold,color:"#7a4e06",bg:"rgba(244,185,66,.1)"},
  rust:{border:C.rust,color:C.rust,bg:"rgba(192,69,26,.08)"},
  teal:{border:C.teal,color:C.teal,bg:"rgba(58,158,126,.08)"},
};

// ─── Node definitions — tool name, colour, SVG icon ──────────────────────────
const NODES_DEF = [
  {
    id:0, label:"Intake Hub", badge:"Entry Layer", signal:5,
    tool:"Web · WhatsApp · API", color:"#F4B942", dark:true,
    svg:`<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7h24l-6 9H10L4 7z" fill="#F4B942" opacity=".9"/>
      <path d="M10 16h12l2 6H8l2-6z" fill="#F4B942" opacity=".7"/>
      <rect x="13" y="22" width="6" height="4" rx="1" fill="#F4B942" opacity=".85"/>
      <line x1="8" y1="11" x2="24" y2="11" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
      <line x1="10" y1="14.5" x2="22" y2="14.5" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
    </svg>`,
    tags:[["Lead Capture","rust"],["AI Chat","gold"],["WhatsApp","teal"]],
  },
  {
    id:1, label:"Trigger Engine", badge:"Routing Layer", signal:5,
    tool:"Make.com Webhooks", color:"#FF9F1C", dark:false,
    svg:`<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 4l-8 13h7l-5 11 13-15h-8L19 4z" fill="#FF9F1C"/>
      <path d="M19 4l-8 13h7l-5 11 13-15h-8L19 4z" fill="rgba(255,255,255,0.15)"/>
    </svg>`,
    tags:[["Workflow Auto","gold"],["Event Triggers","rust"],["Real-time","teal"]],
  },
  {
    id:2, label:"CRM & Storage", badge:"Memory Layer", signal:4,
    tool:"Google Sheets · Neon DB", color:"#3A9E7E", dark:true,
    svg:`<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="9" rx="10" ry="4" fill="#3A9E7E" opacity=".9"/>
      <path d="M6 9v6c0 2.2 4.5 4 10 4s10-1.8 10-4V9" fill="#3A9E7E" opacity=".75"/>
      <path d="M6 15v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6" fill="#3A9E7E" opacity=".6"/>
      <ellipse cx="16" cy="9" rx="10" ry="4" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
      <ellipse cx="16" cy="15" rx="10" ry="4" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width=".8"/>
    </svg>`,
    tags:[["CRM Logging","rust"],["Lead Tracking","teal"],["Reference IDs","gold"]],
  },
  {
    id:3, label:"Gemini AI", badge:"Brain Layer", signal:5,
    tool:"Google Gemini API", color:"#7B61FF", dark:false,
    svg:`<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="16,3 27,9 27,23 16,29 5,23 5,9" fill="#7B61FF" opacity=".88"/>
      <polygon points="16,3 27,9 27,23 16,29 5,23 5,9" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <circle cx="16" cy="16" r="4" fill="rgba(255,255,255,0.85)"/>
      <line x1="16" y1="7" x2="16" y2="12" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
      <line x1="16" y1="20" x2="16" y2="25" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
      <line x1="7" y1="12" x2="11.5" y2="14.5" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
      <line x1="20.5" y1="17.5" x2="25" y2="20" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
    </svg>`,
    tags:[["Lead Scoring","gold"],["AI Classify","teal"],["Content Gen","rust"]],
  },
  {
    id:4, label:"Make.com", badge:"Action Layer", signal:4,
    tool:"Make.com Automation", color:"#C0451A", dark:true,
    svg:`<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="11" fill="#C0451A" opacity=".88"/>
      <circle cx="16" cy="16" r="7" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
      <circle cx="16" cy="16" r="3.5" fill="rgba(0,0,0,0.35)"/>
      <rect x="14.5" y="5" width="3" height="5" rx="1.5" fill="rgba(255,255,255,0.85)"/>
      <rect x="14.5" y="22" width="3" height="5" rx="1.5" fill="rgba(255,255,255,0.85)"/>
      <rect x="5" y="14.5" width="5" height="3" rx="1.5" fill="rgba(255,255,255,0.85)"/>
      <rect x="22" y="14.5" width="5" height="3" rx="1.5" fill="rgba(255,255,255,0.85)"/>
    </svg>`,
    tags:[["CRM Writeback","rust"],["Booking Flows","gold"],["Email Sequences","teal"]],
  },
  {
    id:5, label:"Live Dashboard", badge:"Output Layer", signal:5, isFinal:true,
    tool:"Looker Studio · Vercel", color:"#00C8FF", dark:false,
    svg:`<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="24" width="5" height="6" rx="1.5" fill="#00C8FF" opacity=".7"/>
      <rect x="10" y="18" width="5" height="12" rx="1.5" fill="#00C8FF" opacity=".85"/>
      <rect x="17" y="20" width="5" height="10" rx="1.5" fill="#00C8FF" opacity=".75"/>
      <rect x="24" y="14" width="5" height="16" rx="1.5" fill="#00C8FF" opacity=".95"/>
      <line x1="3" y1="30" x2="29" y2="30" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <polyline points="5.5,22 12.5,16 19.5,19 26.5,12" stroke="rgba(255,255,255,0.75)" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
      <circle cx="26.5" cy="12" r="2" fill="white" opacity=".9"/>
    </svg>`,
    tags:[["Live Dashboard","gold"],["Analytics","teal"],["Client Delivery","rust"]],
  },
];

// ─── SA industry scenarios (all 15 × 6 nodes) ────────────────────────────────
const IND={
  General:{
    s0:{title:"Multi-channel lead intake",desc:"A Joburg business owner WhatsApps about pricing at 11pm. A Cape Town retailer submits a website form at midnight. A Durban firm sends an API request. All three land in one queue — nothing falls through the cracks."},
    s1:{title:"Smart routing & validation",desc:"Each enquiry is tagged by source, urgency and business size. The midnight form gets flagged as high-value and fast-tracked. The WhatsApp message is cleaned into a structured lead record before any human sees it."},
    s2:{title:"CRM logging & unique reference",desc:"Every lead lands in the CRM with a reference number — INK-GEN-2025-XXXX. Source channel, timestamp and business type recorded. Nothing gets lost in a WhatsApp thread or an unread Gmail ever again."},
    s3:{title:"AI scoring & personalisation",desc:"Gemini AI reads each lead, scores conversion likelihood, classifies business size and generates a personalised first-response in the prospect's preferred language — ready in seconds, not hours."},
    s4:{title:"Automated follow-up & booking",desc:"High-scoring leads get a branded email sequence automatically. A booking link fires to their phone. The Inkanyezi team gets notified — all before anyone touches a keyboard."},
    s5:{title:"Live pipeline dashboard",desc:"Every lead, every stage, every response time — visible in real time. Looker Studio shows conversion trends. The team sees exactly where each prospect sits from any device, anywhere in SA."},
  },
  Trades:{
    s0:{title:"Job request capture",desc:"A Durban homeowner WhatsApps about a burst geyser at 2am. A Pretoria body corporate submits a maintenance tender. A KZN hardware store walk-in needs rewiring. All captured instantly without a call centre."},
    s1:{title:"Emergency vs scheduled routing",desc:"Burst pipes and power failures jump the queue automatically. Planned renovations sort by suburb and match to the nearest available technician — before the dispatcher arrives in the morning."},
    s2:{title:"Digital job card creation",desc:"Each job gets a digital card — client name, erf number, property address, job photos. No more paper job cards lost in a bakkie. Every job traceable from WhatsApp message to invoice."},
    s3:{title:"AI quoting & WhatsApp estimate",desc:"AI reads the job description, estimates material costs from the Plumbkor price list and drafts a WhatsApp quote the tradesperson approves with one tap. A geyser replacement quote ready in under 3 minutes."},
    s4:{title:"Dispatch & job scheduling",desc:"Confirmed jobs fire a dispatch notification to the allocated technician with address, job card and client contact. All active jobs visible on a map. Invoices trigger automatically on job completion."},
    s5:{title:"Revenue & job board dashboard",desc:"Open jobs, completed work, outstanding invoices and monthly revenue — one screen. A plumbing contractor in eThekwini sees which suburbs generate the most calls and which technicians have capacity right now."},
  },
  Retail:{
    s0:{title:"Omnichannel shopper intake",desc:"A Soweto customer DMs on Instagram about stock. A Sandton shopper abandons a cart at 11pm. A Durban wholesaler phones about a bulk order. All captured without a single staff member online."},
    s1:{title:"Stock & order event triggers",desc:"Stock below reorder threshold fires a purchase order draft automatically. Abandoned carts trigger a WhatsApp reminder 30 minutes later. Bulk trade orders skip the queue and go straight to fulfilment."},
    s2:{title:"Customer & inventory records",desc:"Every customer gets a unified profile — purchase history, preferred brands, average spend, suburb. A Cape Town gift shop owner sees that Xmas stock will run out in 6 days before it happens."},
    s3:{title:"Personalised promotions AI",desc:"AI identifies that a Limpopo customer buys braai supplies every Friday before month-end and sends a personalised WhatsApp promotion on Thursday afternoon. Restock recommendations generated from sales velocity."},
    s4:{title:"Order fulfilment & courier booking",desc:"Confirmed orders trigger a pick-list, book a Pudo or The Courier Guy collection and send the customer a tracking link via WhatsApp. Cash-on-delivery gets a separate confirmation flow."},
    s5:{title:"Sales & inventory dashboard",desc:"Daily sales, best-selling SKUs, dead stock and average basket value — one live view. A Maponya Mall retailer compares this Saturday to last month from a phone in the stockroom."},
  },
  Legal:{
    s0:{title:"Client matter intake",desc:"A family in Khayelitsha WhatsApps about an eviction notice. A Joburg company emails about a CCMA dispute. A Durban walk-in needs a contract reviewed. All timestamped and tagged before the attorney arrives."},
    s1:{title:"Matter urgency & practice routing",desc:"Urgent interdicts and eviction matters escalate within minutes. Commercial disputes route to the corporate practice. Family law goes to the right senior. Nothing sits in a general inbox over a long weekend."},
    s2:{title:"Matter file & billing reference",desc:"Every new client gets a matter file — ID, contact details, matter type, date received and a billing reference. Documents shared via WhatsApp or email attach automatically to the correct file."},
    s3:{title:"Complexity scoring & draft response",desc:"AI reads the brief, classifies the matter type and fee range, and drafts a professional first-response in English or Afrikaans — setting timeline and fee expectations before the attorney has read a word."},
    s4:{title:"Onboarding, billing & court diary",desc:"Accepted mandates trigger a client onboarding email with fee agreement and FICA requirements. Court dates added to the shared diary. Monthly billing reminders fire automatically — no invoice gets forgotten."},
    s5:{title:"Practice pipeline & billing view",desc:"Active matters, fee notes outstanding, court dates this week and new enquiries this month — one practitioner view. A two-person firm in Pietermaritzburg runs with the discipline of a 20-person practice."},
  },
  Healthcare:{
    s0:{title:"Patient enquiry capture",desc:"A patient in Alexandra WhatsApps about diabetes medication. A Durban GP's receptionist submits a referral form. A walk-in clinic in Langa registers a new patient on a tablet. All queued without a phone call."},
    s1:{title:"Urgency triage & routing",desc:"Chest pain and breathing difficulty enquiries get an emergency number back within seconds. Routine check-ups fill next available slots. Specialist referrals route to the correct consulting room automatically."},
    s2:{title:"Patient record storage",desc:"Each patient gets a secure record — ID, medical aid number, chronic conditions, visit history and referring doctor. A clinic in Soweto has a full patient history available before the practitioner walks in."},
    s3:{title:"Symptom triage AI",desc:"AI reads the patient's described symptoms, classifies urgency and drafts a personalised appointment confirmation with preparation instructions. Chronic patients get a 48-hour reminder before their scheduled review."},
    s4:{title:"Appointment scheduling & reminders",desc:"Confirmed bookings write to the practitioner's schedule. Patients receive a WhatsApp reminder the day before. No-shows trigger an automatic rebook offer. Medical aid authorisation numbers requested automatically."},
    s5:{title:"Patient flow & clinic dashboard",desc:"Today's queue, no-show rate, average consultation time and outstanding medical aid claims — real time. A GP in Umhlanga sees Tuesday afternoons are overbooked and redistributes load before patients complain."},
  },
  Education:{
    s0:{title:"Student & parent enquiry capture",desc:"A parent in Soweto WhatsApps about Grade 8 registration. A matric student in Durban applies online for a coding bootcamp. An adult learner in Polokwane phones about evening classes. All captured without a receptionist."},
    s1:{title:"Application routing & priority",desc:"Matric applications before closing date are fast-tracked. Adult learner enquiries route to the evening programme coordinator. WhatsApp messages normalise into structured application records before any human touches them."},
    s2:{title:"Student record & application file",desc:"Every enquiry creates an application file with the student's details, programme of interest and qualifications submitted. A private college in Johannesburg sees how many applications are pending per programme at any moment."},
    s3:{title:"Programme matching AI",desc:"AI reads the student's background and goals, matches them to the most suitable programme and drafts a personalised response with curriculum highlights, fees and payment plan options — in their home language if requested."},
    s4:{title:"Enrolment, fees & timetable dispatch",desc:"Accepted students receive enrolment pack, fee schedule and timetable automatically. Payment plan agreements sent via WhatsApp for digital signature. NSFAS-eligible students flagged and routed to the finance officer."},
    s5:{title:"Enrolment & revenue dashboard",desc:"Applications received, enrolments confirmed, fees collected and dropout risk alerts — one live view per campus. An independent school in KZN tracks which grade levels have open seats and which programmes are oversubscribed."},
  },
  Property:{
    s0:{title:"Buyer, seller & rental intake",desc:"A first-time buyer in Roodepoort WhatsApps about bond eligibility. A Umhlanga landlord submits a rental listing. A Cape Town tenant emails about a maintenance fault. All land in the same pipeline, correctly tagged."},
    s1:{title:"Enquiry type routing & urgency",desc:"Maintenance emergencies like no water or electrical faults escalate to the property manager within minutes. Sales leads scored by buying intent. Rental applications go to the letting department automatically."},
    s2:{title:"Property & client profile storage",desc:"Each enquiry creates or updates a client profile linked to the property — stand number, lease terms, maintenance tickets, payment history. A managing agent in Pretoria East pulls up a tenant's full history in 10 seconds."},
    s3:{title:"Bond affordability & match AI",desc:"AI estimates bond affordability from the buyer's stated income, matches them to suitable listings and drafts a personalised property shortlist with a suggested viewing schedule — sent via WhatsApp the same day."},
    s4:{title:"OTP, lease & viewing scheduling",desc:"Accepted offers trigger an OTP document automatically. Lease renewals fire 60 days before expiry. Viewing appointments added to the agent's calendar and confirmed to the buyer via WhatsApp with the property address pin."},
    s5:{title:"Portfolio & letting dashboard",desc:"Available units, occupied units, rent collected vs outstanding, open maintenance tickets and new enquiries — one portfolio dashboard. A KZN letting agency manages 200 units without hiring an extra admin person."},
  },
  Transport:{
    s0:{title:"Freight & courier intake",desc:"A Rustenburg mining supplier WhatsApps requesting a 10-ton load quote. A Durban e-commerce store submits a same-day courier request online. A Joburg taxi association phones about a fleet service contract. All captured and queued."},
    s1:{title:"Load size & urgency routing",desc:"Same-day courier jobs jump the allocation queue. Bulk freight above 5 tons routes to the heavy-haul coordinator. Fleet maintenance contracts flag for the commercial team with a 4-hour response SLA."},
    s2:{title:"Load & client record management",desc:"Each booking creates a waybill record — origin, destination, weight, value declared and vehicle allocated. A trucking company running between Durban harbour and the Reef has a complete audit trail for every load."},
    s3:{title:"AI route optimisation & quoting",desc:"AI calculates the most cost-effective route accounting for tolls, fuel and driver hours compliance. A competitive quote drafted and sent via WhatsApp — faster than any competitor still quoting manually."},
    s4:{title:"Dispatch, tracking & proof of delivery",desc:"Confirmed bookings dispatch the driver with route instructions. Clients receive a WhatsApp tracking link. Proof of delivery triggers an automatic invoice. A Cape Town courier company processes 40% more orders with the same team."},
    s5:{title:"Fleet & revenue dashboard",desc:"Active loads, vehicles in transit, on-time delivery rate, outstanding invoices and fuel cost per km — one operations screen. A Ekurhuleni logistics SME identifies that their Friday Cape Town run is consistently late and reroutes."},
  },
  Finance:{
    s0:{title:"Client financial enquiry intake",desc:"A spaza shop owner in Khayelitsha WhatsApps about a working capital loan. A Tshwane taxi owner fills in an asset finance form online. A young professional phones about a tax return. All captured and tagged without a call centre."},
    s1:{title:"Product & risk routing",desc:"Bond and vehicle finance enquiries route to the secured lending team. Unsecured loan requests scored by income band. Tax and accounting enquiries go to the advisory team. High-risk applications flagged before a consultant wastes time."},
    s2:{title:"Client financial profile storage",desc:"Each enquiry builds a client financial profile — ID, income bracket, existing debt and product of interest. A micro-lender in Durban sees that 60% of their enquiries come from the informal sector and adjusts their product offering."},
    s3:{title:"Affordability scoring & product match AI",desc:"AI assesses the client's financial position, matches them to the most suitable product and drafts a plain-language explanation of options, repayment amounts and documents needed — reducing back-and-forth by 80%."},
    s4:{title:"Application processing & compliance",desc:"Qualified applications trigger FICA document requests automatically. Approved clients receive a digital acceptance letter and repayment schedule. SARS correspondence flagged and routed to the tax compliance officer with a deadline reminder."},
    s5:{title:"Portfolio & compliance dashboard",desc:"Applications received, approval rate, average loan size, outstanding repayments and compliance deadlines — one live view. A Sandton financial services SME sees their entire book health without pulling a single spreadsheet."},
  },
  Food:{
    s0:{title:"Order, catering & enquiry intake",desc:"A Durban North bride WhatsApps about a 200-person wedding catering package. A Joburg corporate office submits a weekly lunch order form. A spaza owner phones about a franchise opportunity. All land in the queue, tagged correctly."},
    s1:{title:"Order size & event routing",desc:"Wedding and corporate events above R10,000 route to the senior catering consultant. Regular weekly orders confirm automatically within the SLA. Franchise enquiries fast-track to the business development team with a 24-hour response target."},
    s2:{title:"Client & menu preference records",desc:"Every client builds a profile — dietary requirements, preferred cuisine, order history and event dates. A Durban caterer sees that three corporate clients have a halal requirement and plans accordingly for every weekly delivery."},
    s3:{title:"Menu recommendation & quote AI",desc:"AI reads the event brief, recommends a package within budget, flags allergen considerations and drafts a personalised quote with payment terms — ready to send in under 5 minutes from a WhatsApp enquiry."},
    s4:{title:"Event confirmation & supplier orders",desc:"Confirmed bookings trigger supplier orders for fresh produce, update the kitchen schedule and send the client a confirmation with menu, setup time and balance due date. No more double-bookings on the same December Saturday."},
    s5:{title:"Revenue & event pipeline dashboard",desc:"Upcoming events, confirmed revenue, supplier costs and team availability — one kitchen management screen. A Cape Town caterer sees three events on the same day in June and starts planning resources four weeks before it becomes a crisis."},
  },
  Beauty:{
    s0:{title:"Appointment & product enquiry intake",desc:"A Sandton client WhatsApps about a Brazilian Blowout price. A Soweto customer fills in an online booking form for locs. A KZN salon walk-in asks about a skincare range. All captured without the receptionist being distracted mid-service."},
    s1:{title:"Service type & therapist routing",desc:"Bridal packages and spa days route to senior therapists. Quick blow-dry bookings go to available junior staff. Product enquiries tag and follow up with a WhatsApp recommendation automatically."},
    s2:{title:"Client preference & booking history",desc:"Every client builds a profile — preferred stylist, colour formula, allergy notes and visit frequency. A Durban salon owner sees her top 20 clients haven't booked in 6 weeks and triggers a win-back campaign without opening a spreadsheet."},
    s3:{title:"AI rebooking reminders & promotions",desc:"AI identifies clients due for a colour retouch based on their booking pattern and sends a personalised WhatsApp reminder with a time-limited offer. New clients who haven't rebooked within 3 weeks get an automated follow-up in their preferred language."},
    s4:{title:"Booking confirmation & product dispatch",desc:"Confirmed appointments trigger a day-before reminder with therapist name and service time. Online product orders dispatch via courier with a tracking number. No-shows receive an automatic rebook offer within the hour."},
    s5:{title:"Salon revenue & client dashboard",desc:"Bookings this week, revenue per service type, top clients by spend, product sales and no-show rate — one owner dashboard. A beauty entrepreneur running two salons in eThekwini sees which location is underperforming before month-end."},
  },
  Security:{
    s0:{title:"Incident & contract enquiry intake",desc:"A Centurion homeowner WhatsApps reporting a suspicious vehicle. A Durban estate manager submits a guarding contract enquiry online. A Cape Town retailer phones about an armed response upgrade. All captured, timestamped and tagged by threat level."},
    s1:{title:"Incident severity & response routing",desc:"Active incidents trigger an immediate dispatch notification to the nearest armed response vehicle. Contract enquiries scored by site size and risk profile. Existing client upgrade requests skip the queue and go straight to the account manager."},
    s2:{title:"Site & client security profile",desc:"Every site gets a security profile — property layout, access points, camera locations, previous incident history and guard rotation schedule. A Joburg security company sees the full risk picture of a client site before sending a guard."},
    s3:{title:"Risk scoring & proposal AI",desc:"AI assesses the client's site risk based on suburb, crime stats and property type, then drafts a personalised security proposal with recommended product tier and monthly cost — presented before the sales rep has left the office."},
    s4:{title:"Contract onboarding & shift scheduling",desc:"Signed contracts trigger guard allocation, shift schedule and client onboarding pack automatically. Equipment installation bookings added to the technician's calendar. Monthly invoices fire without anyone raising them manually."},
    s5:{title:"Operations & incident dashboard",desc:"Active incidents, response times, guarding sites, contract renewals due and monthly revenue — one command centre screen. A Ekurhuleni security SME sees their average response time is 8 minutes and sets a target to bring it to 5 before the next client review."},
  },
  Events:{
    s0:{title:"Event booking & vendor enquiry intake",desc:"A Durban wedding planner WhatsApps about AV equipment hire. A Joburg corporate HR manager submits a team-building enquiry. A matric dance committee emails about a venue package. All land in the pipeline before the events coordinator arrives at the office."},
    s1:{title:"Event size & urgency routing",desc:"Events within 2 weeks flag as urgent and escalate to the availability manager. Corporate events above R50,000 route to the senior coordinator. Matric and school events go to the dedicated education package team."},
    s2:{title:"Event brief & client file storage",desc:"Every enquiry creates an event brief — date, venue, guest count, catering requirements and budget. A Durban events company sees December has 14 confirmed bookings and only 3 available weekends — and automatically stops accepting new enquiries."},
    s3:{title:"Package recommendation & quote AI",desc:"AI reads the event brief, recommends the most suitable package, checks vendor availability on the requested date and drafts a personalised quote with optional add-ons — sent via WhatsApp within minutes of the enquiry landing."},
    s4:{title:"Supplier booking & event confirmation",desc:"Confirmed events trigger simultaneous supplier bookings for catering, AV, décor and security. Clients receive a confirmation with the event timeline, payment schedule and coordinator contact. Balance reminders fire 30 days before the event."},
    s5:{title:"Events pipeline & revenue dashboard",desc:"Upcoming events, confirmed revenue, deposit payments received, supplier costs and team availability — one live planner dashboard. A Cape Town events company sees their July pipeline is empty and launches a targeted promotion before the gap costs them revenue."},
  },
  Agri:{
    s0:{title:"Farmer & supplier enquiry intake",desc:"A smallholder in Limpopo WhatsApps about drought-resistant seed availability. A KZN sugarcane co-op submits a bulk input quote request online. An agro-dealer in the Free State phones about financing. All captured without a sales rep in the field."},
    s1:{title:"Crop type & urgency routing",desc:"Urgent pest and disease outbreak enquiries escalate to the agronomist on call within minutes. Bulk input orders above R50,000 route to the commercial accounts team. Smallholder enquiries queue by region and match to the nearest field officer."},
    s2:{title:"Farm & client profile storage",desc:"Every farmer builds a profile — farm size, crops grown, irrigation method, previous input orders and region. An agri-input supplier in Mpumalanga sees citrus growers in the Lowveld are re-ordering fertiliser 2 weeks earlier than last season."},
    s3:{title:"Crop advisory & input recommendation AI",desc:"AI reads the farmer's crop type, region and current season conditions and recommends the optimal input package with timing guidance. A personalised WhatsApp advisory note drafted in the farmer's language — practical enough to act on without an agronomist visit."},
    s4:{title:"Order fulfilment & delivery scheduling",desc:"Confirmed input orders trigger a collection or delivery booking, update the stock system and send the farmer a WhatsApp confirmation with the delivery date and driver contact. Credit-approved accounts get a statement update automatically."},
    s5:{title:"Agri sales & seasonal dashboard",desc:"Input orders by crop type, regional demand trends, credit book health and seasonal revenue — one agri-business dashboard. A seed and fertiliser distributor in the Northern Cape sees demand building in a specific district 3 weeks before the sales reps report it."},
  },
  NGO:{
    s0:{title:"Beneficiary & donor enquiry intake",desc:"A community member in Motherwell WhatsApps about food parcel registration. A Joburg corporate CSI manager submits a partnership enquiry form. A volunteer in Durban phones about a weekend feeding programme. All captured without an overwhelmed admin volunteer."},
    s1:{title:"Request type & priority routing",desc:"Urgent welfare requests — food insecurity, domestic violence, child protection — flag and route to the welfare officer immediately. Donor enquiries prioritise for 24-hour response. Volunteer sign-ups queue for the programmes coordinator."},
    s2:{title:"Beneficiary & donor records",desc:"Every beneficiary gets a secure record — household size, area, programme enrolled and assistance received. Every donor gets a profile with giving history and tax certificate details. A Cape Town NPO demonstrates impact to a funder in under 2 minutes."},
    s3:{title:"Impact reporting & donor match AI",desc:"AI generates a personalised impact report for each donor showing exactly where their contribution went — families fed, learners supported, meals served — drafted as a WhatsApp message or formal PDF for the annual report."},
    s4:{title:"Programme scheduling & donor receipting",desc:"Approved beneficiary enrolments trigger a programme schedule and welcome message automatically. Donations above R100 trigger a Section 18A tax certificate without any admin intervention. Volunteer deployments confirmed via WhatsApp with location and contact."},
    s5:{title:"Impact & funding pipeline dashboard",desc:"Beneficiaries active, donations received this month, volunteer hours logged, programme costs and funding runway — one NPO operations dashboard. A Durban community organisation sees their food programme budget will run out in 6 weeks and starts a targeted fundraising campaign now."},
  },
};

// ─── Language translations per node ──────────────────────────────────────────
const LANG_TEXTS = [
  {EN:"Every enquiry enters here — web, WhatsApp, phone or walk-in. Nothing missed.",ZU:"Imibuzo yonke ingena lapha — iwebhu, i-WhatsApp, ucingo noma ukungena. Akukho okushiywayo.",XH:"Imibuzo yonke ingena apha — iwebhu, i-WhatsApp, ucingo okanye ukungena. Akukho kushiywa.",AF:"Alle navrae kom hier in — web, WhatsApp, telefoon of inloopbesoek. Niks word gemis nie.",ST:"Dipotso tsohle di kena mona — webosaete, WhatsApp, mohala kapa ho kena. Ho se ho tlohelwe.",TN:"Dipotso tsotlhe di tsena fa — wepusaete, WhatsApp, mogala kana go tsena. Go se go tlogelwe.",SS:"Yonkhe imibuzo ingena lapha — iwebhu, i-WhatsApp, ucingo noma ukungena. Akukho kushiywa.",VE:"Mbudziso yothe i dzhenela afha — vhutshilo, WhatsApp, foni kana u dzhena. Zwithu zwi si levhiwe.",TS:"Swivutiso hinkwaswo swi nghena laha — inthanete, WhatsApp, foni kumbe ku nghena. Xin'we xa sala.",NR:"Yonke imibuzo ingena lapha — iwebhu, i-WhatsApp, ucingo noma ukungena. Akukho okushiyiwe.",NS:"Dipotšo tsohle di tsena mo — wepusaete, WhatsApp, mogala goba go tsena. Ga go tlogelwe selo."},
  {EN:"Make.com fires instantly. Every record is sorted, validated and routed to the right place.",ZU:"I-Make.com iqala ngokushesha. Irekhodi ngayinye ihlelwa, iqinisekiswa futhi iyiswa endaweni efanele.",XH:"I-Make.com iqala ngokukhawuleza. Irekhodi nganye ihlela, iqinisekiswa kwaye ithunyelwe endaweni efanelekileyo.",AF:"Make.com brand onmiddellik. Elke rekord word gesorteer, gevalideer en na die regte plek gestuur.",ST:"Make.com e thoma ka potlako. Rekoto e nngwe le e nngwe e bapisa, e netefatswa le ho romelwa sebakeng se nepahetseng.",TN:"Make.com e simolola ka bonako. Rekoto nngwe le nngwe e sepediwa, e netefatsa le go romelwa mo ntlheng e nepagetseng.",SS:"I-Make.com iqala ngokushesha. Irekodi ngayinye ihlela, iqinisekiswa bese iyiswa endaweni efanele.",VE:"Make.com i thoma nga u fhuraha. Rekodo i nngwe na i nngwe i vhegwa, i todea na u tumiwa fhethu fhu tea.",TS:"Make.com yi sungula ngoku pfuriwa. Rekodi yin'wana na yin'wana yi lunghisiwa, yi ringanyetwa na ku tumiwa fhindlani ro olova.",NR:"I-Make.com iqala ngokushesha. Irekodi ngayinye ihlela, iqinisekiswa bese iyiswa endaweni efanele.",NS:"Make.com e thoma ka bonako. Rekoto ye nngwe le ye nngwe e hlophiwa, e netefatšwa le go romelwa lefelong le le lokileng."},
  {EN:"Every record stored with a unique reference. Full history available instantly.",ZU:"Irekhodi ngayinye igcinwa ngensombuluko eyodwa. Umlando ophelele uyatholakala ngokushesha.",XH:"Irekhodi nganye igcinwa ngereference ezikhethekileyo. Imbali epheleleyo iyafumaneka ngokukhawuleza.",AF:"Elke rekord gestoor met 'n unieke verwysing. Volledige geskiedenis onmiddellik beskikbaar.",ST:"Rekoto e nngwe le e nngwe e bolokwa ka nomoro e ikgethang. Histori e phethehileng e fumaneha ka ho potlaka.",TN:"Rekoto nngwe le nngwe e bolokiwa ka nomoro e ikgethileng. Histori yotlhe e fumaneha ka bonako.",SS:"Irekodi ngayinye igcinwa ngenombolo eyodwa. Umlando ophelele uyatholakala ngokushesha.",VE:"Rekodo i nngwe na i nngwe i vhigiwa nga nomboro ya ngoho. Histori yo tou hone i wanala nga u fhuraha.",TS:"Rekodi yin'wana na yin'wana yi hlayisiwa hi nomboro ya ngoho. Histori hinkwayo yi kumeka nga ku pfuriwa.",NR:"Irekodi ngayinye igcinwa ngenombolo eyodwa. Umlando ophelele uyatholakala ngokushesha.",NS:"Rekoto ye nngwe le ye nngwe e bolokwa ka nomoro ya ngoho. Histori yohle e hwetšagala ka bonako."},
  {EN:"Gemini AI reads every lead and generates a personalised response in seconds.",ZU:"I-Gemini AI ifunda ama-lead onke futhi ikhiqiza impendulo eqondiswe kuwe ngamasekhondi.",XH:"I-Gemini AI ifunda wonke amakheli kwaye ivelisa impendulo eyenzelwe wena ngesekhondi.",AF:"Gemini KI lees elke lood en genereer 'n persoonlike antwoord in sekondes.",ST:"Gemini AI e bala dikhothaletso tsohle mme e hlahisa karabo e ikgethileng ka disakonte.",TN:"Gemini AI e bala dikhothatso tsotlhe mme e tlhama karabo e ikgethileng ka disakonte.",SS:"I-Gemini AI ifunda onkhe amakheli bese ikhiqiza impendulo eyenzelwe wena ngamasekhondi.",VE:"Gemini AI i vhala mahosi othe na u bumbwa ha mhinduro ya ngoho nga tshifhinga tshi si gathi.",TS:"Gemini AI yi hlaya swi fikeleleki hinkwaswo na ku bumba nhlamulo ya ngoho eka masekonde.",NR:"I-Gemini AI ifunda onke amakheli bese ikhiqiza impendulo eyenzelwe wena ngamasekhondi.",NS:"Gemini AI e bala dikhothatso tsohle le go hlahisa karabo ya ngoho ka disakonte."},
  {EN:"Make.com sends confirmations, bookings and follow-ups. Zero manual steps.",ZU:"I-Make.com ithumela iziqinisekiso, ukubhukha kanye nokulandelela. Azikho izinyathelo zokusebenza ngesandla.",XH:"I-Make.com ithumela iziqinisekiso, iibhukhu kunye nokulandelela. Azikho amanyathelo okuqhuba ngesandla.",AF:"Make.com stuur bevestigings, besprekings en opvolgings. Geen handmatige stappe nie.",ST:"Make.com e roma ditlhomamiso, dipuisano le ho latela. Ha ho dikgato tsa ho sebetsa ka matsoho.",TN:"Make.com e romela ditlhomamiso, dikwano le go latela. Go se go na dikgato tsa go sebetsa ka matsogo.",SS:"I-Make.com ithumela tiqinisekiso, tibhukho kanye nokulandelela. Azikho tinyathelo tekusebenta ngesandla.",VE:"Make.com i tumela zwipimelo, u buka na u tevhedzwa. Hu si na nyathelo dza u shuma nga zwanḓa.",TS:"Make.com yi rhumela swipimelo, ku buka na ku landzelela. Ku hava nyingha ya ku tirhisa mavoko.",NR:"I-Make.com ithumela iziqinisekiso, ukubhukha kanye nokulandelela. Azikho izinyathelo zokuphatha ngesandla.",NS:"Make.com e roma ditlhomamiso, dikwano le go latela. Ga go na dikgato tša go šoma ka diatla."},
  {EN:"Live dashboard shows every lead, conversion and revenue figure in real time.",ZU:"Idashbhodi ephilayo ibonisa wonke amakheli, ukuguqulwa kanye nezinombolo zemali ngesikhathi sangempela.",XH:"Idashbhodi ephilileyo ibonisa wonke amakheli, ukuguqulwa kunye nezinombolo zemali ngexesha lokwenyani.",AF:"Lewendige dashboard wys elke lood, omskakeling en inkomstesyfer in werklike tyd.",ST:"Dashboard ya bophelo e bontsha dikhothaletso tsohle, phetoho le dipalo tsa lekeno ka nako ya nnete.",TN:"Dashboard ya botshelo e bontsha dikhothatso tsotlhe, phetoho le dipalo tsa lotseno ka nako ya gone.",SS:"Idashbhodi ephilayo ibonisa onkhe amakheli, ukuguqulwa kanye nezinombolo zemali ngesikhathi sangempela.",VE:"Dashboard ya vhutshilo i sumbedza mahosi othe, u shandukisa na zwitatiswa zwa mari nga tshifhinga tsha zwino.",TS:"Dashboard ya vutomi yi kombisa swi fikeleleki hinkwaswo, ku hundzulukela na tinomboro ta mali eka nkarhi wa zwino.",NR:"Idashbhodi ephilayo ibonisa onke amakheli, ukuguqulwa kanye nezinombolo zemali ngesikhathi sangempela.",NS:"Dashboard ya bophelo e bontsha dikhothatso tsohle, phetoho le dipalo tša letseno ka nako ya bjale."},
];

// ─── Canvas helpers ───────────────────────────────────────────────────────────
function bezPts(ax,ay,bx,by,n=20){
  const mx=(ax+bx)/2,my=(ay+by)/2-Math.abs(bx-ax)*0.08;
  return Array.from({length:n+1},(_,i)=>{const t=i/n;return{x:(1-t)*(1-t)*ax+2*(1-t)*t*mx+t*t*bx,y:(1-t)*(1-t)*ay+2*(1-t)*t*my+t*t*by};});
}

class Particle{
  constructor(path,delay){
    this.path=path;this.t=-(delay||0);
    this.speed=0.013+Math.random()*0.007;
    this.color=["#F4B942","#C0451A","#3A9E7E"][Math.floor(Math.random()*3)];
    this.r=4+Math.random()*1.5;
  }
  tick(){this.t+=this.speed;if(this.t>1)this.t=-0.05-Math.random()*0.08;}
  draw(ctx){
    if(this.t<0)return;
    const tt=Math.min(this.t,1);
    const seg=(this.path.length-1)*tt;
    const i=Math.min(Math.floor(seg),this.path.length-2);
    const f=seg-i;
    const px=this.path[i].x+(this.path[i+1].x-this.path[i].x)*f;
    const py=this.path[i].y+(this.path[i+1].y-this.path[i].y)*f;
    const op=tt<0.08?tt/0.08:tt>0.92?(1-tt)/0.08:1;
    ctx.globalAlpha=op*0.92;
    ctx.beginPath();ctx.arc(px,py,this.r,0,Math.PI*2);
    ctx.fillStyle=this.color;ctx.fill();
    ctx.globalAlpha=1;
  }
}

// ─── Injected CSS ─────────────────────────────────────────────────────────────
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:ital,wght@0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
@keyframes inkHint{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(1.6)}}
@keyframes detailIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes nodeGlow{0%,100%{opacity:.5}50%{opacity:1}}
.ink-hint-dot{animation:inkHint 1.4s ease-in-out infinite;}

/* Controls panel */
.ink-ctrl{display:grid;grid-template-columns:1fr 1px 1fr;background:rgba(255,255,255,.03);border:1.5px solid rgba(244,185,66,.2);border-radius:14px;overflow:visible;position:relative;z-index:10;}
.ink-ctrl-div{background:rgba(244,185,66,.12);width:1px;align-self:stretch;}
.ink-ctrl-col{padding:12px 16px;display:flex;flex-direction:column;gap:8px;position:relative;}
.ink-ctrl-lbl{display:flex;align-items:center;gap:6px;font-family:'Cinzel',serif;font-size:8px;letter-spacing:2.5px;text-transform:uppercase;color:#D4A96A;opacity:.85;}
.ink-ctrl-ico{width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;}
.ico-lang{background:rgba(244,185,66,.15);}
.ico-ind{background:rgba(58,158,126,.15);}
.ink-ddbtn{display:flex;align-items:center;gap:8px;border-radius:10px;padding:8px 12px;cursor:pointer;font-size:12px;font-weight:600;font-family:"DM Sans",sans-serif;transition:all .2s;width:100%;min-height:42px;}
.ink-lang-btn{background:rgba(244,185,66,.1);border:1.5px solid rgba(244,185,66,.35);color:#F4B942;}
.ink-lang-btn:hover{background:rgba(244,185,66,.18);}
.ink-ind-btn{background:rgba(58,158,126,.1);border:1.5px solid rgba(58,158,126,.35);color:#3A9E7E;}
.ink-ind-btn:hover{background:rgba(58,158,126,.18);}
.ink-drop{position:absolute;top:calc(100% + 6px);left:0;right:0;z-index:9999;background:#0d1e38;border-radius:12px;padding:5px;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.9);}
.ink-drop-lang{border:1.5px solid rgba(244,185,66,.28);max-height:220px;}
.ink-drop-ind{border:1.5px solid rgba(58,158,126,.28);max-height:240px;}
.ink-drop::-webkit-scrollbar{width:4px;}
.ink-drop-lang::-webkit-scrollbar-thumb{background:rgba(244,185,66,.2);border-radius:2px;}
.ink-drop-ind::-webkit-scrollbar-thumb{background:rgba(58,158,126,.2);border-radius:2px;}
.ink-drop-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:7px;cursor:pointer;font-size:12px;transition:background .15s;}
.ink-drop-lang .ink-drop-item:hover{background:rgba(244,185,66,.1);}
.ink-drop-ind .ink-drop-item:hover{background:rgba(58,158,126,.1);}
.ink-drop-item.sel-lang{background:rgba(244,185,66,.14);color:#F4B942;}
.ink-drop-item.sel-ind{background:rgba(58,158,126,.15);color:#3A9E7E;}
.ink-lcode{font-family:"Cinzel",serif;font-size:9px;letter-spacing:1px;color:#D4A96A;min-width:26px;font-weight:600;}

/* Node 3D card */
.ink-node-wrap{display:flex;flex-direction:column;align-items:center;gap:0;cursor:pointer;-webkit-tap-highlight-color:transparent;}
.ink-node-num{font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:1.5px;margin-bottom:4px;transition:color .2s;}
.ink-node-card{
  width:76px;height:76px;border-radius:18px;position:relative;
  transform-style:flat;
  transform:translateY(0px) scale(1);
  transition:transform .25s ease,box-shadow .25s ease;
}
.ink-node-card:hover{transform:translateY(-5px) scale(1.05);}
.ink-node-card.active{transform:translateY(-9px) scale(1.07);}
.ink-node-face{
  position:absolute;inset:0;border-radius:18px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;
  overflow:hidden;
}
.ink-node-face::after{
  content:'';position:absolute;top:0;left:0;right:0;height:48%;
  background:linear-gradient(180deg,rgba(255,255,255,.2) 0%,transparent 100%);
  border-radius:18px 18px 0 0;pointer-events:none;
}
.ink-node-edge-b{position:absolute;bottom:-8px;left:5px;right:5px;height:11px;border-radius:0 0 15px 15px;filter:brightness(.45);}
.ink-node-edge-r{position:absolute;right:-6px;top:5px;bottom:8px;width:9px;border-radius:0 13px 13px 0;filter:brightness(.5);}
.ink-node-corner{position:absolute;top:0;right:0;width:0;height:0;border-style:solid;border-width:0 22px 22px 0;border-color:transparent rgba(255,255,255,.18) transparent transparent;border-radius:0 14px 0 0;}
.ink-node-svg{width:34px;height:34px;position:relative;z-index:1;}
.ink-node-sticker{font-family:'Cinzel',serif;font-size:7.5px;font-weight:700;letter-spacing:1px;position:relative;z-index:1;}
.ink-node-name{
  font-family:'Cinzel',serif;font-size:9px;font-weight:600;letter-spacing:.4px;
  text-align:center;text-transform:uppercase;margin-top:8px;line-height:1.3;
  max-width:84px;transition:color .2s;
}
.ink-node-tool{
  font-size:8px;font-weight:400;letter-spacing:.3px;
  text-align:center;margin-top:2px;
  font-family:'DM Sans',sans-serif;
  max-width:84px;transition:color .2s;
}
/* Active glow badge on node */
.ink-node-active-badge{
  position:absolute;top:-8px;left:50%;transform:translateX(-50%);
  background:#F4B942;color:#0A1628;
  font-family:'Cinzel',serif;font-size:7px;font-weight:700;letter-spacing:1px;
  padding:2px 8px;border-radius:20px;white-space:nowrap;text-transform:uppercase;
  box-shadow:0 2px 12px rgba(244,185,66,.5);
  animation:nodeGlow 1.5s ease-in-out infinite;
}

/* Detail panel */
.ink-detail{animation:detailIn .28s ease forwards;}
.ink-detail-accent{height:4px;border-radius:4px 4px 0 0;}

/* ── Node grid ────────────────────────────────────────────────────────
   Desktop: 6 equal columns, single row
   Mobile ≤640px: 2-column grid, nodes offset to create zig-zag
──────────────────────────────────────────────────────────────────── */
.ink-pipe-grid{
  display:grid;
  grid-template-columns:repeat(6,1fr);
  padding:36px 12px 32px;
  width:100%;
  position:relative;
  z-index:2;
}

/* Mobile — 2 columns, staggered */
@media(max-width:640px){
  .ink-pipe-grid{
    grid-template-columns:1fr 1fr;
    row-gap:0;
    padding:24px 8px 24px;
  }
  /* Node 1: left col */
  .ink-node-cell:nth-child(1){ grid-column:1; padding:12px 8px 40px; }
  /* Node 2: right col, same row */
  .ink-node-cell:nth-child(2){ grid-column:2; padding:12px 8px 40px; }
  /* Node 3: left col, row 2 */
  .ink-node-cell:nth-child(3){ grid-column:1; padding:12px 8px 40px; }
  /* Node 4: right col, row 2 */
  .ink-node-cell:nth-child(4){ grid-column:2; padding:12px 8px 40px; }
  /* Node 5: left col, row 3 */
  .ink-node-cell:nth-child(5){ grid-column:1; padding:12px 8px 16px; }
  /* Node 6: right col, row 3 */
  .ink-node-cell:nth-child(6){ grid-column:2; padding:12px 8px 16px; }

  .ink-node-card{width:62px;height:62px;border-radius:14px;}
  .ink-node-card:hover{transform:translateY(-3px) scale(1.04);}
  .ink-node-svg{width:26px;height:26px;}
  .ink-node-name{font-size:8px;max-width:70px;margin-top:6px;}
  .ink-node-tool{font-size:7px;max-width:70px;}
  .ink-node-active-badge{font-size:6.5px;padding:2px 7px;}
  .ink-node-wrap{padding:8px 6px;}

  .ink-ctrl{grid-template-columns:1fr;grid-template-rows:auto 1px auto;}
  .ink-ctrl-div{width:auto;height:1px;grid-column:1;}
  .ink-ctrl-col{padding:10px 12px;}
}

@media(max-width:400px){
  .ink-node-card{width:54px;height:54px;border-radius:12px;}
  .ink-node-svg{width:22px;height:22px;}
  .ink-node-name{font-size:7.5px;max-width:60px;}
  .ink-node-wrap{padding:6px 4px;}
}
`;

// ─── Dropdown sub-components ──────────────────────────────────────────────────
function LangSelector({activeLang,onSelect}){
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  const cur=LANGS.find(l=>l.code===activeLang);
  useEffect(()=>{
    const fn=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",fn);return()=>document.removeEventListener("mousedown",fn);
  },[]);
  return(
    <div ref={ref} style={{position:"relative",width:"100%"}}>
      <button className="ink-ddbtn ink-lang-btn" onClick={()=>setOpen(o=>!o)}>
        <span style={{fontSize:15}}>🇿🇦</span>
        <span style={{flex:1,textAlign:"left"}}>{cur?.name}</span>
        <span style={{fontSize:10,opacity:.5,transform:open?"rotate(180deg)":"none",transition:"transform .2s",display:"inline-block"}}>▾</span>
      </button>
      {open&&(
        <div className="ink-drop ink-drop-lang">
          {LANGS.map(l=>(
            <div key={l.code} className={`ink-drop-item${l.code===activeLang?" sel-lang":""}`}
              onClick={()=>{onSelect(l.code);setOpen(false);}}
              style={{color:l.code===activeLang?C.gold:"rgba(250,246,238,.75)"}}>
              <span className="ink-lcode">{l.code}</span>
              <span style={{flex:1}}>{l.name}</span>
              {l.code===activeLang&&<span style={{color:C.gold}}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function IndustrySelector({active,onSelect}){
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  const cur=INDUSTRIES.find(i=>i.id===active)||INDUSTRIES[0];
  useEffect(()=>{
    const fn=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",fn);return()=>document.removeEventListener("mousedown",fn);
  },[]);
  return(
    <div ref={ref} style={{position:"relative",width:"100%"}}>
      <button className="ink-ddbtn ink-ind-btn" onClick={()=>setOpen(o=>!o)}>
        <span style={{fontSize:14}}>{cur.icon}</span>
        <span style={{flex:1,textAlign:"left"}}>{cur.label}</span>
        <span style={{fontSize:10,opacity:.5,transform:open?"rotate(180deg)":"none",transition:"transform .2s",display:"inline-block"}}>▾</span>
      </button>
      {open&&(
        <div className="ink-drop ink-drop-ind">
          {INDUSTRIES.map(ind=>(
            <div key={ind.id} className={`ink-drop-item${ind.id===active?" sel-ind":""}`}
              onClick={()=>{onSelect(ind.id);setOpen(false);}}
              style={{color:ind.id===active?C.teal:"rgba(250,246,238,.75)"}}>
              <span style={{fontSize:13}}>{ind.icon}</span>
              <span style={{flex:1}}>{ind.label}</span>
              {ind.id===active&&<span style={{color:C.teal}}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 3D Node card component ───────────────────────────────────────────────────
function NodeCard({node,isActive,onClick}){
  const faceBg = node.dark
    ? isActive ? "linear-gradient(145deg,#2a3820,#1a2810)" : "linear-gradient(145deg,#1e3258,#0f1e38)"
    : isActive ? "linear-gradient(145deg,#fffde8,#fff8d0)" : "linear-gradient(145deg,#ffffff,#f5efe0)";
  const edgeBg = node.dark ? "#0a1628" : "#d8cfc0";
  const edgeRBg = node.dark ? "#0d1e38" : "#e0d6c0";
  const numColor = isActive ? C.gold : node.dark ? "rgba(212,169,106,.65)" : node.color;
  const nameColor = isActive ? node.color : node.dark ? "rgba(212,169,106,.85)" : "#1a2e50";
  const toolColor = isActive ? `${node.color}aa` : node.dark ? "rgba(212,169,106,.5)" : "rgba(26,46,80,.45)";
  const boxShadow = isActive
    ? `0 0 0 2.5px ${node.color}, 0 14px 36px rgba(0,0,0,.55), 0 4px 0 ${node.color}77`
    : `0 8px 22px rgba(0,0,0,.45), 0 3px 0 ${node.color}55, inset 0 1px 0 rgba(255,255,255,.1)`;

  return(
    <div className="ink-node-wrap" onClick={onClick}>
      {/* Active badge floats above */}
      <div style={{height:20,display:"flex",alignItems:"flex-end",justifyContent:"center",position:"relative",width:"100%"}}>
        {isActive&&(
          <div className="ink-node-active-badge">{node.badge}</div>
        )}
      </div>

      {/* 3D card */}
      <div className={`ink-node-card${isActive?" active":""}`} style={{boxShadow}}>
        <div className="ink-node-face" style={{background:faceBg}}>
          <div className="ink-node-corner"/>
          <div className="ink-node-svg" dangerouslySetInnerHTML={{__html:node.svg}}/>
          <div className="ink-node-sticker" style={{color:numColor}}>
            {String(node.id+1).padStart(2,"0")}
          </div>
        </div>
        <div className="ink-node-edge-b" style={{background:edgeBg}}/>
        <div className="ink-node-edge-r" style={{background:edgeRBg}}/>
      </div>

      {/* Label and tool name below card */}
      <div className="ink-node-name" style={{color:nameColor}}>{node.label}</div>
      <div className="ink-node-tool" style={{color:toolColor}}>{node.tool}</div>
    </div>
  );
}

// ─── Detail panel — node number indicator + prev/next navigation ─────────────
function DetailPanel({stageIdx,industry,lang,onNavigate}){
  if(stageIdx<0){
    return(
      <div style={{background:"rgba(255,255,255,.025)",border:"1px dashed rgba(244,185,66,.18)",borderRadius:12,padding:"20px",textAlign:"center"}}>
        <p style={{fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:2,color:"rgba(212,169,106,.4)",textTransform:"uppercase",marginBottom:6}}>
          ↑ Tap any node above
        </p>
        <p style={{fontSize:11.5,color:"rgba(250,246,238,.3)",fontFamily:"'DM Sans',sans-serif"}}>
          Select a stage to see the real SA business scenario for your industry
        </p>
        {/* Node number step indicators */}
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:14}}>
          {NODES_DEF.map((_,i)=>(
            <button key={i} onClick={()=>onNavigate(i)} style={{
              width:28,height:28,borderRadius:"50%",
              background:"rgba(244,185,66,.08)",border:"1px solid rgba(244,185,66,.2)",
              color:"rgba(244,185,66,.45)",fontFamily:"'Cinzel',serif",fontSize:9,fontWeight:700,
              cursor:"pointer",transition:"all .2s",
            }}>
              {String(i+1).padStart(2,"0")}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const node        = NODES_DEF[stageIdx];
  const indScenario = (IND[industry]||IND.General)[`s${stageIdx}`];
  const langText    = (LANG_TEXTS[stageIdx]||{})[lang]||(LANG_TEXTS[stageIdx]||{}).EN||"";
  const langName    = LANGS.find(l=>l.code===lang)?.name||"English";
  const hasPrev     = stageIdx > 0;
  const hasNext     = stageIdx < NODES_DEF.length-1;

  return(
    <div className="ink-detail" style={{borderRadius:12,overflow:"hidden",border:`1.5px solid ${node.color}40`}}>
      {/* Colour accent top bar */}
      <div className="ink-detail-accent" style={{background:`linear-gradient(90deg,${node.color},${node.color}44)`}}/>

      <div style={{background:"linear-gradient(135deg,#0d1e38,#0A1628)",padding:"16px 18px"}}>

        {/* ── Node number indicator row ── */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          {NODES_DEF.map((n,i)=>(
            <button key={i} onClick={()=>onNavigate(i)} style={{
              width:i===stageIdx?32:26,height:i===stageIdx?32:26,
              borderRadius:"50%",
              background:i===stageIdx?n.color:"rgba(255,255,255,.06)",
              border:i===stageIdx?`2px solid ${n.color}`:"1px solid rgba(255,255,255,.12)",
              color:i===stageIdx?(n.dark?"#FAF6EE":"#0A1628"):"rgba(255,255,255,.4)",
              fontFamily:"'Cinzel',serif",fontSize:i===stageIdx?10:8,fontWeight:700,
              cursor:"pointer",transition:"all .22s ease",flexShrink:0,
              boxShadow:i===stageIdx?`0 0 12px ${n.color}55`:"none",
            }}>
              {String(i+1).padStart(2,"0")}
            </button>
          ))}
          <span style={{marginLeft:4,fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:2,color:"rgba(255,255,255,.25)",textTransform:"uppercase"}}>
            Stage {stageIdx+1} of {NODES_DEF.length}
          </span>
        </div>

        {/* Stage header row */}
        <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:14}}>
          {/* Mini 3D node icon */}
          <div style={{
            width:48,height:48,borderRadius:12,flexShrink:0,
            background: node.dark ? "linear-gradient(145deg,#1e3258,#0f1e38)" : "linear-gradient(145deg,#ffffff,#f5efe0)",
            border:`1.5px solid ${node.color}55`,
            boxShadow:`0 4px 0 ${node.color}33, 0 6px 16px rgba(0,0,0,.4)`,
            display:"flex",alignItems:"center",justifyContent:"center",
            transform:"perspective(200px) rotateX(8deg) rotateY(-5deg)",
          }}>
            <div style={{width:28,height:28}} dangerouslySetInnerHTML={{__html:node.svg}}/>
          </div>

          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:5}}>
              <div style={{display:"inline-block",fontFamily:"'Cinzel',serif",fontSize:8,fontWeight:700,letterSpacing:1.5,padding:"2px 9px",background:node.color,color:node.dark?"#FAF6EE":"#0A1628",textTransform:"uppercase"}}>
                {node.badge}
              </div>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:1.2,color:node.color,opacity:.85,textTransform:"uppercase"}}>
                {node.tool}
              </span>
            </div>
            <p style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(13px,2vw,15px)",fontWeight:600,color:C.ivory,lineHeight:1.35,margin:0}}>
              {indScenario.title}
            </p>
          </div>
        </div>

        {/* SA Business scenario — EN shows industry-specific desc; other langs show translated explanation */}
        <div style={{background:"rgba(255,255,255,.04)",borderRadius:9,padding:"12px 14px",marginBottom:12,borderLeft:`3px solid ${node.color}`}}>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:2,color:node.color,textTransform:"uppercase",marginBottom:6,opacity:.85}}>
            {lang==="EN" ? "Real SA Business Scenario" : `${langName} — SA Business Scenario`}
          </p>
          <p style={{fontSize:"clamp(12px,1.8vw,13px)",color:"rgba(250,246,238,.8)",lineHeight:1.82,margin:0}}>
            {lang==="EN" ? indScenario.desc : langText}
          </p>
        </div>

        {/* Tags + Signal */}
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
          {node.tags.map(([label,type])=>(
            <span key={label} style={{fontSize:9.5,fontWeight:500,letterSpacing:.3,padding:"3px 9px",border:"1px solid",textTransform:"uppercase",borderRadius:3,borderColor:TAG[type].border,color:TAG[type].color,background:TAG[type].bg}}>
              {label}
            </span>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:14}}>
          <span style={{fontSize:8,letterSpacing:1,textTransform:"uppercase",color:"rgba(212,169,106,.45)",marginRight:4}}>Signal</span>
          {[1,2,3,4,5].map(b=>(
            <div key={b} style={{width:5,borderRadius:1,height:5+b*3,background:b<=node.signal?C.teal:"rgba(58,158,126,.15)",transition:"background .3s"}}/>
          ))}
          <span style={{fontSize:9,color:"rgba(58,158,126,.7)",marginLeft:4}}>{node.signal===5?"Excellent":"Good"}</span>
        </div>

        {/* ── Prev / Next navigation ── */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom: node.isFinal?0:0}}>
          <button onClick={()=>hasPrev&&onNavigate(stageIdx-1)} style={{
            display:"flex",alignItems:"center",gap:6,
            padding:"8px 14px",borderRadius:8,border:"1px solid",
            borderColor:hasPrev?"rgba(244,185,66,.35)":"rgba(255,255,255,.08)",
            background:hasPrev?"rgba(244,185,66,.08)":"transparent",
            color:hasPrev?C.gold:"rgba(255,255,255,.2)",
            cursor:hasPrev?"pointer":"default",
            fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,
            transition:"all .2s",
          }}>
            ← {hasPrev?`Stage ${stageIdx} — ${NODES_DEF[stageIdx-1].label}`:"First stage"}
          </button>
          <div style={{flex:1}}/>
          <button onClick={()=>hasNext&&onNavigate(stageIdx+1)} style={{
            display:"flex",alignItems:"center",gap:6,
            padding:"8px 14px",borderRadius:8,border:"1px solid",
            borderColor:hasNext?"rgba(244,185,66,.55)":"rgba(255,255,255,.08)",
            background:hasNext?"rgba(244,185,66,.12)":"transparent",
            color:hasNext?C.gold:"rgba(255,255,255,.2)",
            cursor:hasNext?"pointer":"default",
            fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,
            transition:"all .2s",
          }}>
            {hasNext?`Stage ${stageIdx+2} — ${NODES_DEF[stageIdx+1].label}`:"Last stage"} →
          </button>
        </div>

        {/* Book a call CTA on final node */}
        {node.isFinal&&(
          <a href="https://cal.com/sanele-inkanyezi" target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:10,background:"rgba(244,185,66,.1)",border:"1px solid rgba(244,185,66,.3)",borderRadius:10,padding:"11px 14px",marginTop:12,textDecoration:"none"}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#1a2e50,#0f1e36)",border:"1.5px solid rgba(244,185,66,.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>🚀</div>
            <div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:11,fontWeight:600,color:C.gold}}>Book a free call with Sanele</div>
              <div style={{fontSize:10,color:"rgba(212,169,106,.65)",marginTop:2}}>See how this pipeline works for your business — no commitment</div>
            </div>
            <div style={{marginLeft:"auto",fontSize:16,color:"rgba(244,185,66,.6)"}}>→</div>
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function DataPipeline(){
  const canvasRef  = useRef(null);
  const wrapRef    = useRef(null);
  const pipeRef    = useRef(null); // positions of pipe midpoints for canvas
  const sr         = useRef({W:800,H:100,DPR:1,pipes:[],particles:[],raf:null});

  const [activeLang,     setActiveLang]     = useState("EN");
  const [activeIndustry, setActiveIndustry] = useState("General");
  const [activeNode,     setActiveNode]     = useState(-1);
  const [nodePositions,  setNodePositions]  = useState([]);

  // Measure node DOM positions and feed to canvas (works on all screen sizes)
  const measureNodes = useCallback(()=>{
    if(!pipeRef.current||!wrapRef.current)return;
    const wrapRect = wrapRef.current.getBoundingClientRect();
    const nodeEls  = pipeRef.current.querySelectorAll(".ink-node-card");
    if(nodeEls.length===0)return;
    const positions = [];
    nodeEls.forEach(el=>{
      const r = el.getBoundingClientRect();
      positions.push({
        x: r.left - wrapRect.left + r.width/2,
        y: r.top  - wrapRect.top  + r.height/2,
      });
    });
    const s = sr.current;
    s.pipes = positions;
    // Sync canvas height to actual wrapper height
    const cvs = canvasRef.current;
    if(cvs){
      const DPR = s.DPR||1;
      const H = wrapRef.current.getBoundingClientRect().height||200;
      s.H = H;
      cvs.height = H*DPR;
      cvs.style.height = H+"px";
      cvs.getContext("2d").setTransform(DPR,0,0,DPR,0,0);
    }
    // Build straight-line particle paths matching the straight pipes
    const ptcls = [];
    for(let i=0;i<positions.length-1;i++){
      const a=positions[i], b=positions[i+1];
      // Simple linear path: just start and end point
      const path=[a,b];
      for(let k=0;k<5;k++) ptcls.push(new Particle(path,k*0.18));
    }
    s.particles = ptcls;
  },[]);

  // Resize canvas to match wrap
  const handleResize = useCallback(()=>{
    const cvs=canvasRef.current,wrap=wrapRef.current;
    if(!cvs||!wrap)return;
    const DPR=window.devicePixelRatio||1;
    const W=wrap.getBoundingClientRect().width||800;
    const s=sr.current;
    s.W=W;s.DPR=DPR;
    cvs.width=W*DPR;
    cvs.style.width=W+"px";
    cvs.getContext("2d").setTransform(DPR,0,0,DPR,0,0);
    // Let CSS grid reflow first, then measure actual node positions
    setTimeout(measureNodes,100);
  },[measureNodes]);

  const drawFrame = useCallback(()=>{
    const s=sr.current;
    const cvs=canvasRef.current;if(!cvs)return;
    const ctx=cvs.getContext("2d");
    const{W,H}=s;
    ctx.clearRect(0,0,W,H);
    // Transparent bg — the HTML nodes sit on top
    // Draw straight pipes between node positions
    if(s.pipes.length>1){
      for(let i=0;i<s.pipes.length-1;i++){
        const a=s.pipes[i],b=s.pipes[i+1];
        // Straight line
        ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
        ctx.strokeStyle="rgba(10,22,64,0.18)";
        ctx.lineWidth=2;ctx.setLineDash([8,5]);ctx.stroke();ctx.setLineDash([]);
        // Arrowhead pointing straight to b
        const ang=Math.atan2(b.y-a.y,b.x-a.x);
        const arrowX=b.x-Math.cos(ang)*38;
        const arrowY=b.y-Math.sin(ang)*38;
        ctx.save();ctx.translate(arrowX,arrowY);ctx.rotate(ang);
        ctx.beginPath();ctx.moveTo(-10,-4);ctx.lineTo(0,0);ctx.lineTo(-10,4);
        ctx.strokeStyle="rgba(10,22,64,.45)";ctx.lineWidth=2;ctx.lineJoin="round";ctx.stroke();
        ctx.restore();
      }
    }
    s.particles.forEach(p=>{p.tick();p.draw(ctx);});
    if(s.raf!==null)s.raf=requestAnimationFrame(drawFrame);
  },[]);

  useEffect(()=>{
    if(!document.getElementById("ink-dp-css")){
      const el=document.createElement("style");el.id="ink-dp-css";el.textContent=CSS;
      document.head.appendChild(el);
    }
    handleResize();

    // IntersectionObserver — pause animation when section scrolled off screen
    const observer=new IntersectionObserver(entries=>{
      const s=sr.current;
      if(entries[0].isIntersecting){if(!s.raf)s.raf=requestAnimationFrame(drawFrame);}
      else{if(s.raf){cancelAnimationFrame(s.raf);s.raf=null;}}
    },{threshold:0.01});
    const section=canvasRef.current?.closest("section");
    if(section)observer.observe(section);

    // ResizeObserver — re-measure node positions when pipeline wrapper changes height
    // (happens on mobile when grid reflows from 6-col to 3-col or 2-col)
    let roTimer;
    const ro = new ResizeObserver(()=>{
      clearTimeout(roTimer);
      roTimer = setTimeout(measureNodes, 120);
    });
    if(wrapRef.current) ro.observe(wrapRef.current);

    // Window resize debounced
    let winTimer;
    const onR=()=>{clearTimeout(winTimer);winTimer=setTimeout(handleResize,150);};
    window.addEventListener("resize",onR);

    return()=>{
      const s=sr.current;
      if(s.raf){cancelAnimationFrame(s.raf);s.raf=null;}
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("resize",onR);
    };
  },[drawFrame,handleResize,measureNodes]);

  function toggleNode(i){
    const next=i===activeNode?-1:i;
    setActiveNode(next);
    sr.current.activeNode=next;
    setTimeout(()=>{
      document.getElementById("ink-detail-anchor")?.scrollIntoView({behavior:"smooth",block:"nearest"});
    },80);
  }

  return(
    <section id="how-it-works" style={{width:"100%",padding:"40px 0",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 16px"}}>
        <div style={{borderRadius:16,overflow:"visible"}}>

          {/* Tech interface top bar — replaces Ndebele strip */}
          <div style={{
            height:36,borderRadius:"16px 16px 0 0",
            background:"linear-gradient(90deg,#0d1e38 0%,#112240 50%,#0d1e38 100%)",
            borderBottom:"1px solid rgba(244,185,66,.15)",
            display:"flex",alignItems:"center",
            padding:"0 16px",gap:10,
          }}>
            {/* Traffic-light dots */}
            <div style={{display:"flex",gap:6}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:"#FF5F56"}}/>
              <div style={{width:10,height:10,borderRadius:"50%",background:"#FFBD2E"}}/>
              <div style={{width:10,height:10,borderRadius:"50%",background:"#27C93F"}}/>
            </div>
            <div style={{flex:1,display:"flex",justifyContent:"center"}}>
              <span style={{fontFamily:"'DM Sans',monospace",fontSize:10,color:"rgba(212,169,106,.55)",letterSpacing:2}}>
                INKANYEZI · AUTOMATION PIPELINE · LIVE
              </span>
            </div>
            {/* Live pulse indicator */}
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <div className="ink-hint-dot" style={{width:6,height:6,borderRadius:"50%",background:"#27C93F",flexShrink:0}}/>
              <span style={{fontSize:9,color:"rgba(39,201,63,.7)",letterSpacing:1,fontFamily:"'DM Sans',sans-serif"}}>LIVE</span>
            </div>
          </div>

          {/* Header */}
          <div style={{background:C.night,padding:"16px 20px 14px",position:"relative",zIndex:10}}>
            <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:ADINKRA,pointerEvents:"none",borderRadius:0}}/>
            <p style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:4,color:C.sand,textTransform:"uppercase",marginBottom:5,opacity:.8}}>
              How Inkanyezi Works
            </p>
            <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(15px,3vw,20px)",fontWeight:700,color:C.ivory,lineHeight:1.25,margin:"0 0 5px"}}>
              Your business runs on{" "}
              <em style={{fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",color:C.gold,fontSize:"clamp(17px,3.5vw,23px)",fontWeight:300}}>autopilot</em>
            </h2>
            <p style={{fontSize:"clamp(11px,1.8vw,12.5px)",color:"rgba(250,246,238,.52)",lineHeight:1.65,margin:"0 0 12px",maxWidth:560}}>
              Every enquiry — WhatsApp, website, phone or walk-in — is automatically captured, sorted, responded to and tracked. Select your industry, then tap any node to see how it works for your business.
            </p>
            <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(244,185,66,.08)",border:"1px solid rgba(244,185,66,.2)",borderRadius:20,padding:"4px 12px",marginBottom:12}}>
              <div className="ink-hint-dot" style={{width:6,height:6,borderRadius:"50%",background:C.gold,flexShrink:0}}/>
              <span style={{fontSize:11,color:C.sand,letterSpacing:.3,fontWeight:500}}>Tap any node to see real SA business scenarios · 11 SA languages</span>
            </div>
            {/* Controls */}
            <div className="ink-ctrl">
              <div className="ink-ctrl-col">
                <div className="ink-ctrl-lbl">
                  <div className="ink-ctrl-ico ico-lang">🌍</div>
                  <span>Explain in your language</span>
                </div>
                <LangSelector activeLang={activeLang} onSelect={setActiveLang}/>
              </div>
              <div className="ink-ctrl-div"/>
              <div className="ink-ctrl-col">
                <div className="ink-ctrl-lbl">
                  <div className="ink-ctrl-ico ico-ind">🏢</div>
                  <span>Show pipeline for your industry</span>
                </div>
                <IndustrySelector active={activeIndustry} onSelect={setActiveIndustry}/>
              </div>
            </div>
          </div>

          <div style={{height:6,background:S_KEN}}/>

          {/* Pipeline area — light interface background */}
          <div ref={wrapRef} style={{
            position:"relative",
            background:"linear-gradient(180deg,#E8EEF7 0%,#EDF2FA 100%)",
            borderTop:"1px solid rgba(10,22,40,.08)",
            borderBottom:"1px solid rgba(10,22,40,.08)",
          }}>
            {/* Subtle grid lines — computer interface feel */}
            <div style={{
              position:"absolute",inset:0,
              backgroundImage:`
                linear-gradient(rgba(10,22,40,.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(10,22,40,.04) 1px, transparent 1px)
              `,
              backgroundSize:"32px 32px",
              pointerEvents:"none",zIndex:0,
            }}/>
            <canvas
              ref={canvasRef}
              style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1}}
            />
            {/* Single render of each node — no duplication */}
            <div ref={pipeRef} className="ink-pipe-grid">
              {NODES_DEF.map((node,i)=>(
                <div key={node.id} className="ink-node-cell" style={{display:"flex",justifyContent:"center"}}>
                  <NodeCard
                    node={node}
                    isActive={activeNode===i}
                    onClick={()=>toggleNode(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{height:6,background:S_KEN}}/>

          {/* Detail panel — below pipeline on all screen sizes */}
          <div id="ink-detail-anchor" style={{background:C.night,padding:"12px 16px 16px"}}>
            <DetailPanel
              stageIdx={activeNode}
              industry={activeIndustry}
              lang={activeLang}
              onNavigate={toggleNode}
            />
          </div>

          {/* Progress dots */}
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:7,padding:"10px 16px",background:C.night,flexWrap:"wrap"}}>
            {NODES_DEF.map((_,i)=>(
              <button key={i} onClick={()=>toggleNode(i)} style={{
                width:i===activeNode?22:7,height:7,
                borderRadius:i===activeNode?3:"50%",
                background:i===activeNode?C.gold:"rgba(212,169,106,.22)",
                border:"none",cursor:"pointer",padding:0,transition:"all .22s ease",
              }}/>
            ))}
          </div>

          {/* Bottom Ndebele strip */}
          <div style={{height:9,background:S_BOT,borderRadius:"0 0 16px 16px"}}/>
        </div>
      </div>
    </section>
  );
}
