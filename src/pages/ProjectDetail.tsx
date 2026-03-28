import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useProjects } from "@/hooks/useProjects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowLeft,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight,
  Check,
  Share2,
  Play,
  Image as ImageIcon,
  FileText,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import DOMPurify from "dompurify";

const IMAGE_BASE = "https://back.laceiba.group/rag/uploads//projects/";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

type MediaTab = "video" | "images" | "planes" | "brochure";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { data: projects, isLoading } = useProjects();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<MediaTab>("video");

  const project = projects?.find((p) => p._id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 container mx-auto px-4">
          <Skeleton className="w-full aspect-[16/9] rounded-2xl mb-6" />
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            {t.projectDetail.notFound}
          </h1>
          <Link to="/projects">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t.projectDetail.backToProjects}
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = project.images?.length
    ? project.images.map((img) => `${IMAGE_BASE}${img}`)
    : ["/placeholder.svg"];

  const horizontalImages = project.horizontalImages?.length
    ? project.horizontalImages.map((img) => `${IMAGE_BASE}${img}`)
    : [];

  const allImages = [...horizontalImages, ...images];

  const hasVideo = !!project.reelVideo;
  const hasImages = allImages.length > 0;
  const hasPlane = !!project.plane;
  const hasBrochure = !!project.brochure;

  // Set initial tab to first available
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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Explore the project — Media Tabs */}
      <section className="pt-20 md:pt-24 pb-8 md:pb-12 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Header with back button */}
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/projects"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.projectDetail.backToProjects}
            </Link>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {currentTab === "video" && hasVideo && (
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-ceiba-dark shadow-xl">
                  <video
                    src={`${IMAGE_BASE}${project.reelVideo}`}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    poster={horizontalImages[0] || images[0]}
                  />
                </div>
              </motion.div>
            )}

            {currentTab === "images" && (
              <motion.div
                key="images"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Main image viewer */}
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
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/20"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/20"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Counter badge */}
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                        {activeImage + 1} / {allImages.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail strip */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 md:gap-3 overflow-x-auto mt-4 pb-1 scrollbar-hide">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          i === activeImage
                            ? "border-ceiba-terra shadow-lg scale-105"
                            : "border-transparent opacity-60 hover:opacity-100"
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
              <motion.div
                key="planes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white shadow-xl">
                  <img
                    src={`${IMAGE_BASE}${project.plane}`}
                    alt={`${project.title} - Plano`}
                    className="absolute inset-0 w-full h-full object-contain p-4"
                  />
                </div>
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

            {currentTab === "brochure" && (
              <motion.div
                key="brochure"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-16 rounded-2xl bg-card border border-border shadow-xl"
              >
                <BookOpen className="w-16 h-16 text-ceiba-terra mb-4" />
                <p className="text-lg font-display font-semibold text-foreground mb-2">Brochure</p>
                <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                  {t.projectDetail.downloadBrochure}
                </p>
                <a href={`${IMAGE_BASE}${project.brochure}`} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 bg-ceiba-terra hover:bg-ceiba-terra/90 text-white">
                    <Download className="w-4 h-4" />
                    {t.projectDetail.downloadBrochure}
                  </Button>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab buttons at bottom */}
          <div className="flex flex-wrap gap-2 md:gap-3 mt-4 justify-center">
            {tabConfig
              .filter((tab) => tab.available)
              .map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setActiveImage(0);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                    currentTab === tab.key
                      ? "bg-ceiba-terra text-white border-ceiba-terra shadow-md"
                      : "bg-card text-muted-foreground border-border hover:border-ceiba-terra/50 hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
          </div>

          {/* Project title below tabs */}
          <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground mt-4 mb-1">
            {project.title}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm md:text-base">
              {project.city}, {project.state} · {project.country}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {project.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <h2 className="text-lg md:text-xl font-display font-semibold text-foreground mb-3">
                    {t.projectDetail.aboutProject}
                  </h2>
                  <div
                    className="prose prose-sm md:prose-base max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-ceiba-terra"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }}
                  />
                </motion.div>
              )}

              {/* Amenities */}
              {project.amenities?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className="text-lg md:text-xl font-display font-semibold text-foreground mb-4">
                    {t.projects.amenities}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.amenities.map((a) => (
                      <div
                        key={a._id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border"
                      >
                        <div className="w-8 h-8 rounded-lg bg-ceiba-warm/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-ceiba-terra" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{a.title}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Pricing & Actions */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="sticky top-24 bg-card rounded-2xl border border-border p-6 space-y-6 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {t.projects.from}
                    </span>
                    <div className="text-3xl md:text-4xl font-display font-bold text-ceiba-terra mt-1">
                      {formatPrice(project.priceSell)}
                    </div>
                  </div>
                  <button
                    onClick={() => navigator.share?.({ title: project.title, url: window.location.href })}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {project.commissionPercentage > 0 && (
                  <div className="p-4 rounded-xl bg-ceiba-warm/10 border border-ceiba-warm/20">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {t.projectDetail.commission}
                    </span>
                    <div className="text-xl font-bold text-ceiba-warm mt-1">
                      {project.commissionPercentage}%
                    </div>
                    {project.commissionValue > 0 && (
                      <span className="text-xs text-muted-foreground">
                        ≈ {formatPrice(project.commissionValue)}
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
