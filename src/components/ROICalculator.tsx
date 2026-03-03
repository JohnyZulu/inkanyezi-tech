import { useState, useEffect, useRef, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Calculator, ShieldCheck, Globe, MessageCircle, Wrench, Building2, HeartPulse, Home, ShoppingBag, Briefcase } from "lucide-react";

// Industry presets: [staff, hoursWasted, hourlyCost, missedLeads, dealValue]
const INDUSTRY_PRESETS: Record<string, { label: string; icon: typeof Wrench; values: [number, number, number, number, number] }> = {
  plumbing: { label: "Plumbing / Trade", icon: Wrench, values: [8, 2, 120, 25, 3500] },
  construction: { label: "Construction", icon: Building2, values: [15, 3, 150, 15, 18000] },
  healthcare: { label: "Healthcare", icon: HeartPulse, values: [12, 2.5, 180, 30, 2500] },
  property: { label: "Property", icon: Home, values: [10, 2, 200, 20, 25000] },
  retail: { label: "Retail", icon: ShoppingBag, values: [20, 1.5, 80, 40, 1500] },
  professional: { label: "Professional Services", icon: Briefcase, values: [6, 3, 250, 10, 12000] },
};

const INKANYEZI_ANNUAL_COST = 72000;

function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<number | null>(null);
  const startRef = useRef(display);

  useEffect(() => {
    const start = startRef.current;
    const diff = value - start;
    if (Math.abs(diff) < 1) {
      setDisplay(value);
      startRef.current = value;
      return;
    }
    const duration = 500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + diff * eased;
      setDisplay(current);
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      } else {
        startRef.current = value;
      }
    };

    ref.current = requestAnimationFrame(animate);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value]);

  const formatted = display < 0 ? `-${prefix}${Math.abs(display).toLocaleString("en-ZA", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}` : `${prefix}${display.toLocaleString("en-ZA", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;

  return <span className="font-syne tabular-nums">{formatted}{suffix}</span>;
}

function getInsight(staff: number, hours: number, cost: number, missed: number, dealValue: number) {
  const adminWaste = staff * hours * cost * 22 * 12;
  const leadWaste = missed * dealValue * 12;

  if (leadWaste > adminWaste) {
    return `Slow lead response is your biggest cost driver — missed leads are costing you R${Math.round(leadWaste).toLocaleString("en-ZA")} per year. Automating WhatsApp responses alone could recover most of this.`;
  }
  if (hours >= 3) {
    return `Your team spends ${hours} hours per person daily on admin — that's ${Math.round(staff * hours * 22)} person-hours per month that automation could give back to revenue-generating work.`;
  }
  return `Between admin overhead and missed leads, you're leaving R${Math.round(adminWaste + leadWaste).toLocaleString("en-ZA")} on the table annually. Even a 50% improvement transforms your bottom line.`;
}

