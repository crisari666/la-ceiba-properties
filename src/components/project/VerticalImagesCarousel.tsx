import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const IMAGE_BASE = "https://back.laceiba.group/rag/uploads//projects/";

interface Props {
  images: string[];
  title: string;
}

const VerticalImagesCarousel = ({ images, title }: Props) => {
  const isMobile = useIsMobile();
  const visibleCount = isMobile ? 1 : 3;
  const [startIndex, setStartIndex] = useState(0);

  if (!images.length) return null;

  const fullImages = images.map((img) => `${IMAGE_BASE}${img}`);
  const maxStart = Math.max(0, fullImages.length - visibleCount);

  const next = () => setStartIndex((i) => Math.min(i + 1, maxStart));
  const prev = () => setStartIndex((i) => Math.max(i - 1, 0));

  const visible = fullImages.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center">
          Galería
        </h2>
        <div className="relative">
          {/* Navigation buttons */}
          {startIndex > 0 && (
            <button
              onClick={prev}
              className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-foreground hover:bg-background transition-colors border border-border"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {startIndex < maxStart && (
            <button
              onClick={next}
              className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-foreground hover:bg-background transition-colors border border-border"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Images grid */}
          <div
            className={`grid gap-4 ${
              isMobile ? "grid-cols-1" : "grid-cols-3"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((img, i) => (
                <motion.div
                  key={`${startIndex}-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={img}
                    alt={`${title} - ${startIndex + i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          {fullImages.length > visibleCount && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxStart + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStartIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === startIndex
                      ? "bg-ceiba-terra scale-125"
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VerticalImagesCarousel;
