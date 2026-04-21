import { useQuery } from "@tanstack/react-query";

export interface ProjectRelease {
  _id: string;
  title: string;
  location: string;
  description: string;
  googleMapLocation?: string;
  images: string[];
  enabled: boolean;
  status: "enabled" | "disabled";
  createdAt?: string;
  updatedAt?: string;
}

const RAG_ORIGIN = "https://back.laceiba.group";

export const projectReleaseImageUrl = (fileName: string): string => {
  return `${RAG_ORIGIN}/rag/uploads/project-releases/${encodeURIComponent(fileName)}`;
};

const fetchProjectReleases = async (): Promise<ProjectRelease[]> => {
  const res = await fetch(`${RAG_ORIGIN}/rag/project-releases?status=enabled`);
  if (!res.ok) throw new Error("Failed to fetch project releases");
  return res.json();
};

export const useProjectReleases = () => {
  return useQuery({
    queryKey: ["project-releases"],
    queryFn: fetchProjectReleases,
    staleTime: 5 * 60 * 1000,
  });
};
