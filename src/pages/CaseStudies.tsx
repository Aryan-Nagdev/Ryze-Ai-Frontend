import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarqueeBar from "@/components/MarqueeBar";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      company: "MotifDigital Agence",
      industry: "Digital Marketing Agency",
      logo: "MD",
      challenge: "Struggling to scale ad operations across 50+ client accounts with a small team.",
      solution: "Implemented Ryze AI for automated audits, keyword optimization, and budget reallocation.",
      results: [
        { metric: "+63%", label: "ROAS Improvement" },
        { metric: "5x", label: "Faster Audits" },
        { metric: "$2.1M", label: "Ad Spend Optimized" },
      ],
      quote: "Ryze's AI-driven ads outperform human optimization by a huge margin.",
      author: "Mathilde Biggs, CEO",
    },
    {
      company: "TechFlow Solutions",
      industry: "B2B SaaS",
      logo: "TF",
      challenge: "Wasted 40% of ad budget on underperforming keywords and placements.",
      solution: "Used Ryze's keyword optimization and placement analysis to identify and eliminate waste.",
      results: [
        { metric: "45%", label: "Waste Eliminated" },
        { metric: "+89%", label: "Conversion Rate" },
        { metric: "$180K", label: "Annual Savings" },
      ],
      quote: "We cut our wasted spend dramatically while actually increasing conversions.",
      author: "Elena M., CMO",
    },
    {
      company: "Rivert Global",
      industry: "E-commerce",
      logo: "RG",
      challenge: "Team of 7 spent 60% of time on manual reporting instead of strategy.",
      solution: "Automated all reporting and audit processes with Ryze's AI platform.",
      results: [
        { metric: "80%", label: "Time Saved" },
        { metric: "4x", label: "More Clients" },
        { metric: "+35%", label: "Team Capacity" },
      ],
      quote: "Got back so many hours each week. Finally have bandwidth to focus on strategy.",
      author: "Roger Dunn, Performance Lead",
    },
    {
      company: "Speedy Logistics",
      industry: "Transportation",
      logo: "SL",
      challenge: "New to digital advertising with no in-house expertise.",
      solution: "Onboarded entire team to Ryze in one day with AI handling optimization.",
      results: [
        { metric: "1 Day", label: "Full Onboarding" },
        { metric: "+120%", label: "Lead Volume" },
        { metric: "3.2x", label: "ROAS" },
      ],
      quote: "Got the whole team up and running in a day. Super easy to pick up.",
      author: "Operations Team",
    },
  ];

  const stats = [
    { value: "700+", label: "Agencies Trust Ryze" },
    { value: "$500M+", label: "Ad Spend Managed" },
    { value: "23+", label: "Countries Served" },
    { value: "2000+", label: "Happy Clients" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight mb-6 slide-up">
            Real Results from
            <br /><span className="text-accent">Real Marketers</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 fade-in">
            See how leading agencies and brands use Ryze AI to transform their advertising performance.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-black text-accent">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-12">
            {caseStudies.map((study, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center font-bold text-accent text-lg">
                      {study.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{study.company}</h3>
                      <p className="text-sm text-muted-foreground">{study.industry}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm font-bold text-accent mb-1">Challenge</p>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-accent mb-1">Solution</p>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>
                  </div>

                  <blockquote className="border-l-4 border-accent pl-4 italic text-lg mb-6">
                    "{study.quote}"
                    <footer className="text-sm text-muted-foreground mt-2 not-italic">
                      — {study.author}
                    </footer>
                  </blockquote>
                </div>

                {/* Results Card */}
                <div className={`bg-card rounded-2xl border border-border p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h4 className="font-bold text-lg mb-6">Key Results</h4>
                  <div className="grid grid-cols-3 gap-6">
                    {study.results.map((result, j) => (
                      <div key={j} className="text-center">
                        <p className="text-3xl md:text-4xl font-black text-accent">{result.metric}</p>
                        <p className="text-xs text-muted-foreground mt-1">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <MarqueeBar variant="gray" />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to write your own <span className="text-accent">success story</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Join thousands of marketers who trust Ryze AI to optimize their ad performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="h-12 px-8 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 group">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="h-12 px-8 rounded-full">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
