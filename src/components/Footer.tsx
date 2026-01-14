import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Animated SVG Background Lines for Footer
const FooterAnimatedLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="absolute w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        {[...Array(8)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${-200 + i * 100},${50 + i * 40} Q${200 + i * 80},${150 + i * 30} ${500 + i * 80},${100 + i * 50} T${1400},${150 + i * 30}`}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
            strokeDasharray="8 8"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
              pathOffset: [0, 1]
            }}
            transition={{
              pathLength: { duration: 2, delay: i * 0.2 },
              opacity: { duration: 4, repeat: Infinity, repeatType: "reverse" },
              pathOffset: { duration: 25, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [footerEmail, setFooterEmail] = useState("");
  const { toast } = useToast();

  const handleFooterSubmit = () => {
    if (!footerEmail || !footerEmail.includes("@")) {
      toast({
        title: "Please enter a valid email",
        description: "We need your email to get started.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "You're in! 🎉",
      description: "Welcome aboard. Check your inbox for next steps.",
    });
    setFooterEmail("");
  };

  const footerLinks = [
    { name: "LinkedIn", path: "https://linkedin.com" },
    { name: "Privacy", path: "/privacy" },
    { name: "Terms", path: "/terms" },
  ];

  return (
    <footer ref={ref} className="relative bg-accent text-accent-foreground py-20 overflow-hidden">
      <FooterAnimatedLines />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Cards */}
          <div className="space-y-6">
            {/* Manages all accounts card */}
            <motion.div
              className="bg-primary/20 backdrop-blur-sm rounded-xl p-4 max-w-xs"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-sm font-semibold mb-3">Manages all your accounts</p>
              <div className="flex gap-3">
                <motion.div 
                  className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-white font-bold">$</span>
                </motion.div>
                <motion.div 
                  className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <span className="text-white font-bold">📊</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Creatives optimization card */}
            <motion.div
              className="bg-primary/20 backdrop-blur-sm rounded-xl p-4 max-w-xs"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-sm font-semibold mb-3">Creatives optimization</p>
              <div className="flex gap-2">
                <div className="flex-1 h-20 bg-white/20 rounded-lg" />
                <div className="flex-1 h-20 bg-white/30 rounded-lg flex items-center justify-center">
                  <span className="text-xs">INCREASING</span>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="flex-1 bg-white/10 rounded-full py-1 text-xs">STOP</button>
                <button className="flex-1 bg-white rounded-full py-1 text-xs text-primary">INCREASE BUDGET</button>
              </div>
            </motion.div>

            {/* ROAS improvements card */}
            <motion.div
              className="bg-primary/20 backdrop-blur-sm rounded-xl p-4 max-w-xs"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-sm font-semibold mb-3">24/7 ROAS improvements</p>
              <div className="bg-white/10 rounded-lg p-3 mb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Pause 27 Burning Queries</span>
                  <span className="text-xs text-green-300">+$1.8k</span>
                </div>
                <p className="text-[10px] opacity-70 mt-1">0 conversions (30d)</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">MONTHLY IMPACT</span>
                <span className="font-bold bg-white/20 px-3 py-1 rounded-full text-sm">$171,900 ...</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Stats & CTA */}
          <div className="lg:pl-12">
            {/* Stats */}
            <div className="flex gap-4 mb-8">
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-xs opacity-70">ROAS</p>
                <p className="text-3xl font-black">3.1x</p>
              </motion.div>
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p className="text-xs opacity-70">CPA</p>
                <p className="text-3xl font-black">$23.4</p>
              </motion.div>
            </div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-xs tracking-widest mb-2 opacity-70">● NEXT GEN OF MARKETING</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Let AI<br />
                Run Your<br />
                Ads
              </h2>
            </motion.div>

            {/* Email Input */}
            <motion.div
              className="relative max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Input
                type="email"
                placeholder="work@email.com"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFooterSubmit()}
                className="h-12 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-12"
              />
              <motion.button
                onClick={handleFooterSubmit}
                className="absolute right-1 top-1 w-10 h-10 bg-white rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight className="w-5 h-5 text-accent" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Links */}
        <motion.div 
          className="flex flex-wrap items-center justify-between gap-4 mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex flex-wrap items-center gap-4 text-sm opacity-70">
            {footerLinks.map((link, i) => (
              <span key={link.name} className="flex items-center gap-4">
                <Link to={link.path} className="hover:opacity-100 transition-opacity">
                  {link.name}
                </Link>
                {i < footerLinks.length - 1 && <span className="opacity-50">|</span>}
              </span>
            ))}
            <span className="opacity-50">|</span>
            <span>CONTACT US: HELLO@GET-RYZE.AI</span>
          </div>
          <p className="text-sm opacity-70">
            CRAFTED IN SAN FRANCISCO
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
