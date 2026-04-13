import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Project } from "@/hooks/useProjects";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Download,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Play,
  Image as ImageIcon,
  FileText,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const IMAGE_BASE = "https://back.laceiba.group/rag/uploads//projects/";

type MediaTab = "video" | "images" | "planes" | "brochure";

interface Props {
  project: Project;
}

const ProjectMediaGallery = ({ project }: Props) => {
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<MediaTab>("video");

  const horizontalImages = project.horizontalImages?.length
    ? project.horizontalImages.map((img) => `${IMAGE_BASE}${img}`)
    : [];

  const fallbackImages = project.images?.length
    ? project.images.map((img) => `${IMAGE_BASE}${img}`)
    : ["/placeholder.svg"];

  const allImages = horizontalImages.length > 0 ? horizontalImages : fallbackImages;

  const videoSrc = project.verticalVideos?.length ? project.verticalVideos[0] : project.reelVideo;
  const hasVideo = !!videoSrc;
  const hasImages = allImages.length > 0;
  const hasPlane = !!project.plane;
  const hasBrochure = !!project.brochure;
  const isPlanePdf = hasPlane && project.plane.toLowerCase().endsWith(".pdf");

  const availableTabs: MediaTab[] = [];
  if (hasVideo) availableTabs.push("video");
  if (hasImages) availableTabs.push("images");
  if (hasPlane) availableTabs.push("planes");
  if (hasBrochure) availableTabs.push("brochure");

  const currentTab = availableTabs.includes(activeTab)
    ? activeTab
    : availableTabs[0] || "video";

  const nextImage = () => setActiveImage((i) => (i + 1) % allImages.length);
  const prevImage = () => setActiveImage((i) => (i - 1 + allImages.length) % allImages.length);

  const tabConfig: { key: MediaTab; label: string; icon: React.ReactNode; available: boolean }[] = [
    { key: "video", label: "Video", icon: <Play className="w-4 h-4" />, available: hasVideo },
    { key: "images", label: t.projectDetail.images, icon: <ImageIcon className="w-4 h-4" />, available: hasImages },
    { key: "planes", label: t.projectDetail.planes, icon: <FileText className="w-4 h-4" />, available: hasPlane },
    { key: "brochure", label: "Brochure", icon: <BookOpen className="w-4 h-4" />, available: hasBrochure },
  ];

  return (
    <section className="pt-20 md:pt-24 pb-8 md:pb-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-4">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.projectDetail.backToProjects}
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {currentTab === "video" && hasVideo && (
            <motion.div key="video" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-ceiba-dark shadow-xl">
                <video
                  src={`${IMAGE_BASE}${project.reelVideo}`}
                  controls autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  poster={allImages[0]}
                />
              </div>
            </motion.div>
          )}

          {currentTab === "images" && (
            <motion.div key="images" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-ceiba-dark shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={allImages[activeImage]}
                    alt={`${project.title} - ${activeImage + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
                {allImages.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/20">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/20">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      {activeImage + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 md:gap-3 overflow-x-auto mt-4 pb-1 scrollbar-hide">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        i === activeImage ? "border-ceiba-terra shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {currentTab === "planes" && (
            <motion.div key="planes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {isPlanePdf ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white shadow-xl">
                  <iframe src={`${IMAGE_BASE}${project.plane}`} className="absolute inset-0 w-full h-full" title={`${project.title} - Plano`} />
                </div>
              ) : (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white shadow-xl">
                  <img src={`${IMAGE_BASE}${project.plane}`} alt={`${project.title} - Plano`} className="absolute inset-0 w-full h-full object-contain p-4" />
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <a href={`${IMAGE_BASE}${project.plane}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 border-ceiba-terra text-ceiba-terra hover:bg-ceiba-terra/5">
                    <Download className="w-4 h-4" />
                    {t.projectDetail.viewPlans}
                  </Button>
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        <div className="flex flex-wrap gap-2 md:gap-3 mt-4 justify-center">
          {tabConfig
            .filter((tab) => tab.available)
            .map((tab) => (
              tab.key === "brochure" ? (
                <a
                  key={tab.key}
                  href={`${IMAGE_BASE}${project.brochure}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 bg-card text-muted-foreground border-border hover:border-ceiba-terra/50 hover:text-foreground"
                >
                  {tab.icon}
                  {tab.label}
                </a>
              ) : (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); setActiveImage(0); }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                    currentTab === tab.key
                      ? "bg-ceiba-terra text-white border-ceiba-terra shadow-md"
                      : "bg-card text-muted-foreground border-border hover:border-ceiba-terra/50 hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              )
            ))}
        </div>

        <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground mt-4 mb-1">
          {project.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm md:text-base">{project.city}, {project.state} · {project.country}</span>
        </div>
      </div>
    </section>
  );
};

export default ProjectMediaGallery;