const ROICalculator = () => {
  const [staff, setStaff] = useState(10);
  const [hours, setHours] = useState(2);
  const [hourlyCost, setHourlyCost] = useState(150);
  const [missedLeads, setMissedLeads] = useState(20);
  const [dealValue, setDealValue] = useState(5000);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const applyPreset = useCallback((key: string) => {
    const [s, h, c, m, d] = INDUSTRY_PRESETS[key].values;
    setStaff(s); setHours(h); setHourlyCost(c); setMissedLeads(m); setDealValue(d);
    setActivePreset(key);
  }, []);

  const clearPreset = () => setActivePreset(null);

  // Calculations
  const annualAdminWaste = staff * hours * hourlyCost * 22 * 12;
  const annualLeadWaste = missedLeads * dealValue * 12;
  const totalAnnualWaste = annualAdminWaste + annualLeadWaste;
  const wasteEliminated = totalAnnualWaste * 0.7; // 70% automation efficiency
  const netAnnualSaving = wasteEliminated - INKANYEZI_ANNUAL_COST;
  const roiPercentage = (netAnnualSaving / INKANYEZI_ANNUAL_COST) * 100;
  const paybackMonths = wasteEliminated > 0 ? Math.max(1, Math.ceil(INKANYEZI_ANNUAL_COST / (wasteEliminated / 12))) : 99;
  const monthlySaving = netAnnualSaving / 12;

  const insight = getInsight(staff, hours, hourlyCost, missedLeads, dealValue);

  return (
    <section id="roi-calculator" className="section-padding relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(17, 100%, 60%), transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(40, 89%, 61%), transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
            <Calculator className="w-4 h-4 text-accent" />
            <span className="text-sm font-technical text-accent">ROI Calculator</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            See What Inefficiency Is{" "}
            <span className="gradient-gold-text">Really Costing You</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Adjust the sliders to match your business. All figures are in South African Rands.
          </p>
        </div>

        {/* Industry Quick-Fill */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.entries(INDUSTRY_PRESETS).map(([key, { label, icon: Icon }]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-technical transition-all duration-300 border ${
                activePreset === key
                  ? "bg-accent text-accent-foreground border-accent shadow-[0_0_16px_hsl(17,100%,60%,0.3)]"
                  : "border-border bg-secondary/50 text-muted-foreground hover:border-accent/50 hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Sliders Panel */}
          <div className="lg:col-span-3 space-y-8 p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
            {/* Slider 1: Staff */}
            <SliderBlock
              label="Staff doing manual admin / WhatsApp"
              value={staff}
              min={1}
              max={50}
              step={1}
              unit=" people"
              onChange={(v) => { setStaff(v); clearPreset(); }}
              helper="Count anyone answering calls, replying on WhatsApp, doing scheduling, quoting, or follow-ups manually."
              benchmark="SA benchmark: SMEs typically have 5–15 people in admin-heavy roles."
            />

            {/* Slider 2: Hours wasted */}
            <SliderBlock
              label="Hours wasted per person per day"
              value={hours}
              min={0.5}
              max={8}
              step={0.5}
              unit=" hrs"
              onChange={(v) => { setHours(v); clearPreset(); }}
              helper="Think about time spent copy-pasting info, chasing responses, re-entering data, or switching between apps."
              benchmark="SA benchmark: Most service businesses lose 2–4 hours per person per day to manual tasks."
            />

            {/* Slider 3: Hourly cost */}
            <SliderBlock
              label="Average hourly cost per staff member"
              value={hourlyCost}
              min={50}
              max={500}
              step={10}
              prefix="R"
              onChange={(v) => { setHourlyCost(v); clearPreset(); }}
              helper="Include salary, benefits, and overheads. Divide monthly cost-to-company by ~176 working hours."
              benchmark="SA benchmark: R80–R200/hr for admin staff; R200–R450/hr for skilled professionals."
            />

            {/* Slider 4: Missed leads */}
            <SliderBlock
              label="Leads missed or slow-responded per month"
              value={missedLeads}
              min={0}
              max={100}
              step={1}
              unit=" leads"
              onChange={(v) => { setMissedLeads(v); clearPreset(); }}
              helper="Include leads that went cold, enquiries answered too late, or calls that went to voicemail."
              benchmark="SA benchmark: 30–50% of WhatsApp/web leads go unanswered within the first hour."
            />

            {/* Slider 5: Deal value */}
            <SliderBlock
              label="Average deal / job value"
              value={dealValue}
              min={500}
              max={50000}
              step={500}
              prefix="R"
              onChange={(v) => { setDealValue(v); clearPreset(); }}
              helper="What's one typical sale, job, or contract worth to your business?"
              benchmark="SA benchmark: Trades R1,500–R8,000 per job; Professional services R5,000–R30,000."
            />
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 sticky top-24">
            <div className="rounded-2xl border border-accent/20 bg-card/80 backdrop-blur-sm p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-serif font-bold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Your Results
              </h3>

              <ResultRow label="Total Annual Waste" highlight>
                <AnimatedNumber value={totalAnnualWaste} prefix="R" />
              </ResultRow>

              <ResultRow label="Waste Eliminated (70%)">
                <AnimatedNumber value={wasteEliminated} prefix="R" />
              </ResultRow>

              <ResultRow label="Inkanyezi Annual Cost" subtle>
                <span className="font-syne">R{INKANYEZI_ANNUAL_COST.toLocaleString("en-ZA")}</span>
              </ResultRow>

              <div className="border-t border-border my-2" />

              <ResultRow label="Net Annual Saving" highlight positive={netAnnualSaving > 0}>
                <AnimatedNumber value={netAnnualSaving} prefix="R" />
              </ResultRow>

              <ResultRow label="ROI">
                <AnimatedNumber value={Math.max(0, roiPercentage)} suffix="%" decimals={0} />
              </ResultRow>

              <ResultRow label="Payback Period">
                <AnimatedNumber value={paybackMonths} suffix=" months" decimals={0} />
              </ResultRow>

              <ResultRow label="Monthly Net Saving" positive={monthlySaving > 0}>
                <AnimatedNumber value={monthlySaving} prefix="R" decimals={0} />
              </ResultRow>

              {/* Insight */}
              <div className="rounded-xl bg-accent/5 border border-accent/10 p-4 mt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="text-accent font-semibold">💡 Insight:</span>{" "}
                  {insight}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href="#contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg gradient-gold text-primary-foreground font-semibold text-sm transition-all hover:scale-105 hover:shadow-[0_0_24px_hsl(40,89%,61%,0.3)]"
                >
                  Book Free Demo
                </a>
                <button
                  onClick={() => {
                    const widget = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
                    widget?.click();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-accent/30 text-accent font-semibold text-sm transition-all hover:bg-accent/10 hover:border-accent/60"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with InkanyeziBot
                </button>
              </div>
            </div>

            {/* Trust Bar */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: "🇿🇦", text: "South African Owned" },
                { icon: <ShieldCheck className="w-4 h-4 text-accent" />, text: "POPIA Compliant" },
                { icon: "🤖", text: "Built on Google AI" },
                { icon: <MessageCircle className="w-4 h-4 text-accent" />, text: "WhatsApp-First" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-secondary/30 text-xs font-technical text-muted-foreground">
                  {typeof item.icon === "string" ? <span>{item.icon}</span> : item.icon}
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function SliderBlock({
  label, value, min, max, step, unit, prefix, onChange, helper, benchmark,
}: {
  label: string; value: number; min: number; max: number; step: number;
  unit?: string; prefix?: string; onChange: (v: number) => void;
  helper: string; benchmark: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="font-syne text-lg font-bold text-accent tabular-nums">
          {prefix}{value.toLocaleString("en-ZA")}{unit}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        className="mb-3"
      />
      <p className="text-xs text-muted-foreground leading-relaxed mb-1">{helper}</p>
      <p className="text-xs text-accent/60 italic">📊 {benchmark}</p>
    </div>
  );
}

function ResultRow({
  label, children, highlight, subtle, positive,
}: {
  label: string; children: React.ReactNode; highlight?: boolean; subtle?: boolean; positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${subtle ? "text-muted-foreground/60" : "text-muted-foreground"}`}>{label}</span>
      <span className={`text-lg font-bold ${highlight ? (positive === false ? "text-destructive" : "gradient-gold-text") : positive ? "text-green-400" : "text-foreground"}`}>
        {children}
      </span>
    </div>
  );
}

export default ROICalculator;
