import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { MapPin, Users, Building2, CheckCircle2 } from "lucide-react";

const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: 350, suffix: "+", label: t.stats.lotsSold, icon: CheckCircle2 },
    { value: 8, suffix: "", label: t.stats.projects, icon: Building2 },
    { value: 5, suffix: "", label: t.stats.cities, icon: MapPin },
    { value: 1200, suffix: "+", label: t.stats.clients, icon: Users },
  ];

  return (
    <section className="py-12 md:py-20 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <stat.icon className="w-5 md:w-6 h-5 md:h-6 text-ceiba-terra mx-auto mb-2 md:mb-3" />
              <div className="text-2xl md:text-4xl font-display font-bold text-foreground">
                <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                {stat.suffix}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1 font-body">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
