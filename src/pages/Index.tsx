import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ReferralsSection from "@/components/ReferralsSection";
import AssistantSection from "@/components/AssistantSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { useProjects } from "@/hooks/useProjects";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedProjects = () => {
  const { t } = useLanguage();
  const { data: projects, isLoading } = useProjects();
  const featured = projects?.filter((p) => !p.deleted).slice(0, 3) ?? [];

  if (isLoading || featured.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 md:mb-4">
            {t.projects.title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">{t.projects.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
          {featured.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/projects">
            <Button variant="outline" className="w-full sm:w-auto gap-2 border-ceiba-terra text-ceiba-terra hover:bg-ceiba-terra/5">
              {t.projects.seeAll}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturedProjects />
      <ReferralsSection />
      <AssistantSection />
      <Footer />
    </div>
  );
};

export default Index;
