import { useLanguage } from "@/i18n/LanguageContext";
import { useProjects } from "@/hooks/useProjects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const Projects = () => {
  const { t } = useLanguage();
  const { data: projects, isLoading, error } = useProjects();

  const enabledProjects = projects?.filter((p) => !p.deleted) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {t.projects.title}
            </h1>
            <p className="text-lg text-muted-foreground">{t.projects.subtitle}</p>
          </motion.div>

          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-muted-foreground">
              <p>Error loading projects. Please try again later.</p>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enabledProjects.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </div>
          )}

          {!isLoading && !error && enabledProjects.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>No projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
