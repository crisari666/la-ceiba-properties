import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { writeFileSync } from "node:fs";
import { componentTagger } from "lovable-tagger";

const SITE_URL = "https://laceiba.group";
const API_URL = "https://back.laceiba.group/rag/projects?enable=true";

const escapeXml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const sitemapPlugin = () => ({
  name: "generate-sitemap",
  apply: "build" as const,
  async writeBundle(options: { dir?: string }) {
    const staticRoutes = [
      { loc: "/", changefreq: "weekly", priority: "1.0" },
      { loc: "/projects", changefreq: "weekly", priority: "0.9" },
      { loc: "/releases", changefreq: "monthly", priority: "0.7" },
      { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
    ];

    let projectEntries: { loc: string; lastmod?: string; changefreq: string; priority: string }[] = [];
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 30000);
      const res = await fetch(API_URL, { signal: controller.signal });
      clearTimeout(t);
      if (res.ok) {
        const projects = (await res.json()) as Array<{ slug?: string; updatedAt?: string }>;
        projectEntries = projects
          .filter((p) => p.slug)
          .map((p) => ({
            loc: `/projects/${p.slug}`,
            lastmod: p.updatedAt?.slice(0, 10),
            changefreq: "weekly",
            priority: "0.8",
          }));
      }
    } catch (err) {
      console.warn(`[sitemap] Could not fetch projects: ${(err as Error).message}.`);
    }

    const all = [...staticRoutes, ...projectEntries];
    const urls = all
      .map((e) => {
        const parts = [`    <loc>${escapeXml(`${SITE_URL}${e.loc}`)}</loc>`];
        if ("lastmod" in e && e.lastmod) parts.push(`    <lastmod>${e.lastmod}</lastmod>`);
        parts.push(`    <changefreq>${e.changefreq}</changefreq>`);
        parts.push(`    <priority>${e.priority}</priority>`);
        return `  <url>\n${parts.join("\n")}\n  </url>`;
      })
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

    const outDir = options.dir ?? "dist";
    writeFileSync(path.resolve(outDir, "sitemap.xml"), xml, "utf8");
    console.log(`[sitemap] Wrote ${all.length} URLs (${projectEntries.length} projects) to ${outDir}/sitemap.xml`);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
