import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-ceiba-terra">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-ceiba-warm/8 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-ceiba-terra/6 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-10 md:pt-24 md:pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center gap-2 mb-4 md:mb-6 justify-center lg:justify-start">
              <img src="/ceiba-icon.png" alt="" className="h-8 md:h-10 w-auto brightness-0 invert opacity-60" />
              <span className="text-ceiba-warm/80 font-body text-xs md:text-sm tracking-widest uppercase">
                La Ceiba · Holding Inmobiliario
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-4 md:mb-6">
              {t.hero.title}{" "}
              <span className="bg-gradient-to-r from-ceiba-warm to-ceiba-terra bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10 font-body leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link to="/projects">
                <Button size="lg" className="w-full sm:w-auto bg-ceiba-warm hover:bg-ceiba-warm/90 text-ceiba-dark font-semibold text-base px-8 gap-2">
                  {t.hero.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#nosotros">
                <Button size="lg" className="w-full sm:w-auto bg-ceiba-warm hover:bg-ceiba-warm/90 text-white font-semibold text-base px-8">
                  {t.hero.ctaSecondary}
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6 mt-8 md:mt-14 justify-center lg:justify-start">
              {[
                { icon: Shield, label: "Inversión segura" },
                { icon: TrendingUp, label: "Alta valorización" },
                { icon: MapPin, label: "Ubicaciones premium" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/40 text-xs md:text-sm">
                  <Icon className="w-4 h-4 text-ceiba-warm" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mobile: compact image strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:hidden grid grid-cols-3 gap-2 mt-2"
          >
            <div className="rounded-xl overflow-hidden aspect-[3/4]">
              <img src={hero1} alt="Proyecto" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[3/4] relative">
              <img src={hero3} alt="Proyecto" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ceiba-dark/50 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 bg-white/10 backdrop-blur-md rounded-lg px-2 py-1.5 border border-white/10">
                <div className="text-lg font-display font-bold text-white">350+</div>
                <div className="text-[10px] text-white/60">Lotes vendidos</div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden aspect-[3/4]">
              <img src={hero2} alt="Proyecto" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </motion.div>

          {/* Desktop: innovative image mosaic */}
          <div className="hidden lg:block relative h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-0 left-0 w-[55%] h-[65%] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img src={hero1} alt="Familia en proyecto" className="w-full h-full object-cover" width={896} height={1152} />
              <div className="absolute inset-0 bg-gradient-to-t from-ceiba-dark/40 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-4 right-0 w-[42%] h-[38%] rounded-2xl overflow-hidden shadow-xl"
            >
              <img src={hero2} alt="Vista aérea" className="w-full h-full object-cover" width={896} height={672} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-b from-ceiba-dark/20 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-0 right-0 w-[42%] h-[55%] rounded-2xl overflow-hidden shadow-xl"
            >
              <img src={hero3} alt="Pareja revisando planos" className="w-full h-full object-cover" width={672} height={896} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ceiba-dark/40 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-2 left-0 w-[53%] h-[30%] rounded-2xl overflow-hidden shadow-xl"
            >
              <img src={hero4} alt="Entrada proyecto" className="w-full h-full object-cover" width={896} height={672} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-ceiba-dark/50 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
                <div className="text-2xl font-display font-bold text-white">350+</div>
                <div className="text-xs text-white/60">Lotes vendidos</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -top-4 -right-4 w-24 h-24 border-2 border-ceiba-warm/20 rounded-full"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute -bottom-6 left-[45%] w-16 h-16 border-2 border-ceiba-terra/15 rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
