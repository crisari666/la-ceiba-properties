import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useProjects } from "@/hooks/useProjects";
import type { LotOption } from "@/hooks/useProjects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import ProjectMediaGallery from "@/components/project/ProjectMediaGallery";
import ProjectDescription from "@/components/project/ProjectDescription";
import LotCalculator from "@/components/project/LotCalculator";
import ProjectAmenities from "@/components/project/ProjectAmenities";
import ProjectSidebar from "@/components/project/ProjectSidebar";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const { data: projects, isLoading } = useProjects();
  const [selectedLot, setSelectedLot] = useState<LotOption | undefined>();

  const project = projects?.find((p) => p.slug === slug || p._id === slug);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <ProjectMediaGallery project={project} />

      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Column 1: Description, Calculator, Amenities */}
            <div className="lg:col-span-2 space-y-8">
              <ProjectDescription description={project.description} />
              <LotCalculator
                lotOptions={project.lotOptions ?? []}
                separation={project.separation ?? 0}
                projectTitle={project.title}
                onLotChange={setSelectedLot}
              />
              <ProjectAmenities amenities={project.amenities} amenitiesGroups={project.amenitiesGroups} />
            </div>

            {/* Column 2: Referral Card, Plane */}
            <ProjectSidebar project={project} selectedLot={selectedLot} />
          </div>
        </div>
      </section>

      {/* Google Maps */}
      {project.lat && project.lng && (
        <section className="w-full">
          <iframe
            title={`${project.title} - Ubicación`}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${project.lat},${project.lng}&zoom=15`}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetail;
