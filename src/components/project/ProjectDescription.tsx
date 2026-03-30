import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

interface Props {
  description: string;
}

const ProjectDescription = ({ description }: Props) => {
  const { t } = useLanguage();

  if (!description) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
      <h2 className="text-lg md:text-xl font-display font-semibold text-foreground mb-3">
        {t.projectDetail.aboutProject}
      </h2>
      <div
        className="prose prose-sm md:prose-base max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-ceiba-terra"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
      />
    </motion.div>
  );
};

export default ProjectDescription;
