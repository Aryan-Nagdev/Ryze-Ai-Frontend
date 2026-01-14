import { motion } from "framer-motion";

interface MarqueeBarProps {
  variant?: "orange" | "gray";
  className?: string;
}

const stats = [
  "2000+ CLIENTS",
  "700+ AGENCIES",
  "23+ COUNTRIES",
  "$500M+ AD SPEND MANAGED",
];

const MarqueeBar = ({ variant = "orange", className = "" }: MarqueeBarProps) => {
  const bgColor = variant === "orange" ? "bg-accent" : "bg-primary";
  const textColor = "text-accent-foreground";

  const content = stats.map((stat, i) => (
    <span key={i} className="flex items-center gap-6">
      <span className="font-bold text-sm tracking-wide whitespace-nowrap">{stat}</span>
      <span className="w-2 h-2 rounded-full bg-accent-foreground/50" />
    </span>
  ));

  return (
    <div className={`${bgColor} ${textColor} py-4 overflow-hidden ${className}`}>
      <motion.div 
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          x: { 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }
        }}
      >
        <div className="flex items-center gap-8 pr-8">
          {content}
          {content}
          {content}
          {content}
        </div>
        <div className="flex items-center gap-8 pr-8">
          {content}
          {content}
          {content}
          {content}
        </div>
      </motion.div>
    </div>
  );
};

export default MarqueeBar;
