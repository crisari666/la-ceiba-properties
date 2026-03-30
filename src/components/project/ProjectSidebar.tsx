import { useLanguage } from "@/i18n/LanguageContext";
import type { Project, LotOption } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Share2, Download } from "lucide-react";

const IMAGE_BASE = "https://back.laceiba.group/rag/uploads//projects/";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

interface Props {
  project: Project;
  selectedLot?: LotOption;
}

const ProjectSidebar = ({ project, selectedLot }: Props) => {
  const { t } = useLanguage();

  const hasPlane = !!project.plane;
  const isPlanePdf = hasPlane && project.plane.toLowerCase().endsWith(".pdf");

  // Dynamic commission based on selected lot
  const commissionPercentage = project.commissionPercentage ?? 0;
  const commissionValue = selectedLot
    ? (selectedLot.price * commissionPercentage) / 100
    : project.commissionValue ?? 0;

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {t.projects.from}
              </span>
              <div className="text-3xl md:text-4xl font-display font-bold text-ceiba-terra mt-1">
                {formatPrice(selectedLot?.price ?? project.priceSell)}
              </div>
            </div>
            <button
              onClick={() => navigator.share?.({ title: project.title, url: window.location.href })}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {commissionPercentage > 0 && (
            <div className="p-4 rounded-xl bg-ceiba-warm/10 border border-ceiba-warm/20">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {t.projectDetail.commission}
              </span>
              <div className="text-xl font-bold text-ceiba-warm mt-1">
                {commissionPercentage}%
              </div>
              {commissionValue > 0 && (
                <span className="text-xs text-muted-foreground">
                  ≈ {formatPrice(commissionValue)}
                </span>
              )}
            </div>
          )}

          <div className="space-y-3">
            {project.location && (
              <a href={project.location} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full gap-2 bg-ceiba-terra hover:bg-ceiba-terra/90 text-white">
                  <MapPin className="w-4 h-4" />
                  {t.projectDetail.viewLocation}
                </Button>
              </a>
            )}
          </div>
        </motion.div>

        {hasPlane && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}>
            <h2 className="text-lg md:text-xl font-display font-semibold text-foreground mb-4">
              {t.projectDetail.planes}
            </h2>
            <div className="rounded-2xl overflow-hidden bg-white border border-border shadow-md">
              {isPlanePdf ? (
                <iframe
                  src={`${IMAGE_BASE}${project.plane}`}
                  className="w-full h-[400px]"
                  title={`${project.title} - Plano`}
                />
              ) : (
                <img
                  src={`${IMAGE_BASE}${project.plane}`}
                  alt={`${project.title} - Plano`}
                  className="w-full h-auto object-contain p-4"
                />
              )}
            </div>
            <div className="mt-3 flex justify-end">
              <a href={`${IMAGE_BASE}${project.plane}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 border-ceiba-terra text-ceiba-terra hover:bg-ceiba-terra/5">
                  <Download className="w-4 h-4" />
                  Descargar plano
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;
