import ProfileSettings from "../components/ProfileSettings";

import SecuritySettings from "../components/SecuritySettings";

import LanguageSettings from "../components/LanguageSettings";

import AccountSettings from "../components/AccountSettings";

import { useLanguage } from "@/contexts/LanguageContext";

function SettingsPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          {language === "id" ? "Pengaturan" : "Settings"}
        </h1>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {language === "id"
            ? "Kelola preferensi akun dan pengaturan aplikasi Anda."
            : "Manage your account preferences and application settings."}
        </p>
      </div>

      <div className="grid gap-6">
        <ProfileSettings />

        <SecuritySettings />

        <LanguageSettings />

        <AccountSettings />
      </div>
    </div>
  );
}

export default SettingsPage;
