import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarqueeBar from "@/components/MarqueeBar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BarChart3, Target, TrendingUp, Search, Sparkles, Shield, Clock } from "lucide-react";

const Features = () => {
  const mainFeatures = [
    {
      icon: Search,
      title: "Keyword Optimization",
      description: "AI continuously scans search terms to identify high-performers and eliminate wasteful spend. Get keyword suggestions that actually drive conversions.",
      benefits: ["Automatic negative keyword detection", "Search term analysis", "Bid recommendations"],
    },
    {
      icon: Sparkles,
      title: "Creative Generation",
      description: "Generate high-converting ad creatives with AI. From copy to visuals, create ads that resonate with your audience.",
      benefits: ["AI-powered copywriting", "Visual recommendations", "A/B testing suggestions"],
    },
    {
      icon: BarChart3,
      title: "Creative Analysis",
      description: "Deep analysis of your ad creatives with actionable scores. Understand what's working and what needs improvement.",
      benefits: ["CTA effectiveness scoring", "Visual impact analysis", "Copy optimization tips"],
    },
    {
      icon: Target,
      title: "Account Audits",
      description: "Comprehensive 24/7 audits covering every aspect of your ad accounts. Never miss an optimization opportunity.",
      benefits: ["Conversion tracking audit", "Audience health check", "Placement analysis"],
    },
    {
      icon: TrendingUp,
      title: "Budget Reallocation",
      description: "Smart budget distribution across platforms and campaigns. Maximize ROAS by putting money where it works.",
      benefits: ["Cross-platform optimization", "Campaign-level allocation", "Real-time adjustments"],
    },
    {
      icon: Clock,
      title: "Automated Reporting",
      description: "Reports that build themselves. Get insights delivered without spending hours on manual data pulling.",
      benefits: ["Custom dashboards", "Scheduled reports", "Actionable insights"],
    },
  ];

  const integrations = [
    "Google Ads",
    "Meta Ads",
    "LinkedIn Ads",
    "TikTok Ads",
    "Amazon Ads",
    "Microsoft Ads",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight mb-6 slide-up">
            Powerful <span className="text-accent">Features</span>
            <br />for Modern Marketers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 fade-in">
            Everything you need to run, optimize, and scale your advertising campaigns with AI assistance.
          </p>
          <Button className="h-12 px-8 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 group">
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border p-8 hover-lift"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <MarqueeBar variant="orange" />

      {/* Integrations */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Works with <span className="text-accent">all major platforms</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12">
            Connect your ad accounts in seconds. Ryze integrates seamlessly with the platforms you already use.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((platform, i) => (
              <div
                key={i}
                className="bg-card rounded-xl border border-border p-6 flex flex-col items-center gap-3 hover-lift"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Zap className="w-6 h-6 text-muted-foreground" />
                </div>
                <span className="font-medium text-sm">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Enterprise-grade security
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              Your data is protected with industry-leading security measures. SOC 2 compliant, GDPR ready, and trusted by Fortune 500 companies.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {["SOC 2 Type II", "GDPR Compliant", "256-bit Encryption", "SSO Support"].map((badge, i) => (
                <div key={i} className="px-4 py-2 rounded-full border border-primary-foreground/20 text-sm">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
