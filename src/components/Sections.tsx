import { ArrowRight, Check, Zap, BarChart3, Target, TrendingUp, Sparkles, Search, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Scroll to section helper
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Animated SVG Background Lines
const AnimatedBackground = ({ variant = "light" }: { variant?: "light" | "dark" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={variant === "dark" ? "#fff" : "hsl(24, 100%, 50%)"} stopOpacity="0.1" />
            <stop offset="50%" stopColor={variant === "dark" ? "#fff" : "hsl(24, 100%, 50%)"} stopOpacity="0.3" />
            <stop offset="100%" stopColor={variant === "dark" ? "#fff" : "hsl(24, 100%, 50%)"} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${-100 + i * 50},${100 + i * 80} Q${300 + i * 100},${200 + i * 50} ${600 + i * 100},${150 + i * 60} T${1300 + i * 50},${200 + i * 40}`}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="10 10"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1]
            }}
            transition={{
              pathLength: { duration: 2, delay: i * 0.3 },
              opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" },
              pathOffset: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Counter Animation Hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return { count, ref };
};

// Video Hover Card Component
const VideoHoverCard = ({ title, thumbnail, videoUrl }: { title: string; thumbnail?: string; videoUrl?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden bg-muted aspect-video cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"
        animate={{ opacity: isHovered ? 0.3 : 0.6 }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
        <motion.div
          animate={{ scale: isHovered ? 0 : 1, opacity: isHovered ? 0 : 1 }}
          className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center"
        >
          <Play className="w-6 h-6 text-primary ml-1" />
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-4 left-4 z-20"
        animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
      >
        <p className="text-white font-semibold text-sm">{title}</p>
      </motion.div>
      <motion.div
        className="absolute inset-0"
        animate={{ 
          boxShadow: isHovered 
            ? "0 20px 40px rgba(0,0,0,0.3)" 
            : "0 4px 6px rgba(0,0,0,0.1)"
        }}
      />
    </motion.div>
  );
};

// Floating Animation Wrapper
const FloatingCard = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { 
        opacity: 1, 
        y: [0, -10, 0],
      } : {}}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { 
          duration: 4, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut",
          delay: delay + 0.5
        }
      }}
      whileHover={{ 
        y: -15, 
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
};

// Section Reveal Wrapper
const RevealSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Hero Section
export const HeroSection = () => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true });
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleGetStarted = () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Please enter a valid email",
        description: "We need your email to get you started.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Welcome to Ryze! 🚀",
      description: "Check your inbox for next steps.",
    });
    setEmail("");
    scrollToSection("audit-section");
  };

  const headingWords = [
    { text: "LET", color: "text-foreground" },
    { text: "AI MANAGE", color: "text-accent" },
    { text: "YOUR", color: "text-foreground" },
    { text: "ADS", color: "text-accent" },
  ];

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <AnimatedBackground />
      
      <div ref={containerRef} className="container mx-auto px-6 text-center relative z-10">
        {/* Animated Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0 }}
            className="inline-block"
          >
            LET{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-block text-accent"
          >
            AI MANAGE
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block"
          >
            YOUR{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="inline-block text-accent"
          >
            ADS
          </motion.span>
        </h1>

        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Autonomous AI that audits, optimizes, and manages your ad campaigns 24/7. 
          Stop wasting budget. Start scaling results.
        </motion.p>

        {/* Email CTA with animations */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGetStarted()}
            className="h-12 rounded-full px-6 border-border bg-background focus:ring-2 focus:ring-accent focus:border-accent transition-all"
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={handleGetStarted}
              className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 group shadow-lg hover:shadow-xl transition-shadow"
            >
              Get started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Platform Logos */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 opacity-60"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.6 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {["Google Ads", "Meta", "LinkedIn", "TikTok", "Perplexity"].map((platform, i) => (
            <motion.div 
              key={platform} 
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">{platform}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Feature Cards Section with Floating Animation
export const FeatureCardsSection = () => {
  const features = [
    {
      title: "Keyword optimization",
      description: "AI identifies high-performing keywords and removes wasteful spend automatically.",
      icon: Search,
      items: [
        { keyword: "bmw x5 lease...", clicks: 12, cost: "$43", status: "KEYWORD" },
        { keyword: "cheap bmw parts", clicks: 0, cost: "$150", status: "NEGATIVE" },
        { keyword: "2025 bmw i4...", clicks: 8, cost: "$35", status: "KEYWORD" },
        { keyword: "bmw service near", clicks: 15, cost: "$28", status: "Pending" },
      ],
    },
    {
      title: "Creative generation",
      isVideo: true,
      videoTitle: "AI Creative Demo",
    },
    {
      title: "Creative analysis",
      description: "Deep analysis of ad creatives with actionable improvement suggestions.",
      icon: BarChart3,
      metrics: [
        { label: "CTA", score: 45, color: "bg-accent" },
        { label: "Visual", score: 88, color: "bg-green-500" },
        { label: "Copy", score: 65, color: "bg-yellow-500" },
      ],
    },
    {
      title: "Account audits",
      description: "Comprehensive audits identifying issues across conversion, audience, and placement.",
      icon: Target,
      audits: [
        { label: "Conversion", score: "74%", issue: "Secondary actions inflating value" },
        { label: "Audience", score: "81%", issue: "Match lists need updating" },
        { label: "Schedule", score: "63%", issue: "Ads run with zero overnight leads" },
        { label: "Placement", score: "55%", issue: "Low-quality app placements" },
      ],
    },
    {
      title: "Budget reallocation",
      description: "Smart budget distribution across platforms for maximum ROAS.",
      icon: TrendingUp,
      platforms: [
        { name: "LinkedIn", roas: "1.2x", spend: "$502", color: "bg-blue-600" },
        { name: "Snapchat", roas: "2.1x", spend: "$879", color: "bg-yellow-400" },
        { name: "Meta", roas: "4.5x", spend: "$1,883", color: "bg-blue-500" },
        { name: "Google", roas: "5.2x", spend: "$2,176", color: "bg-green-500" },
        { name: "TikTok", roas: "0.8x", spend: "$335", color: "bg-pink-500" },
        { name: "Pinterest", roas: "4.8x", spend: "$2,008", color: "bg-red-500" },
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <FloatingCard
              key={feature.title}
              delay={index * 0.1}
              className={`bg-card rounded-2xl border border-border overflow-hidden ${
                feature.isVideo ? "lg:col-span-1" : index === 4 ? "lg:col-span-1" : ""
              }`}
            >
              {/* Header */}
              <div className="bg-primary text-primary-foreground p-4">
                <h3 className="font-bold text-sm">{feature.title}</h3>
              </div>

              <div className="p-4">
                {/* Video Card */}
                {feature.isVideo && (
                  <VideoHoverCard title={feature.videoTitle || ""} />
                )}

                {/* Keyword Items */}
                {feature.items && (
                  <div className="space-y-2">
                    {feature.items.map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center justify-between text-xs py-2 border-b border-border last:border-0"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="truncate flex-1 text-[11px]">{item.keyword}</span>
                        <span className="text-muted-foreground mx-2">{item.clicks}</span>
                        <span className="text-accent font-medium">{item.cost}</span>
                        <span className={`ml-2 px-2 py-0.5 rounded text-[10px] font-medium ${
                          item.status === "KEYWORD" ? "bg-green-100 text-green-700" :
                          item.status === "NEGATIVE" ? "bg-red-100 text-red-700" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {item.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Metrics */}
                {feature.metrics && (
                  <div className="space-y-3">
                    {feature.metrics.map((metric, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{metric.label}</span>
                          <span className="font-bold">{metric.score}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${metric.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${metric.score}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Audits */}
                {feature.audits && (
                  <div className="space-y-3">
                    {feature.audits.map((audit, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-accent font-bold text-lg">{audit.score}</span>
                        <div>
                          <p className="text-xs font-medium">{audit.label}</p>
                          <p className="text-[10px] text-muted-foreground">{audit.issue}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Platforms */}
                {feature.platforms && (
                  <div className="space-y-2">
                    {feature.platforms.map((platform, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center justify-between text-xs py-1"
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded ${platform.color} flex items-center justify-center`}>
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-[11px]">{platform.roas}</span>
                        </div>
                        <div className="flex-1 mx-2">
                          <motion.div 
                            className={`h-1.5 ${platform.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-muted-foreground text-[11px]">{platform.spend}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// Comparison Section
export const ComparisonSection = () => {
  const { toast } = useToast();

  const handleApply = (action: string, savings: string) => {
    toast({
      title: "Action Applied! ✅",
      description: `${action.slice(0, 50)}... Expected savings: ${savings}`,
    });
  };

  const autonomousFeatures = [
    "24/7 performance audits",
    "AI creative generation",
    "Suggests tweaks to improve ROAS",
  ];

  const chatGPTQuestions = [
    '"How can I improve ROAS?"',
    '"What are my best-performing assets?"',
    '"Which campaigns are wasting spend?"',
  ];

  const actionItems = [
    { action: "Pause 27 queries burning $1.8k with 0 conversions (30d)", savings: "+$2.5k/mo", status: "Applied" },
    { action: "Split Brand (ROAS 6.2) from Non-Brand (ROAS 1.6); separate...", savings: "+$3.7k/mo", status: "Applied" },
    { action: 'Isolate "project management software" ($3.4k, ROAS 0.9); ow...', savings: "+$5.8k/mo", status: "Applied" },
    { action: "Raise cap on Brand US (Lost IS Budget 62%, ROAS 9.1)", savings: "+$3.2k/mo", status: "Apply" },
    { action: 'Add 85 negatives ("jobs", "free", "tutorial") to block waste ter...', savings: "+$4.6k/mo", status: "Apply" },
  ];

  return (
    <RevealSection className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Autonomous AI */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              <span className="text-accent">Autonomous</span> AI
              <br />marketer
            </h2>

            <ul className="space-y-3 mb-8">
              {autonomousFeatures.map((feature, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-muted-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Action Items */}
            <div className="space-y-3">
              {actionItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center bg-card rounded-lg p-3 sm:p-4 border border-border hover:border-accent transition-colors gap-2 sm:gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${item.status === "Applied" ? "bg-green-500" : "bg-accent"}`} />
                  <span className="text-xs sm:text-sm flex-1 min-w-0 truncate">{item.action}</span>
                  <span className="text-accent font-bold text-xs sm:text-sm whitespace-nowrap shrink-0">{item.savings}</span>
                  <Button 
                    size="sm" 
                    variant={item.status === "Applied" ? "default" : "outline"}
                    className={`shrink-0 rounded-full text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8 ${item.status === "Applied" ? "bg-green-500 hover:bg-green-600" : ""}`}
                    onClick={() => item.status !== "Applied" && handleApply(item.action, item.savings)}
                  >
                    {item.status}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ChatGPT Style */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              ChatGPT for
              <br /><span className="text-muted-foreground">paid ads</span>
            </h2>

            <ul className="space-y-3 mb-8">
              {chatGPTQuestions.map((question, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                  <span className="text-muted-foreground">{question}</span>
                </motion.li>
              ))}
            </ul>

            {/* Chat Interface Mock */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <motion.div 
                className="bg-muted rounded-lg p-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-muted-foreground">
                  CPAs rose 22% and CVR fell in prospecting; top videos show clear fatigue.
                </p>
              </motion.div>
              <motion.div 
                className="flex justify-end"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-accent text-accent-foreground rounded-full px-4 py-2">
                  <p className="text-sm font-medium">Where is budget wasted?</p>
                </div>
              </motion.div>
              <motion.div 
                className="bg-muted rounded-lg p-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-muted-foreground">
                  Spend leaks in broad interests and low-quality placements. Move budget to intent-driven audiences.
                </p>
              </motion.div>
              <div className="relative">
                <Input
                  placeholder="Which campaigns sh..."
                  className="rounded-full border-border pr-12"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-accent rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </RevealSection>
  );
};

// Testimonials Section with Counter Animation
export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "We were drowning with 7 people. Got back so many hours each week from reporting. Finally have bandwidth to focus on actual strategy.",
      author: "Roger Dunn",
      role: "Global Performance Lead - Rivert",
      highlight: "actual strategy",
    },
    {
      quote: "Found wasted spend in search terms we'd never have caught manually. Cut those, reallocated budget. ROAS up 45%.",
      author: "Daniel Roser",
      role: "Marketing Director",
      rating: 5,
    },
    {
      quote: "Our agency does audits for potential clients 5x faster now. Used to take days, now it's like an hour. Way easier to win new business.",
      author: "Gabriela K.",
      role: "Agency Owner",
    },
    {
      quote: "Broke down performance by asset—thumbnails, headlines, everything. Suggested swaps based on real data. Our CTR basically doubled.",
      author: "Daniel Amezquita",
      role: "Global Ads Strategy - Glava",
    },
  ];

  const roas = useCounter(63, 2000);
  const faster = useCounter(5, 1500);
  const improvement = useCounter(45, 2000);

  return (
    <RevealSection className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-black text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Wall of <span className="text-accent">Love</span> ❤️
        </motion.h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          See why thousands of marketers trust Ryze to manage their ad spend
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="bg-card rounded-2xl border border-border p-6 hover:border-accent transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              {testimonial.rating && (
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              )}
              <div>
                <p className="font-bold text-sm">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big Quote */}
        <motion.div 
          className="mt-12 bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xl md:text-2xl font-bold mb-4">
            "RYZE'S AI-DRIVEN ADS OUTPERFORM HUMAN OPTIMIZATION BY A HUGE MARGIN."
          </p>
          <p className="text-primary-foreground/70">
            MATHILDE BIGGS, CEO MOTIFDIGITAL AGENCE
          </p>
        </motion.div>

        {/* Stats with Counter Animation */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div ref={roas.ref}>
            <p className="text-4xl md:text-5xl font-black text-accent">+{roas.count}%</p>
            <p className="text-sm text-muted-foreground mt-2">better ROAS after switching to AI agents</p>
          </div>
          <div ref={faster.ref}>
            <p className="text-4xl md:text-5xl font-black">{faster.count}x</p>
            <p className="text-sm text-muted-foreground mt-2">faster audit completion</p>
          </div>
          <div ref={improvement.ref}>
            <p className="text-4xl md:text-5xl font-black">{improvement.count}%</p>
            <p className="text-sm text-muted-foreground mt-2">average ROAS improvement</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-black text-accent">24/7</p>
            <p className="text-sm text-muted-foreground mt-2">autonomous optimization</p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

// Audit CTA Section with Animated Background
export const AuditCTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [auditEmail, setAuditEmail] = useState("");
  const { toast } = useToast();

  const handleAudit = () => {
    if (!auditEmail || !auditEmail.includes("@")) {
      toast({
        title: "Please enter a valid email",
        description: "We need your work email to run the audit.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Audit Started! 🔍",
      description: "We're analyzing your ad accounts. Results will be in your inbox within 24 hours.",
    });
    setAuditEmail("");
  };

  return (
    <section ref={ref} id="audit-section" className="relative py-16 md:py-24 overflow-hidden">
      <AnimatedBackground />
      
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5"
        animate={{ 
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 100%" }}
      />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Audit your <span className="text-accent">ad account</span> instantly.
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Get a comprehensive AI-powered audit of your advertising accounts in minutes, not days.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="name@company.com"
              value={auditEmail}
              onChange={(e) => setAuditEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAudit()}
              className="h-12 pl-12 rounded-full border-border bg-background focus:ring-2 focus:ring-accent focus:border-accent transition-all"
            />
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(255, 128, 0, 0)",
                "0 0 20px 5px rgba(255, 128, 0, 0.3)",
                "0 0 0 0 rgba(255, 128, 0, 0)"
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          >
            <Button 
              onClick={handleAudit}
              className="h-12 px-8 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 group"
            >
              <Zap className="mr-2 h-4 w-4" />
              Audit Account
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// AI Marketer Features Section
export const AIMarketerSection = () => {
  const features = [
    {
      title: "Set up and launch campaigns",
      description: "Automated campaign creation with best practices built-in. From targeting to bidding, we handle the heavy lifting.",
      icon: Target,
    },
    {
      title: "Suggest what to fix and optimize",
      description: "Real-time recommendations based on performance data. Never miss an optimization opportunity again.",
      icon: TrendingUp,
    },
    {
      title: "Reports that build themselves",
      description: "Automated reporting with insights that matter. Save hours on manual reporting every week.",
      icon: BarChart3,
    },
  ];

  return (
    <RevealSection className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-black text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          An <span className="text-accent">AI marketer</span> that does it all for you
        </motion.h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Stop juggling multiple tools. Ryze handles everything from campaign setup to optimization to reporting.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-card rounded-2xl border border-border p-8 group hover:border-accent transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <motion.div 
                className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <feature.icon className="w-6 h-6 text-accent" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
};

// Client Logos Section with Marquee
export const ClientLogosSection = () => {
  const clients = ["Speedy", "TETRA", "WILLYX", "caleyx", "direcly", "HG", "MOS", "Motif", "PUPIL", "Ritmo"];

  return (
    <section className="py-12 border-y border-border overflow-hidden">
      <div className="relative">
        <motion.div 
          className="flex items-center gap-16 md:gap-24"
          animate={{ x: [0, -1000] }}
          transition={{ 
            x: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
        >
          {[...clients, ...clients, ...clients].map((client, i) => (
            <motion.span
              key={i}
              className="text-2xl md:text-3xl font-bold text-muted-foreground/40 hover:text-muted-foreground transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.1 }}
            >
              {client}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
