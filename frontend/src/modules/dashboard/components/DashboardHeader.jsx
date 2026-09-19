import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

import en from "@/locales/en";
import id from "@/locales/id";

function DashboardHeader() {
  const { user } = useAuth();

  const { language } = useLanguage();

  const t = language === "id" ? id : en;

  const hour = new Date().getHours();

  let greetingKey = "greetingEvening";

  if (hour >= 5 && hour < 12) {
    greetingKey = "greetingMorning";
  } else if (hour >= 12 && hour < 17) {
    greetingKey = "greetingAfternoon";
  } else if (hour >= 17 && hour < 21) {
    greetingKey = "greetingEvening";
  } else {
    greetingKey = "greetingNight";
  }

  const username =
    typeof user?.username === "string"
      ? user.username
      : typeof user?.name === "string"
        ? user.name
        : "User";

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {t.dashboard[greetingKey]},{" "}
          <span className="text-zinc-900 dark:text-zinc-100">{username}</span>
        </h1>

        <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400">{t.dashboard.overview}</p>
      </div>
    </div>
  );
}

export default DashboardHeader;
