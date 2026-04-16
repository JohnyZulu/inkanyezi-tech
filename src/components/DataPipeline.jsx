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
// ── 15 SA industries with icons ───────────────────────────────────────────────
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

// ── Real SA business scenarios per industry ───────────────────────────────────
const IND={
  General:{
    s0:{title:"Multi-channel lead intake",          desc:"A business owner sends a WhatsApp message asking about automation pricing. A Joburg retailer fills in the website contact form at midnight. A Cape Town legal firm submits via API. All three land in one queue simultaneously — nothing is missed."},
    s1:{title:"Smart routing & validation",          desc:"Each enquiry is validated and tagged by source, urgency and business size. The midnight retail form gets flagged as high-value and routed to the priority lane. The WhatsApp message is normalised into a structured lead record before moving forward."},
    s2:{title:"CRM logging & unique reference",      desc:"Every lead lands in the CRM with a unique reference number — format INK-GEN-2025-XXXX. Timestamps, source channel and business type are recorded. Nothing gets lost in a WhatsApp chat or an unread email thread ever again."},
    s3:{title:"AI lead scoring & personalisation",   desc:"Gemini AI reads each lead, scores the likelihood of conversion, classifies the business size and generates a personalised first-response message in the prospect's preferred language — ready to send in seconds, not hours."},
    s4:{title:"Automated follow-up & booking",       desc:"High-scoring leads receive a branded email sequence automatically. A booking confirmation link fires to their phone. The Inkanyezi team gets a notification — all before anyone has touched a keyboard."},
    s5:{title:"Live pipeline dashboard",             desc:"Every lead, every stage, every response time — visible in real time on the Inkanyezi dashboard. Looker Studio shows conversion trends. The team can see exactly where each prospect is in the pipeline from any device, anywhere in SA."},
  },
  Trades:{
    s0:{title:"Job request capture — plumbers, electricians, builders",desc:"A Durban homeowner sends a WhatsApp voice note about a burst geyser. A Pretoria body corporate submits a maintenance tender via email. A walk-in at a KZN hardware store asks about a rewiring job. All three are captured instantly."},
    s1:{title:"Emergency vs scheduled job routing",  desc:"Burst pipes and power outages are flagged as URGENT and jump the queue automatically. Planned renovations and maintenance contracts are sorted by suburb and allocated to the nearest available technician on the same trigger."},
    s2:{title:"Digital job card creation",           desc:"Each job gets a digital card in the CRM — client name, property address, erf number, job type, photos if submitted. No more paper job cards lost in a bakkie. Every job is traceable from intake to invoice."},
    s3:{title:"AI quoting & WhatsApp estimate",      desc:"AI reads the job description, estimates material cost ranges from the supplier price list and drafts a WhatsApp quote the tradesperson can approve with one tap. A Plumbkor supply job in Umgeni Business Park gets a quote in under 3 minutes."},
    s4:{title:"Dispatch notification & job scheduling",desc:"Confirmed jobs fire a dispatch notification to the allocated technician's phone with the address, job card and client contact. The scheduler sees all active jobs on a map. Invoices trigger automatically on job completion."},
    s5:{title:"Revenue & job board dashboard",       desc:"Open jobs, completed work, outstanding invoices and monthly revenue — all visible on one screen. A plumbing contractor in eThekwini can see which suburbs generate the most work and which technicians have capacity right now."},
  },
  Retail:{
    s0:{title:"Omnichannel shopper intake",          desc:"A Soweto customer DMs on Instagram about stock availability. A Sandton shopper abandons a cart at 11pm. A Durban wholesaler phones to place a bulk order. All three are captured and queued without a single staff member being online."},
    s1:{title:"Stock & order event triggers",        desc:"When stock drops below reorder threshold, a purchase order draft fires automatically. Abandoned carts trigger a WhatsApp reminder 30 minutes later. New bulk orders from verified trade accounts skip the standard queue and go straight to the fulfilment team."},
    s2:{title:"Customer & inventory records",        desc:"Every customer gets a unified profile — purchase history, preferred brands, average spend, suburb. Inventory levels update in real time. A Cape Town gift shop owner can see that her Xmas stock will run out in 6 days before it happens."},
    s3:{title:"Personalised promotions & restock AI",desc:"AI identifies that a Limpopo customer buys braai supplies every Friday before month-end and sends a personalised WhatsApp promotion on Thursday afternoon. Restock recommendations are generated from sales velocity — no more guessing."},
    s4:{title:"Order fulfilment & courier booking",  desc:"Confirmed online orders trigger a pick-list for the storeroom, book a Pudo or The Courier Guy collection automatically and send the customer a tracking link via WhatsApp. Cash-on-delivery orders get a separate confirmation flow."},
    s5:{title:"Sales & foot traffic dashboard",      desc:"Daily sales, best-selling SKUs, dead stock, customer acquisition cost and average basket value — one live view. A Maponya Mall retailer can compare this Saturday's sales to last month from a phone in the stockroom."},
  },
  Legal:{
    s0:{title:"Client matter intake",               desc:"A family in Khayelitsha sends a WhatsApp message about an eviction notice. A Joburg company emails about a CCMA dispute. A walk-in at a Durban firm asks about a contractual matter. All enquiries are captured, timestamped and tagged by matter type immediately."},
    s1:{title:"Matter urgency & practice routing",  desc:"Eviction and urgent interdict matters are flagged and escalated within minutes. Commercial disputes are routed to the corporate practice. Family law matters go to the appropriate senior. Nothing sits in a general inbox over a long weekend."},
    s2:{title:"Matter file & billing reference",    desc:"Every new client gets a matter file in the CRM — ID number, contact details, matter type, date received and a billing reference number. Documents shared via WhatsApp or email are automatically attached to the correct file."},
    s3:{title:"Matter complexity scoring & response",desc:"AI reads the initial brief and classifies the matter type, complexity and likely fee range. It drafts a professional first-response letter in English or Afrikaans — setting expectations on timeline and fees before the attorney has read a word."},
    s4:{title:"Onboarding, billing & court diary",  desc:"Accepted mandates trigger a client onboarding email with fee agreement and FICA requirements. Court dates are added to the shared diary. Monthly billing reminders fire automatically so no invoice ever gets forgotten."},
    s5:{title:"Practice pipeline & billing dashboard",desc:"Active matters, fee notes outstanding, court dates this week, new enquiries this month — all in one practitioner view. A two-person firm in Pietermaritzburg can run with the discipline of a 20-person practice."},
  },
  Healthcare:{
    s0:{title:"Patient & appointment enquiry intake",desc:"A patient in Alexandra sends a WhatsApp asking about diabetes medication. A Durban GP's receptionist submits a referral form. A walk-in clinic in Langa registers a new patient on a tablet. All three are queued and processed without a phone call."},
    s1:{title:"Urgency triage & practitioner routing",desc:"Chest pain and breathing difficulty enquiries are flagged immediately and an emergency number is sent back within seconds. Routine check-ups are allocated to the next available slot. Specialist referrals are routed to the correct consulting room."},
    s2:{title:"Patient record & referral storage",  desc:"Each patient gets a secure record — ID, medical aid number, chronic conditions, visit history and referring doctor. Referral letters attach automatically. A clinic in Soweto now has a full patient history available before the practitioner walks in."},
    s3:{title:"Symptom triage AI & booking confirmation",desc:"AI reads the patient's described symptoms, classifies urgency and drafts a personalised appointment confirmation including preparation instructions and what to bring. Chronic patients get a reminder 48 hours before a scheduled review."},
    s4:{title:"Appointment scheduling & reminders", desc:"Confirmed bookings write to the practitioner's schedule. Patients receive a WhatsApp reminder the day before. No-shows trigger an automatic follow-up to rebook. Medical aid authorisation numbers are requested automatically where required."},
    s5:{title:"Patient flow & clinic dashboard",    desc:"Today's queue, no-show rate, average consultation time and outstanding medical aid claims — visible in real time. A private GP practice in Umhlanga can identify that Tuesday afternoons are overbooked and redistribute load before patients complain."},
  },
  Education:{
    s0:{title:"Student & parent enquiry capture",   desc:"A parent in Soweto sends a WhatsApp asking about Grade 8 registration. A matric student in Durban fills in an online application form for a coding bootcamp. An adult learner in Polokwane phones about evening classes. All are captured without a receptionist."},
    s1:{title:"Application routing & priority",     desc:"Matric applications before the closing date are fast-tracked. Adult learner enquiries are routed to the evening programme coordinator. WhatsApp enquiries are normalised into structured application records before any human touches them."},
    s2:{title:"Student record & application file",  desc:"Every enquiry creates an application file with the student's details, programme of interest, qualifications submitted and application date. A private college in Johannesburg can see exactly how many applications are pending per programme at any moment."},
    s3:{title:"Personalised programme matching AI", desc:"AI reads the student's background and goals, matches them to the most suitable programme and drafts a personalised response with curriculum highlights, fees and payment plan options — in the student's home language if requested."},
    s4:{title:"Enrolment, fees & timetable dispatch",desc:"Accepted students receive their enrolment pack, fee schedule and timetable automatically. Payment plan agreements are sent via WhatsApp for digital signature. NSFAS-eligible students are flagged and routed to the finance officer."},
    s5:{title:"Enrolment & revenue dashboard",      desc:"Applications received, enrolments confirmed, fees collected, dropout risk alerts — one live view per campus. An independent school in KZN can track which grade levels have open seats and which programmes are oversubscribed."},
  },
  Property:{
    s0:{title:"Buyer, seller & rental enquiry intake",desc:"A first-time buyer in Roodepoort sends a WhatsApp asking about bond eligibility. A landlord in Umhlanga submits a rental listing form. A tenant in Cape Town emails about a maintenance fault. All three land in the same pipeline, correctly tagged."},
    s1:{title:"Enquiry type routing & urgency",     desc:"Maintenance emergencies like no water or electrical faults are escalated to the property manager within minutes. Sales leads are scored by buying intent and budget range. Rental applications go to the letting department automatically."},
    s2:{title:"Property & client profile storage",  desc:"Each enquiry creates or updates a client profile linked to the property — stand number, lease terms, outstanding maintenance tickets, payment history. A managing agent in Pretoria East can pull up a tenant's full history in 10 seconds."},
    s3:{title:"Bond affordability & match AI",      desc:"AI estimates bond affordability from the buyer's stated income, matches them to suitable listings in their price range and drafts a personalised property shortlist with a suggested viewing schedule — sent via WhatsApp the same day."},
    s4:{title:"OTP generation, lease & viewing scheduling",desc:"Accepted offers trigger an OTP document automatically. Lease renewals fire 60 days before expiry. Viewing appointments are added to the agent's calendar and confirmed to the buyer via WhatsApp with the property address and contact pin."},
    s5:{title:"Portfolio & letting dashboard",      desc:"Available units, occupied units, rent collected vs outstanding, maintenance open tickets and new enquiries this month — all visible in one property portfolio dashboard. A KZN letting agency can manage 200 units without hiring an extra admin person."},
  },
  Transport:{
    s0:{title:"Freight, courier & logistics intake",desc:"A Rustenburg mining supplier sends a WhatsApp requesting a 10-ton load quote. A Durban e-commerce store submits a same-day courier request online. A Joburg taxi association phones about a vehicle fleet service contract. All are captured and queued."},
    s1:{title:"Load size & urgency routing",        desc:"Same-day and urgent courier jobs jump the standard allocation queue. Bulk freight requests above 5 tons are routed to the heavy-haul coordinator. Fleet maintenance contracts are flagged for the commercial team with a 4-hour response SLA."},
    s2:{title:"Load & client record management",    desc:"Each booking creates a waybill record in the CRM — origin, destination, weight, value declared, client contact and vehicle allocated. A trucking company operating between Durban harbour and the Reef has a complete audit trail for every load."},
    s3:{title:"AI route optimisation & quoting",    desc:"AI calculates the most cost-effective route accounting for tolls, fuel cost and driver hours compliance. A competitive quote is drafted and sent via WhatsApp for client approval — faster than any competitor still quoting manually."},
    s4:{title:"Dispatch, tracking & proof of delivery",desc:"Confirmed bookings dispatch the driver automatically with route instructions. Clients receive a WhatsApp tracking link. Proof of delivery triggers an automatic invoice. A courier company in Cape Town processes 40% more orders with the same team size."},
    s5:{title:"Fleet & revenue operations dashboard",desc:"Active loads, vehicles in transit, on-time delivery rate, outstanding invoices and fuel cost per km — one operations screen. A logistics SME in Ekurhuleni can identify that their Friday afternoon Cape Town run is consistently late and reroute before the client complains."},
  },
  Finance:{
    s0:{title:"Client financial enquiry intake",   desc:"A spaza shop owner in Khayelitsha sends a WhatsApp asking about a working capital loan. A Tshwane taxi owner fills in an asset finance enquiry form online. A young professional phones about a tax return. All are captured, tagged and queued without a call centre."},
    s1:{title:"Product & risk routing",            desc:"Bond and vehicle finance enquiries are routed to the secured lending team. Unsecured loan requests are scored by income band. Tax and accounting enquiries go to the advisory team. High-risk applications are flagged before a consultant wastes time on them."},
    s2:{title:"Client financial profile storage",  desc:"Each enquiry builds a client financial profile — ID, income bracket, existing debt declared, product of interest and consent to credit check. A micro-lender in Durban can see that 60% of their enquiries come from the informal sector and adjust their product offering accordingly."},
    s3:{title:"Affordability scoring & product match AI",desc:"AI assesses the client's declared financial position, matches them to the most suitable product and drafts a plain-language explanation of their options, repayment amounts and what documents to bring — reducing the back-and-forth by 80%."},
    s4:{title:"Application processing & compliance triggers",desc:"Qualified applications trigger FICA document requests automatically. Approved clients receive a digital acceptance letter and repayment schedule. SARS correspondence is flagged and routed to the tax compliance officer with a deadline reminder."},
    s5:{title:"Portfolio & compliance dashboard",  desc:"Applications received, approval rate, average loan size, outstanding repayments and compliance deadlines — one live view. A financial services SME in Sandton can see their entire book health without pulling a single spreadsheet."},
  },
  Food:{
    s0:{title:"Order, catering & franchise enquiry intake",desc:"A bride in Durban North sends a WhatsApp asking about a 200-person wedding catering package. A Joburg corporate office submits a weekly lunch order form online. A spaza shop owner phones about a franchise opportunity. All land in the same queue, tagged correctly."},
    s1:{title:"Order size & event routing",         desc:"Wedding and corporate event enquiries above R10,000 are routed to the senior catering consultant. Regular weekly orders are confirmed automatically within the SLA. Franchise enquiries are fast-tracked to the business development team with a 24-hour response target."},
    s2:{title:"Client & menu preference records",  desc:"Every client builds a profile — dietary requirements, preferred cuisine, order history, event dates and budget range. A Durban catering company can see that three of their corporate clients have a halal requirement and plan accordingly every week."},
    s3:{title:"Menu recommendation & quote AI",    desc:"AI reads the event brief, recommends a menu package within the client's stated budget, flags any dietary or allergen considerations and drafts a personalised quote with payment terms — ready to send in under 5 minutes from a WhatsApp enquiry."},
    s4:{title:"Event confirmation & supplier orders",desc:"Confirmed bookings trigger a supplier order for fresh produce, update the kitchen schedule and send the client a confirmation with the menu, setup time and balance due date. No more double-bookings on the same Saturday in December."},
    s5:{title:"Revenue & event pipeline dashboard", desc:"Upcoming events, revenue confirmed, supplier costs, margin per event and team availability — one kitchen management screen. A Cape Town catering business can see they have three events on the same day in June and start planning resources now."},
  },
  Beauty:{
    s0:{title:"Appointment & product enquiry intake",desc:"A client in Sandton sends a WhatsApp asking about a Brazilian Blowout price. A customer in Soweto fills in an online booking form for locs. A walk-in at a KZN salon asks about a skincare range. All enquiries are captured without the receptionist being distracted mid-service."},
    s1:{title:"Service type & therapist routing",   desc:"High-value treatments like bridal packages and spa days are routed to senior therapists. Quick blow-dry bookings are allocated to available junior staff. Product enquiries are tagged and followed up with a WhatsApp product recommendation automatically."},
    s2:{title:"Client preference & booking history",desc:"Every client builds a profile — preferred stylist, colour formula, allergy notes, visit frequency and average spend. A Durban salon owner can see that her top 20 clients haven't booked in 6 weeks and trigger a win-back campaign without opening a spreadsheet."},
    s3:{title:"AI rebooking reminders & promotions",desc:"AI identifies clients due for a colour retouch based on their booking pattern and sends a personalised WhatsApp reminder with a time-limited discount. New clients who haven't rebooked within 3 weeks get an automated follow-up — written in their preferred language."},
    s4:{title:"Booking confirmation & product dispatch",desc:"Confirmed appointments trigger a reminder the day before with the therapist name and service time. Online product orders are dispatched via courier with a tracking number. No-shows receive an automatic rebook offer within the hour."},
    s5:{title:"Salon revenue & client dashboard",   desc:"Bookings this week, revenue per service type, top clients by spend, product sales and no-show rate — one owner dashboard. A beauty entrepreneur running two salons in eThekwini can see which location is underperforming before month-end."},
  },
  Security:{
    s0:{title:"Incident & contract enquiry intake", desc:"A homeowner in Centurion sends a WhatsApp reporting a suspicious vehicle. A Durban estate manager submits a guarding contract enquiry online. A Cape Town retail store phones about an armed response upgrade. All are captured, timestamped and tagged by threat level immediately."},
    s1:{title:"Incident severity & response routing",desc:"Active incidents trigger an immediate dispatch notification to the nearest armed response vehicle. Contract enquiries are scored by site size and risk profile. Upgrade requests from existing clients skip the standard queue and go straight to the account manager."},
    s2:{title:"Site & client security profile",     desc:"Every site gets a security profile — property layout, access points, camera locations, alarm codes (encrypted), previous incident history and guard rotation schedule. A security company in Joburg can see the full risk picture of a client site before sending a guard."},
    s3:{title:"Risk scoring & proposal AI",         desc:"AI assesses the client's site risk profile based on suburb, crime stats and property type, then drafts a personalised security proposal with recommended product tier and monthly cost — presented to the client before the sales rep has left the office."},
    s4:{title:"Contract onboarding & shift scheduling",desc:"Signed contracts trigger a guard allocation, shift schedule and client onboarding pack automatically. Equipment installation bookings are added to the technician's calendar. Monthly invoices fire without anyone raising them manually."},
    s5:{title:"Operations & incident dashboard",    desc:"Active incidents, response times, guarding sites, contract renewals due and monthly revenue — one command centre screen. A security SME in Ekurhuleni can see their average response time is 8 minutes and set a target to bring it to 5 before the next client review."},
  },
  Events:{
    s0:{title:"Event booking & vendor enquiry intake",desc:"A Durban wedding planner sends a WhatsApp asking about AV equipment hire. A Johannesburg corporate HR manager submits a team-building enquiry form. A matric dance committee emails about a venue package. All three land in the pipeline before the events coordinator arrives at the office."},
    s1:{title:"Event size & urgency routing",       desc:"Events within 2 weeks are flagged as urgent and escalated to the availability manager. Corporate events above R50,000 are routed to the senior events coordinator. Matric and school events go to the dedicated education package team."},
    s2:{title:"Event brief & client file storage",  desc:"Every enquiry creates an event brief file — date, venue, guest count, catering requirements, AV needs and budget. A Durban events company can see that December has 14 confirmed bookings and only 3 available weekends — and stop taking new enquiries automatically."},
    s3:{title:"Package recommendation & quote AI",  desc:"AI reads the event brief, recommends the most suitable package, checks vendor availability on the requested date and drafts a personalised quote with optional add-ons — sent via WhatsApp within minutes of the enquiry landing."},
    s4:{title:"Supplier booking & event confirmation",desc:"Confirmed events trigger supplier bookings for catering, AV, décor and security simultaneously. Clients receive a confirmation with the event timeline, payment schedule and coordinator contact. Balance reminders fire automatically 30 days before the event."},
    s5:{title:"Events pipeline & revenue dashboard",desc:"Upcoming events, confirmed revenue, deposit payments received, supplier costs and team availability — one live planner dashboard. An events company in Cape Town can see their June/July pipeline is empty and launch a targeted promotion before the gap costs them revenue."},
  },
  Agri:{
    s0:{title:"Farmer & supplier enquiry intake",   desc:"A smallholder farmer in Limpopo sends a WhatsApp asking about drought-resistant seed availability. A KZN sugarcane co-op submits a bulk input quote request online. An agro-dealer in the Free State phones about a financing enquiry. All are captured without a sales rep in the field."},
    s1:{title:"Crop type & urgency routing",        desc:"Urgent pest and disease outbreak enquiries are escalated to the agronomist on call within minutes. Bulk input orders above R50,000 are routed to the commercial accounts team. Smallholder enquiries are queued by region and matched to the nearest field officer."},
    s2:{title:"Farm & client profile storage",      desc:"Every farmer builds a profile — farm size, crops grown, irrigation method, previous input orders, credit history and region. An agri-input supplier in Mpumalanga can see that citrus growers in the Lowveld are re-ordering fertiliser 2 weeks earlier than last season."},
    s3:{title:"Crop advisory & input recommendation AI",desc:"AI reads the farmer's crop type, region and current season conditions and recommends the optimal input package with timing guidance. A personalised WhatsApp advisory note is drafted in the farmer's language — practical enough to act on without an agronomist visit."},
    s4:{title:"Order fulfilment & delivery scheduling",desc:"Confirmed input orders trigger a collection or delivery booking, update the stock system and send the farmer a WhatsApp confirmation with the delivery date and driver contact. Credit-approved accounts get a statement update automatically."},
    s5:{title:"Agri sales & seasonal dashboard",    desc:"Input orders by crop type, regional demand trends, credit book health, delivery performance and seasonal revenue — one agri-business dashboard. A seed and fertiliser distributor in the Northern Cape can see demand building in a specific district 3 weeks before the sales reps report it."},
  },
  NGO:{
    s0:{title:"Beneficiary & donor enquiry intake", desc:"A community member in Motherwell sends a WhatsApp asking about food parcel registration. A Joburg corporate CSI manager submits a partnership enquiry form. A volunteer in Durban phones about a weekend feeding programme. All are captured and queued without an overwhelmed admin volunteer."},
    s1:{title:"Request type & priority routing",    desc:"Urgent welfare requests — food insecurity, domestic violence, child protection — are flagged and routed to the welfare officer immediately. Donor and corporate partnership enquiries are prioritised and responded to within 24 hours. Volunteer sign-ups are queued for the programmes coordinator."},
    s2:{title:"Beneficiary & donor records",        desc:"Every beneficiary gets a secure record — household size, area, programme enrolled, assistance received and next review date. Every donor gets a profile with giving history and tax certificate details. A Cape Town NPO can demonstrate impact to a funder in under 2 minutes."},
    s3:{title:"Impact reporting & donor match AI",  desc:"AI generates a personalised impact report for each donor showing exactly where their contribution went — number of families fed, learners supported, meals served — drafted as a WhatsApp message or formal PDF for the annual report."},
    s4:{title:"Programme scheduling & donor receipting",desc:"Approved beneficiary enrolments trigger a programme schedule and welcome message automatically. Donations above R100 trigger a Section 18A tax certificate without any admin intervention. Volunteer deployments are confirmed via WhatsApp with location and contact details."},
    s5:{title:"Impact & funding pipeline dashboard",desc:"Beneficiaries active, donations received this month, volunteer hours logged, programme costs and funding runway — one NPO operations dashboard. A Durban community organisation can see their food programme budget will run out in 6 weeks and start a targeted fundraising campaign now."},
  },
};

