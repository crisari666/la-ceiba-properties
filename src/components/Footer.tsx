import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-ceiba-dark text-white/60 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/ceiba-icon.png" alt="La Ceiba" className="h-8 w-auto brightness-0 invert opacity-60" />
            <div>
              <span className="font-display font-bold text-white text-lg">La Ceiba</span>
              <span className="block text-xs text-white/40">{t.footer.tagline}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          </div>

          <p className="text-sm">
            © {new Date().getFullYear()} La Ceiba. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
