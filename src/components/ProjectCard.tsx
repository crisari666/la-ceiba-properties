import { useLanguage } from "@/i18n/LanguageContext";
import type { Project } from "@/hooks/useProjects";
import { MapPin, ArrowUpRight, Ruler } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
    >
      <Link
        to={`/projects/${project._id}`}
        className="group block relative rounded-2xl overflow-hidden bg-ceiba-dark aspect-[3/4] sm:aspect-[4/5] cursor-pointer"
      >
        {/* Background Image */}
        <img
          src={mainImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
          <MapPin className="w-3 h-3" />
          {project.city}, {project.state}
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform transition-transform duration-500">
          <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
            {project.title}
          </h3>

          {project.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.amenities.slice(0, 2).map((a) => (
                <span
                  key={a._id}
                  className="text-[10px] md:text-xs bg-white/15 backdrop-blur-sm text-white/90 px-2.5 py-1 rounded-full border border-white/10"
                >
                  {a.title}
                </span>
              ))}
              {project.amenities.length > 2 && (
                <span className="text-[10px] md:text-xs text-white/60 px-1.5 py-1">
                  +{project.amenities.length - 2}
                </span>
              )}
            </div>
          )}

          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] md:text-xs text-white/60 uppercase tracking-wider">
                {t.projects.from}
              </span>
              <div className="text-lg md:text-xl font-bold text-ceiba-warm">
                {formatPrice(project.priceSell)}
              </div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-ceiba-warm flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
