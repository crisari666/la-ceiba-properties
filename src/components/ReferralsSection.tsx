import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Share2, ShoppingCart, Banknote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReferralsSection = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Share2, title: t.referrals.step1Title, desc: t.referrals.step1Desc },
    { icon: ShoppingCart, title: t.referrals.step2Title, desc: t.referrals.step2Desc },
    { icon: Banknote, title: t.referrals.step3Title, desc: t.referrals.step3Desc },
  ];

  return (
    <section id="referidos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-ceiba-terra uppercase tracking-widest">
              {t.referrals.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-3 mb-6">
              {t.referrals.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t.referrals.description}
            </p>

            {/* Commission highlight */}
            <div className="bg-gradient-to-br from-ceiba-warm/10 to-ceiba-terra/10 border border-ceiba-warm/20 rounded-2xl p-6 mb-8">
              <div className="text-4xl font-display font-bold text-ceiba-terra">{t.referrals.commission}</div>
              <div className="text-muted-foreground mt-1">{t.referrals.perLot}</div>
            </div>

            <Button className="bg-ceiba-terra hover:bg-ceiba-terra/90 text-primary-foreground gap-2 px-6">
              {t.referrals.cta}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Right side - steps */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-8">{t.referrals.howItWorks}</h3>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex gap-5 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-ceiba-warm/15 rounded-xl flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-ceiba-terra" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-ceiba-warm bg-ceiba-warm/10 rounded-full px-2 py-0.5">
                        {i + 1}
                      </span>
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralsSection;
