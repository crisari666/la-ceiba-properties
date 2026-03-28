import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useProjects } from "@/hooks/useProjects";
import type { LotOption } from "@/hooks/useProjects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowLeft,
  Download,
  ChevronLeft,
  ChevronRight,
  Check,
  Share2,
  Play,
  Image as ImageIcon,
  FileText,
  BookOpen,
  Ruler,
  Calculator,
  Info,
} from "lucide-react";
import { useState, useMemo } from "react";
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
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const { data: projects, isLoading } = useProjects();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<MediaTab>("video");
  const [selectedLot, setSelectedLot] = useState<number>(0);
  const [cuotas, setCuotas] = useState<number>(12);

  const project = projects?.find((p) => p.slug === slug || p._id === slug);

  // Lot & payment calculations
  const lotOptions = project?.lotOptions ?? [];
  const currentLot: LotOption | undefined = lotOptions[selectedLot];
  const separation = project?.separation ?? 0;

  const paymentCalc = useMemo(() => {
    if (!currentLot) return null;
    const totalPrice = currentLot.price;
    const remaining = totalPrice - separation;
    const monthlyPayment = remaining / cuotas;
    const lastPayment = remaining - monthlyPayment * (cuotas - 1);
    return { totalPrice, separation, remaining, monthlyPayment, lastPayment, cuotas };
  }, [currentLot, separation, cuotas]);

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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Media Gallery Section */}
      <section className="pt-20 md:pt-24 pb-8 md:pb-12 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Back button */}
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
              <motion.div key="video" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-ceiba-dark shadow-xl">
                  <video
                    src={`${IMAGE_BASE}${project.reelVideo}`}
                    controls autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    poster={horizontalImages[0] || images[0]}
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
                    <iframe
                      src={`${IMAGE_BASE}${project.plane}`}
                      className="absolute inset-0 w-full h-full"
                      title={`${project.title} - Plano`}
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white shadow-xl">
                    <img
                      src={`${IMAGE_BASE}${project.plane}`}
                      alt={`${project.title} - Plano`}
                      className="absolute inset-0 w-full h-full object-contain p-4"
                    />
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

            {currentTab === "brochure" && (
              <motion.div
                key="brochure"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-16 rounded-2xl bg-card border border-border shadow-xl"
              >
                <BookOpen className="w-16 h-16 text-ceiba-terra mb-4" />
                <p className="text-lg font-display font-semibold text-foreground mb-2">Brochure</p>
                <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">{t.projectDetail.downloadBrochure}</p>
                <a href={`${IMAGE_BASE}${project.brochure}`} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 bg-ceiba-terra hover:bg-ceiba-terra/90 text-white">
                    <Download className="w-4 h-4" />
                    {t.projectDetail.downloadBrochure}
                  </Button>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 md:gap-3 mt-4 justify-center">
            {tabConfig
              .filter((tab) => tab.available)
              .map((tab) => (
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
              ))}
          </div>

          {/* Project title */}
          <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground mt-4 mb-1">
            {project.title}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm md:text-base">{project.city}, {project.state} · {project.country}</span>
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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
                  <h2 className="text-lg md:text-xl font-display font-semibold text-foreground mb-3">
                    {t.projectDetail.aboutProject}
                  </h2>
                  <div
                    className="prose prose-sm md:prose-base max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-ceiba-terra"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }}
                  />
                </motion.div>
              )}

              {/* Lot Options & Payment Calculator */}
              {lotOptions.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
                  <div className="rounded-2xl bg-ceiba-dark text-white overflow-hidden">
                    {/* Lot selector */}
                    <div className="p-6 pb-4">
                      <h2 className="text-lg md:text-xl font-display font-semibold mb-1">
                        Tipos de lotes
                      </h2>
                      <p className="text-sm text-white/60 mb-5">
                        Los precios mostrados son "desde" y pueden variar según la disponibilidad y la etapa del desarrollo.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {lotOptions.map((lot, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedLot(i)}
                            className={`px-5 py-3 rounded-xl border transition-all duration-300 text-left ${
                              selectedLot === i
                                ? "bg-ceiba-terra border-ceiba-terra text-white"
                                : "bg-white/5 border-white/15 text-white/80 hover:border-white/30"
                            }`}
                          >
                            <div className="text-lg font-bold">{lot.area}m²</div>
                            <div className="text-xs opacity-70">{formatPrice(lot.price)}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Payment calculator */}
                    {paymentCalc && (
                      <div className="p-6 border-t border-white/10">
                        <h3 className="text-lg font-display font-semibold mb-1">
                          Pagos flexibles, sueños posibles
                        </h3>

                        <div className="space-y-0 mt-4">
                          {/* Separación */}
                          <div className="flex items-center justify-between py-4 border-b border-white/10">
                            <span className="text-sm font-medium">Separación</span>
                            <span className="text-xl font-bold">{formatPrice(paymentCalc.separation)} <span className="text-xs font-normal text-white/60">COP</span></span>
                          </div>

                          {/* Cuotas slider */}
                          <div className="py-4 border-b border-white/10">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium">{cuotas} mensualidades</span>
                              <span className="text-xl font-bold">{formatPrice(paymentCalc.monthlyPayment)} <span className="text-xs font-normal text-white/60">COP</span></span>
                            </div>
                            <Slider
                              value={[cuotas]}
                              onValueChange={(v) => setCuotas(v[0])}
                              min={1}
                              max={36}
                              step={1}
                              className="w-full [&_[data-slot=slider-track]]:bg-white/20 [&_[data-slot=slider-range]]:bg-ceiba-terra [&_[data-slot=slider-thumb]]:bg-ceiba-terra [&_[data-slot=slider-thumb]]:border-ceiba-terra"
                            />
                            <div className="flex justify-between text-xs text-white/40 mt-1">
                              <span>1 mes</span>
                              <span>36 meses</span>
                            </div>
                          </div>

                          {/* Precio total */}
                          <div className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium">Precio total</span>
                              <Info className="w-3.5 h-3.5 text-white/40" />
                            </div>
                            <span className="text-xl font-bold">{formatPrice(paymentCalc.totalPrice)} <span className="text-xs font-normal text-white/60">COP</span></span>
                          </div>
                        </div>

                        <p className="text-xs text-white/50 mt-4">
                          Cierra el mejor trato directamente con el constructor
                        </p>
                        <a
                          href={`https://wa.me/573001234567?text=Hola, me interesa el proyecto ${project.title} - Lote de ${currentLot?.area}m²`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-3"
                        >
                          <Button className="w-full bg-transparent border border-white/30 text-white hover:bg-white/10 py-3 text-sm">
                            <Calculator className="w-4 h-4 mr-2" />
                            Ajustar plan de pagos
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Amenities */}
              {project.amenities?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                  <h2 className="text-lg md:text-xl font-display font-semibold text-foreground mb-4">
                    {t.projects.amenities}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.amenities.map((a) => (
                      <div key={a._id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
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

            {/* Sidebar */}
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

                {/* Planes section below sidebar card */}
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