const STAGES=[
  {id:0,icon:"📥",label:"Data\nSources",dark:true,badge:"Entry Layer",signal:5,
   get industry(){return Object.fromEntries(Object.entries(IND).map(([k,v])=>[k,v.s0]));},
   lang:{EN:"Web forms, AI chatbot, WhatsApp and direct API submissions feed raw data into the pipeline.",ZU:"Amafomu ewebhu, ingxoxo ye-AI, i-WhatsApp kanye nezicelo ze-API zihlinzeka idatha ehlanzekile.",XH:"Iifom zewebhu, ingxoxo ye-AI, i-WhatsApp kunye nezicelo ze-API zifaka idatha esiseko.",AF:"Webvorms, KI-kletsbots, WhatsApp en direkte API-indiening voed rou data in die pyplyn.",ST:"Mefuta ya tsebišo, AI chatbot, WhatsApp le dikopo tsa API di kenela data pipeline.",TN:"Diformi tsa wepesaete, AI chatbot, WhatsApp le dikopo tsa API di tshela data mo pipeleng.",SS:"Emafomu ewebhu, ingxoxo ye-AI, i-WhatsApp kanye izicelo ze-API zifaka idatha ku-pipeline.",VE:"Mafomo a vhutshilo, AI chatbot, WhatsApp na zwitatiswa zwa API zwi isa data kha pipeline.",TS:"Mifomu ya wepusayiti, AI chatbot, WhatsApp na swikombelo swa API swi nghenisa data.",NR:"Amafomu wewebhu, ingxoxo ye-AI, i-WhatsApp kanye nezicelo ze-API zifaka idatha.",NS:"Mefomo ya inthanete, AI chatbot, WhatsApp le dikopo tša API di laetša datha go pipeline."},
   tags:[["Lead Capture","rust"],["AI Chat","gold"],["WhatsApp","teal"]]},
  {id:1,icon:"⚡",label:"Trigger\n& Events",dark:false,badge:"Routing Layer",signal:5,
   get industry(){return Object.fromEntries(Object.entries(IND).map(([k,v])=>[k,v.s1]));},
   lang:{EN:"Make.com workflows fire on real-time webhooks or schedules. Every record is validated and routed.",ZU:"Imisebenzi ye-Make.com iqala ngama-webhooks esikhathi sangempela. Irekodi ngayinye iqinisekiswa.",XH:"Iinkqubo ze-Make.com ziqala kwi-webhooks zexesha lokwenyani. Irekhodi nganye iqinisekiswa.",AF:"Make.com-werkvloeie aktiveer op intydse webhooks of skedules. Elke rekord word gevalideer.",ST:"Mesebetsi ya Make.com e thoma ho webhooks tsa nako ya nnete. Rekoto e nngwe le e nngwe e netefatswa.",TN:"Mešomo ya Make.com e simolola go webhooks tsa nako ya gone. Rekoto nngwe le nngwe e netefatswa.",SS:"Imisebenzi ye-Make.com iqala ema-webhooks. Irekodi ngayinye iqinisekiswa futsi iyatiwa.",VE:"Mishumo ya Make.com i thoma kha webhooks dza tshifhinga tsha zwino. Rekodo i rekhiwa.",TS:"Misava ya Make.com yi sungula eka webhooks. Rekodi yin'wana na yin'wana yi ringanyetwa.",NR:"Imisebenzi ye-Make.com iqala kuwebhooks. Irekodi ngayinye iqinisekiswa bese iyatiwa.",NS:"Mešomo ya Make.com e thoma go webhooks tša nako ya bjale. Rekoto ye nngwe le ye nngwe e netefatšwa."},
   tags:[["Workflow Auto","gold"],["Event Triggers","rust"],["Real-time","teal"]]},
  {id:2,icon:"🗄️",label:"Data\nStorage",dark:true,badge:"Memory Layer",signal:4,
   get industry(){return Object.fromEntries(Object.entries(IND).map(([k,v])=>[k,v.s2]));},
   lang:{EN:"Validated records land in the CRM and database. Each lead gets a unique business reference number.",ZU:"Amarekhodi aqinisekisiwe afika ku-CRM nasedatabhasini. Ikheli ngalinye lithole inombolo eyodwa.",XH:"Iirekhodi eziqinisekisiweyo zifika kwi-CRM kunye nedatabase. Ikheli ngalinye lifumana inombolo.",AF:"Gevalideerde rekords land in die CRM en databasis. Elke lood kry 'n unieke verwysingsnommer.",ST:"Direkoto tse netefaditsweng di fihla CRM le database. Khothaletso e nngwe le e nngwe e fumana nomoro.",TN:"Direkoto tse netefetsweng di fika CRM le database. Khothatso nngwe le nngwe e bona nomoro.",SS:"Emarekodi laqinisekisiwe afika ku-CRM nasedatabase. Ikheli ngalinye litfola inombolo eyodwa.",VE:"Rekodo dzi rekhiwaho dzi swika kha CRM na database. Ṱhoho i nngwe na i nngwe i wana nomboro.",TS:"Tirekodi leti ringanyweke ti fika eka CRM na database. Swikhombo swin'wana na swin'wana swi wana nomboro.",NR:"Amarekodi aqinisekisiwe afika ku-CRM nasedatabase. Ikheli ngalinye litfola inombolo eyodwa.",NS:"Direkoto tše netefaditšwego di fihla CRM le database. Khothalo ye nngwe le ye nngwe e hwetša nomoro."},
   tags:[["CRM Logging","rust"],["Lead Tracking","teal"],["Reference IDs","gold"]]},
  {id:3,icon:"🤖",label:"AI\nEngine",dark:false,badge:"Brain Layer",signal:5,
   get industry(){return Object.fromEntries(Object.entries(IND).map(([k,v])=>[k,v.s3]));},
   lang:{EN:"Gemini AI scores leads, classifies intent and generates personalised outreach copy automatically.",ZU:"I-Gemini AI ihlola amakheli, ihlukanisa inhloso futhi yakha umlayezo wokufinyelela owahlukiwe.",XH:"I-Gemini AI iphonononga amakheli, ihlela injongo kwaye iyenza imiyalezo yokufikelela.",AF:"Gemini KI punte leidrade, klassifiseer bedoeling en genereer gepersonaliseerde boodskappe.",ST:"Gemini AI e lekanya dikhothaletso, e hlophisa merero le ho theha melaetsa ya botho.",TN:"Gemini AI e batlisisa dikhothatso, e hlophisa maikaelelo le go bopa melaetsa ya motho.",SS:"I-Gemini AI ihlola amakheli, ihlukanisa inhloso futsi yakha umlayezo wokufinyelela.",VE:"Gemini AI i vhiga mahosi, i khetha ndivhuwo na u bumba mafhungo a u thikhedza.",TS:"Gemini AI yi kambela swi fikeleleki, yi hlawula xiyimo na ku bumba mhaka ya ndhawulo.",NR:"I-Gemini AI ihlola amakheli, ihlukanisa inhloso futhi yakha umlayezo wokufinyelela.",NS:"Gemini AI e lekanya dikhothatso, e hlophisa maikaelelo le go bopa melaetsa ya motho."},
   tags:[["Lead Scoring","gold"],["AI Classify","teal"],["Content Gen","rust"]]},
  {id:4,icon:"🔁",label:"Automation\nNode",dark:true,badge:"Action Layer",signal:4,
   get industry(){return Object.fromEntries(Object.entries(IND).map(([k,v])=>[k,v.s4]));},
   lang:{EN:"Enriched data writes back to CRM with AI scores. Booking confirmations fire automatically.",ZU:"Idatha enokulengwa ibhala ku-CRM ngamaphuzu e-AI. Iziqinisekiso zokubhukha ziqala ngokuzenzakalela.",XH:"Idatha ephiwe amaphuzu ibhala kwi-CRM. Iziqinisekiso zebhukhu ziqala ngokuzenzekelayo.",AF:"Verrykte data skryf terug na CRM met KI-tellings. Besprekingsbevestigings brand outomaties.",ST:"Data e eketsehileng e ngola CRM ka dipalo tsa AI. Ditlhomamiso tsa poloko di thoma ka ho zithata.",TN:"Data e e tlhoatsitsweng e kwala CRM ka dipalo tsa AI. Ditlhomamiso tsa poloko di simolola ka bo tsona.",SS:"Idatha lehlabiweko ibhala ku-CRM ngemaphuzu e-AI. Tiqinisekiso tekubhukha tiqala ngekwendzeka.",VE:"Data i nnzhi i nwala kha CRM na maipfi a AI. Vhunekhedzwa ha u bukha vhu thoma nga u tshene.",TS:"Data leyi kuleke yi tsala eka CRM na tiphuzu ta AI. Swipimelo swa ku buka swi sungula swo tshena.",NR:"Idatha enokulengwa ibhala ku-CRM ngemaphuzu e-AI. Iziqinisekiso zokubhukha ziqala ngokwendzeka.",NS:"Datha ye e okeditšwego e ngwala CRM ka dipalo tša AI. Ditlhomamiso tša poloko di thoma ka bo tšona."},
   tags:[["CRM Writeback","rust"],["Booking Flows","gold"],["Email Sequences","teal"]]},
  {id:5,icon:"📊",label:"Live\nDashboard",dark:false,badge:"Output Layer",signal:5,isFinal:true,
   get industry(){return Object.fromEntries(Object.entries(IND).map(([k,v])=>[k,v.s5]));},
   lang:{EN:"Real-time visibility over leads, pipeline health and conversion rates via live dashboard.",ZU:"Ukubona kwesikhathi sangempela phezu kwamakheli, impilo yepayipi kanye nezinga lokuguqulwa.",XH:"Ukubona kwexesha lokwenyani phezu kwamakheli, impilo yepayipi kunye namaphepha oguqulelo.",AF:"Intydse sigbaarheid oor leidrade, pyplyn gesondheid en omskakelingsyfers via lewendige dashboard.",ST:"Pono ya nako ya nnete ho dikhothaletso, bophelo ba pipeline le diperesente tsa phetoho.",TN:"Paono ya nako ya gone go dikhothatso, boitekanelo jwa pipeline le diperesente tsa phetoho.",SS:"Kubona kwesikhashana kwe-real-time phezu kwamakheli, empilo ye-pipeline ne-conversion rates.",VE:"U vhona ha tshifhinga tsha zwino kha mahosi, vupo ha pipeline na ndivhuwo ya u shandukisa.",TS:"Ku vona ka nkarhi wa zwino eka swi fikeleleki, vulavuleri bya pipeline na maphersente ya ku hundzulukela.",NR:"Kubona kwesikhashana kwe-real-time phezu kwamakheli, nempilo ye-pipeline ne-conversion rates.",NS:"Go bona ga nako ya bjale go dikhothatso, bophelo bja pipeline le diperesente tša phetoho."},
   tags:[["Live Dashboard","gold"],["Analytics","teal"],["Client Delivery","rust"]]},
];

