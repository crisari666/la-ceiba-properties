import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AssistantSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-ceiba-hero text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-ceiba-warm" />
              <span className="text-ceiba-warm text-sm font-semibold uppercase tracking-widest">IA Assistant</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
              {t.assistant.title}
            </h2>
            <p className="text-lg text-white/60 mb-2">{t.assistant.subtitle}</p>
            <p className="text-white/50 leading-relaxed mb-8">{t.assistant.description}</p>
            <Button size="lg" className="bg-ceiba-warm hover:bg-ceiba-warm/90 text-ceiba-dark font-semibold gap-2">
              <Bot className="w-5 h-5" />
              {t.assistant.cta}
            </Button>
          </motion.div>

          {/* Right - Chat preview mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-ceiba-warm/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-ceiba-warm" />
                </div>
                <div>
                  <div className="font-semibold text-white">Verónica</div>
                  <div className="text-xs text-white/40">Online · AI Assistant</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-white/10 rounded-xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-white/80">
                    ¡Hola! 👋 Soy Verónica, tu asistente virtual de La Ceiba. ¿En qué puedo ayudarte hoy?
                  </p>
                </div>
                <div className="bg-ceiba-warm/20 rounded-xl rounded-tr-sm px-4 py-3 max-w-[80%] ml-auto">
                  <p className="text-sm text-white/80">
                    ¿Qué proyectos tienen disponibles?
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-white/80">
                    Tenemos 8 proyectos activos en 5 ciudades de Colombia. ¿Te gustaría conocer alguno en particular?
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t.assistant.placeholder}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-ceiba-warm/50"
                  readOnly
                />
                <button className="bg-ceiba-warm text-ceiba-dark p-2.5 rounded-xl hover:bg-ceiba-warm/90 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AssistantSection;
