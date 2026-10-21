import ProfileSettings from "../components/ProfileSettings";

import SecuritySettings from "../components/SecuritySettings";

import LanguageSettings from "../components/LanguageSettings";

import AccountSettings from "../components/AccountSettings";

import { useLanguage } from "@/contexts/LanguageContext";

function SettingsPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-hero-name font-semibold text-porcelain md:text-headline">
          {language === "id" ? "Pengaturan" : "Settings"}
        </h1>

        <p className="mt-2 text-section-nav text-ash">
          {language === "id"
            ? "Kelola preferensi akun dan pengaturan aplikasi Anda."
            : "Manage your account preferences and application settings."}
        </p>
      </div>

      <div className="grid gap-4">
        <ProfileSettings />

        <SecuritySettings />

        <LanguageSettings />

        <AccountSettings />
      </div>
    </div>
  );
}

export default SettingsPage;
