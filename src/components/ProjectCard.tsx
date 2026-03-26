import { useLanguage } from "@/i18n/LanguageContext";
import type { Project } from "@/hooks/useProjects";
import { MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const IMAGE_BASE = "https://back.laceiba.group/rag/uploads//projects/";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { t } = useLanguage();

  const mainImage = project.images?.[0]
    ? `${IMAGE_BASE}${project.images[0]}`
    : "/placeholder.svg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
        <img
          src={mainImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-ceiba-dark/80 backdrop-blur-sm text-white text-[10px] md:text-xs font-semibold px-2.5 md:px-3 py-1 md:py-1.5 rounded-full">
          {project.city}, {project.state}
        </div>
      </div>

      <div className="p-4 md:p-5">
        <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-1.5 md:mb-2">
          {project.title}
        </h3>

        <div className="flex items-center gap-1.5 text-muted-foreground text-xs md:text-sm mb-2 md:mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{project.city}, {project.state} · {project.country}</span>
        </div>

        {project.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1 md:gap-1.5 mb-3 md:mb-4">
            {project.amenities.slice(0, 3).map((a) => (
              <span key={a._id} className="text-[10px] md:text-xs bg-muted text-muted-foreground px-2 md:px-2.5 py-0.5 md:py-1 rounded-full">
                {a.title}
              </span>
            ))}
            {project.amenities.length > 3 && (
              <span className="text-[10px] md:text-xs text-muted-foreground px-1">
                +{project.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <span className="text-[10px] md:text-xs text-muted-foreground">{t.projects.from}</span>
            <div className="text-base md:text-lg font-bold text-ceiba-terra">{formatPrice(project.priceSell)}</div>
          </div>
          {project.location && (
            <a
              href={project.location}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs md:text-sm text-ceiba-terra hover:text-ceiba-terra/80 transition-colors font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.projects.location}</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
