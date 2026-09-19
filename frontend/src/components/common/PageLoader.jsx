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
      <div className="h-9 w-9 animate-spin-smooth rounded-full border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-zinc-100" />
      <span className="sr-only">{label}…</span>
    </div>
  );
}

export default PageLoader;