// ── Canvas helpers ─────────────────────────────────────────────────────────────
function rrect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
function bezPts(ax,ay,bx,by,n=22){const mx=(ax+bx)/2,my=(ay+by)/2-Math.abs(bx-ax)*0.1;return Array.from({length:n+1},(_,i)=>{const t=i/n;return{x:(1-t)*(1-t)*ax+2*(1-t)*t*mx+t*t*bx,y:(1-t)*(1-t)*ay+2*(1-t)*t*my+t*t*by};});}

class Particle{
  constructor(path,delay){this.path=path;this.t=-(delay||0);this.speed=0.013+Math.random()*0.007;this.color=[C.gold,C.rust,C.teal][Math.floor(Math.random()*3)];this.r=3+Math.random()*1.5;}
  tick(){this.t+=this.speed;if(this.t>1)this.t=-0.05-Math.random()*0.08;}
  draw(ctx){if(this.t<0)return;const tt=Math.min(this.t,1);const seg=(this.path.length-1)*tt;const i=Math.min(Math.floor(seg),this.path.length-2);const f=seg-i;const px=this.path[i].x+(this.path[i+1].x-this.path[i].x)*f;const py=this.path[i].y+(this.path[i+1].y-this.path[i].y)*f;const op=tt<0.08?tt/0.08:tt>0.92?(1-tt)/0.08:1;ctx.globalAlpha=op*0.92;ctx.beginPath();ctx.arc(px,py,this.r,0,Math.PI*2);ctx.fillStyle=this.color;ctx.fill();ctx.globalAlpha=1;}
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
  z-index:9999;
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
.ink-ind-btn{
  display:flex;align-items:center;gap:8px;
  background:rgba(58,158,126,.1);
  border:1.5px solid rgba(58,158,126,.35);
  border-radius:10px;
  padding:9px 14px;
  cursor:pointer;
  font-size:13px;font-weight:600;
  color:#3A9E7E;
  font-family:"DM Sans",sans-serif;
  transition:background .2s,border-color .2s;
  width:100%;
  min-height:44px;
}
.ink-ind-btn:hover{background:rgba(58,158,126,.18);border-color:rgba(58,158,126,.6);}
.ink-ind-drop{
  position:absolute;top:calc(100% + 8px);left:0;right:0;
  z-index:9999;
  background:#0d1e38;
  border:1.5px solid rgba(58,158,126,.28);
  border-radius:12px;
  padding:6px;
  max-height:260px;overflow-y:auto;
  box-shadow:0 16px 48px rgba(0,0,0,.8);
}
.ink-ind-drop::-webkit-scrollbar{width:4px;}
.ink-ind-drop::-webkit-scrollbar-thumb{background:rgba(58,158,126,.2);border-radius:2px;}
.ink-ind-item{
  display:flex;align-items:center;gap:9px;
  padding:9px 12px;border-radius:8px;
  cursor:pointer;font-size:12px;
  transition:background .15s;
}
.ink-ind-item:hover{background:rgba(58,158,126,.1);}
.ink-ind-item.active{background:rgba(58,158,126,.15);color:#3A9E7E;}
@media(max-width:600px){
  .ink-ctrl-panel{
    grid-template-columns:1fr;
    grid-template-rows:auto 1px auto;
  }
  .ink-ctrl-divider{
    width:auto;height:1px;
    grid-column:1;
  }
  .ink-ctrl-col{padding:12px 14px;}
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

function IndustrySelector({activeIndustry,onSelect}){
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  const cur=INDUSTRIES.find(i=>i.id===activeIndustry)||INDUSTRIES[0];
  useEffect(()=>{
    const fn=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",fn);
    return()=>document.removeEventListener("mousedown",fn);
  },[]);
  return(
    <div ref={ref} style={{position:"relative",width:"100%"}}>
      <button
        className="ink-ind-btn"
        onClick={()=>setOpen(o=>!o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span style={{fontSize:16}}>{cur.icon}</span>
        <span style={{flex:1,textAlign:"left"}}>{cur.label}</span>
        <span style={{fontSize:11,opacity:.55,transform:open?"rotate(180deg)":"rotate(0deg)",transition:"transform .2s",display:"inline-block"}}>▾</span>
      </button>
      {open&&(
        <div className="ink-ind-drop" role="listbox">
          {INDUSTRIES.map(ind=>(
            <div
              key={ind.id}
              role="option"
              aria-selected={ind.id===activeIndustry}
              className={`ink-ind-item${ind.id===activeIndustry?" active":""}`}
              onClick={()=>{onSelect(ind.id);setOpen(false);}}
              style={{color:ind.id===activeIndustry?C.teal:"rgba(250,246,238,.75)"}}
            >
              <span style={{fontSize:15}}>{ind.icon}</span>
              <span style={{flex:1}}>{ind.label}</span>
              {ind.id===activeIndustry&&<span style={{color:C.teal,fontSize:12}}>✓</span>}
            </div>
          ))}
        </div>
      )}
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
          <a href="https://cal.com/sanele-inkanyezi" target="_blank" rel="noopener noreferrer"
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
  function buildParticles(np){const p=[];for(let i=0;i<STAGES.length-1;i++){const path=bezPts(np[i].x,np[i].y,np[i+1].x,np[i+1].y);for(let k=0;k<5;k++)p.push(new Particle(path,k*0.18));}return p;}

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
    for(let i=0;i<STAGES.length-1;i++){const a=s.nodePos[i],b=s.nodePos[i+1];if(!a||!b)continue;const mx=(a.x+b.x)/2,my=(a.y+b.y)/2-Math.abs(b.x-a.x)*0.1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo(mx,my,b.x,b.y);ctx.strokeStyle="rgba(212,169,106,0.18)";ctx.lineWidth=2.5;ctx.setLineDash([7,6]);ctx.stroke();ctx.setLineDash([]);const t2=0.91;const px2=(1-t2)*(1-t2)*a.x+2*(1-t2)*t2*mx+t2*t2*b.x;const py2=(1-t2)*(1-t2)*a.y+2*(1-t2)*t2*my+t2*t2*b.y;const ang=Math.atan2(b.y-py2,b.x-px2);ctx.save();ctx.translate(b.x,b.y);ctx.rotate(ang);ctx.beginPath();ctx.moveTo(-11,-5);ctx.lineTo(0,0);ctx.lineTo(-11,5);ctx.strokeStyle="rgba(244,185,66,0.55)";ctx.lineWidth=2;ctx.lineJoin="round";ctx.stroke();ctx.restore();}
    s.particles.forEach(p=>{p.tick();p.draw(ctx);});
    const NW=s.W<500?60:68,NH=s.W<500?60:68;
    STAGES.forEach((node,i)=>{if(i!==s.activeNode)drawNode(ctx,node,s.nodePos[i],NW,NH,false,i===s.hoverNode);});
    if(s.activeNode>=0)drawNode(ctx,STAGES[s.activeNode],s.nodePos[s.activeNode],NW,NH,true,false);
    if(s.raf!==null) s.raf=requestAnimationFrame(drawFrame);
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
  function onTouch(e){const t=e.changedTouches[0];const idx=getNodeAt(t.clientX,t.clientY);if(idx>=0){openTooltip(idx===sr.current.activeNode?-1:idx);}}

  useEffect(()=>{
    if(!document.getElementById("ink-dp-css")){const el=document.createElement("style");el.id="ink-dp-css";el.textContent=INJECTED_CSS;document.head.appendChild(el);}
    handleResize();

    // Only run RAF when section is visible — prevents scroll jank
    const observer=new IntersectionObserver(entries=>{
      const s=sr.current;
      if(entries[0].isIntersecting){
        if(!s.raf) s.raf=requestAnimationFrame(drawFrame);
      } else {
        if(s.raf){cancelAnimationFrame(s.raf);s.raf=null;}
      }
    },{threshold:0.01});
    const section=canvasRef.current?.closest("section");
    if(section) observer.observe(section);

    let timer;const onR=()=>{clearTimeout(timer);timer=setTimeout(handleResize,130);};window.addEventListener("resize",onR);
    return()=>{
      const s=sr.current;
      if(s.raf){cancelAnimationFrame(s.raf);s.raf=null;}
      observer.disconnect();
      window.removeEventListener("resize",onR);
    };
  },[drawFrame,handleResize]);

  useEffect(()=>{if(sr.current.activeNode>=0)openTooltip(sr.current.activeNode);},[activeLang,activeIndustry]);

  return(
    <section id="how-it-works" style={{width:"100%",padding:"40px 0",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 16px"}}>
        <div style={{borderRadius:16,overflow:"visible"}}>
          <div style={{height:9,background:S_TOP}}/>
          <div style={{background:C.night,padding:"16px 20px 14px",position:"relative",zIndex:10}}>
            <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:ADINKRA,pointerEvents:"none"}}/>

            {/* Header text */}
            <p style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:4,color:C.sand,textTransform:"uppercase",marginBottom:6,opacity:.8}}>
              How Inkanyezi Works
            </p>
            <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(15px,3vw,20px)",fontWeight:700,color:C.ivory,lineHeight:1.25,margin:"0 0 6px"}}>
              Your business runs on{" "}
              <em style={{fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",color:C.gold,fontSize:"clamp(17px,3.5vw,23px)",fontWeight:300}}>autopilot</em>
            </h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(11px,1.8vw,13px)",color:"rgba(250,246,238,0.55)",lineHeight:1.65,margin:"0 0 12px",maxWidth:560}}>
              Every enquiry — WhatsApp, website, phone or walk-in — is automatically captured, sorted, responded to and tracked. No missed leads. No manual admin. Select your industry below to see exactly how it works for your business.
            </p>

            {/* Interaction hint */}
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(244,185,66,.1)",border:"1px solid rgba(244,185,66,.25)",borderRadius:20,padding:"4px 12px",marginBottom:12}}>
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
                <IndustrySelector activeIndustry={activeIndustry} onSelect={setActiveIndustry}/>
              </div>

            </div>
          </div>
          <div style={{height:6,background:S_KEN}}/>
          <div ref={wrapRef} style={{position:"relative",width:"100%",background:C.night}}>
            <canvas ref={canvasRef} style={{display:"block",width:"100%",height:"auto",touchAction:"manipulation"}} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave} onTouchEnd={onTouch}/>
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
