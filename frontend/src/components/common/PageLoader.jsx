import { useLanguage } from "@/contexts/LanguageContext";

function PageLoader() {
  const { language } = useLanguage();
  const label = language === "id" ? "Memuat halaman" : "Loading page";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="flex h-full min-h-[50vh] w-full items-center justify-center"
    >
      <div className="h-8 w-8 animate-spin-smooth rounded-full border-2 border-steel border-t-porcelain" />
      <span className="sr-only">{label}…</span>
    </div>
  );
}

export default PageLoader;
