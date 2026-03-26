import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-ceiba-hero">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-ceiba-warm blur-[120px]" />
        <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-ceiba-terra blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <img src="/ceiba-icon.png" alt="" className="h-10 w-auto brightness-0 invert opacity-60" />
              <span className="text-ceiba-warm/80 font-body text-sm tracking-widest uppercase">
                La Ceiba · Holding Inmobiliario
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
              {t.hero.title}{" "}
              <span className="text-gradient bg-gradient-to-r from-ceiba-warm to-ceiba-terra bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-xl mb-10 font-body leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/projects">
                <Button
                  size="lg"
                  className="bg-ceiba-warm hover:bg-ceiba-warm/90 text-ceiba-dark font-semibold text-base px-8 gap-2"
                >
                  {t.hero.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#nosotros">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-base px-8"
                >
                  {t.hero.ctaSecondary}
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-6 mt-16"
          >
            {[
              { icon: Shield, label: "Inversión segura" },
              { icon: TrendingUp, label: "Alta valorización" },
              { icon: MapPin, label: "Ubicaciones premium" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/50 text-sm">
                <Icon className="w-4 h-4 text-ceiba-warm" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
