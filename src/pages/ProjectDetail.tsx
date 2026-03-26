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
} from "lucide-react";
import { useState } from "react";

const IMAGE_BASE = "https://back.laceiba.group/rag/uploads//projects/";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { data: projects, isLoading } = useProjects();
  const [activeImage, setActiveImage] = useState(0);

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

  const nextImage = () => setActiveImage((i) => (i + 1) % images.length);
  const prevImage = () => setActiveImage((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Gallery */}
      <section className="pt-16 md:pt-20">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-ceiba-dark">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={images[activeImage]}
              alt={`${project.title} - ${activeImage + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeImage ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Back button */}
          <Link
            to="/projects"
            className="absolute top-4 left-4 flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20 hover:bg-white/25 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.projectDetail.backToProjects}
          </Link>
        </div>
      </section>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="container mx-auto px-4 -mt-8 md:-mt-12 relative z-10">
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  i === activeImage
                    ? "border-ceiba-warm shadow-lg scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main info */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
                      {project.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-ceiba-terra" />
                      <span className="text-sm md:text-base">
                        {project.city}, {project.state} · {project.country}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigator.share?.({ title: project.title, url: window.location.href })}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

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
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
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
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t.projects.from}
                  </span>
                  <div className="text-3xl md:text-4xl font-display font-bold text-ceiba-terra mt-1">
                    {formatPrice(project.priceSell)}
                  </div>
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

                  {project.brochure && (
                    <a
                      href={`${IMAGE_BASE}${project.brochure}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full gap-2 border-ceiba-terra text-ceiba-terra hover:bg-ceiba-terra/5">
                        <Download className="w-4 h-4" />
                        {t.projectDetail.downloadBrochure}
                      </Button>
                    </a>
                  )}

                  {project.plane && (
                    <a
                      href={`${IMAGE_BASE}${project.plane}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full gap-2 border-border text-foreground hover:bg-muted">
                        <ExternalLink className="w-4 h-4" />
                        {t.projectDetail.viewPlans}
                      </Button>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Video section */}
      {project.reelVideo && (
        <section className="py-8 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6 text-center">
              {t.projectDetail.videoTour}
            </h2>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              <video
                src={`${IMAGE_BASE}${project.reelVideo}`}
                controls
                className="w-full aspect-video"
                poster={images[0]}
              />
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetail;
