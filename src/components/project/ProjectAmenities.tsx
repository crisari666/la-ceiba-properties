import { useLanguage } from "@/i18n/LanguageContext";
import type { ProjectAmenity } from "@/hooks/useProjects";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
  amenities: ProjectAmenity[];
}

const ProjectAmenities = ({ amenities }: Props) => {
  const { t } = useLanguage();

  if (!amenities?.length) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
      <h2 className="text-lg md:text-xl font-display font-semibold text-foreground mb-4">
        {t.projects.amenities}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {amenities.map((a) => (
          <div key={a._id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
            <div className="w-8 h-8 rounded-lg bg-ceiba-warm/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-ceiba-terra" />
            </div>
            <span className="text-sm font-medium text-foreground">{a.title}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectAmenities;
