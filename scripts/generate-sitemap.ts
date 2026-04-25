import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = "https://laceiba.group";
const API_URL = "https://back.laceiba.group/rag/projects?enable=true";

interface Project {
  slug?: string;
  _id: string;
  updatedAt?: string;
}

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

const STATIC_ROUTES: SitemapEntry[] = [
  { loc: "/", changefreq: "weekly", priority: 1.0 },
  { loc: "/projects", changefreq: "weekly", priority: 0.9 },
  { loc: "/releases", changefreq: "monthly", priority: 0.7 },
  { loc: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
];

const escapeXml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildSitemap = (entries: SitemapEntry[]): string => {
  const urls = entries
    .map((e) => {
      const parts = [`    <loc>${escapeXml(`${SITE_URL}${e.loc}`)}</loc>`];
      if (e.lastmod) parts.push(`    <lastmod>${e.lastmod.slice(0, 10)}</lastmod>`);
      if (e.changefreq) parts.push(`    <changefreq>${e.changefreq}</changefreq>`);
      if (e.priority !== undefined) parts.push(`    <priority>${e.priority.toFixed(1)}</priority>`);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const fetchProjects = async (): Promise<Project[]> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    const res = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[sitemap] Could not fetch projects: ${(err as Error).message}. Using static routes only.`);
    return [];
  }
};

const main = async () => {
  const projects = await fetchProjects();
  const projectEntries: SitemapEntry[] = projects
    .filter((p) => p.slug)
    .map((p) => ({
      loc: `/projects/${p.slug}`,
      lastmod: p.updatedAt,
      changefreq: "weekly",
      priority: 0.8,
    }));

  const all = [...STATIC_ROUTES, ...projectEntries];
  const xml = buildSitemap(all);
  const outPath = resolve(process.cwd(), "public/sitemap.xml");
  writeFileSync(outPath, xml, "utf8");
  console.log(`[sitemap] Wrote ${all.length} URLs to public/sitemap.xml (${projectEntries.length} projects)`);
};

main();