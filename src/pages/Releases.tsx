import { useLanguage } from "@/i18n/LanguageContext";
import { useProjectReleases, projectReleaseImageUrl } from "@/hooks/useProjectReleases";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Releases = () => {
  const { t } = useLanguage();
  const { data: releases, isLoading, error } = useProjectReleases();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-20 md:pt-28 pb-12 md:pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-8 md:mb-14"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 md:mb-4">
              {t.releases.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">{t.releases.subtitle}</p>
          </motion.div>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <Skeleton className="aspect-[16/10] w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-12 md:py-20 text-muted-foreground">
              <p>{t.releases.error}</p>
            </div>
          )}

          {!isLoading && !error && releases && releases.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {releases.map((release, i) => (
                <motion.article
                  key={release._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
                >
                  {release.images && release.images.length > 0 ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {release.images.map((fileName) => (
                          <CarouselItem key={fileName}>
                            <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                              <img
                                src={projectReleaseImageUrl(fileName)}
                                alt={release.title}
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {release.images.length > 1 && (
                        <>
                          <CarouselPrevious className="left-3" />
                          <CarouselNext className="right-3" />
                        </>
                      )}
                    </Carousel>
                  ) : (
                    <div className="aspect-[16/10] w-full bg-muted" />
                  )}

                  <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
                    <div>
                      <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground">
                        {release.title}
                      </h2>
                      {release.location && (
                        <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4" />
                          {release.location}
                        </p>
                      )}
                    </div>

                    {release.description && (
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                        {release.description}
                      </p>
                    )}

                    {release.googleMapLocation && (
                      <a
                        href={release.googleMapLocation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ceiba-terra hover:underline mt-auto"
                      >
                        {t.releases.viewMap}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {!isLoading && !error && releases && releases.length === 0 && (
            <div className="text-center py-12 md:py-20 text-muted-foreground">
              <p>{t.releases.empty}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Releases;
