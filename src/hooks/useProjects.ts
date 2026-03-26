import { useQuery } from "@tanstack/react-query";

export interface ProjectAmenity {
  _id: string;
  title: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  location: string;
  enabled: boolean;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  priceSell: number;
  deleted: boolean;
  commissionPercentage: number;
  commissionValue: number;
  amenities: ProjectAmenity[];
  images: string[];
  reelVideo: string;
  plane: string;
  brochure: string;
  createdAt: string;
  updatedAt: string;
}

const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch("https://back.laceiba.group/rag/projects?enable=true");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000,
  });
};
