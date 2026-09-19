import { useState } from "react";

import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button/Button";

import { useLanguage } from "@/contexts/LanguageContext";

function LanguageSettings() {
  const { language, changeLanguage } = useLanguage();

  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleCancel = () => {
    setSelectedLanguage(language);
  };

  const handleConfirm = () => {
    changeLanguage(selectedLanguage);
  };

  const hasChanged = selectedLanguage !== language;

  const languageOptions = [
    {
      value: "id",
      label: "🇮🇩 Indonesia",
    },

    {
      value: "en",
      label: "🇬🇧 English",
    },
  ];

  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {language === "id" ? "Bahasa" : "Language"}
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {language === "id"
              ? "Pilih bahasa yang ingin digunakan pada aplikasi."
              : "Choose your preferred application language."}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 dark:text-white">
            {language === "id" ? "Bahasa Aplikasi" : "Application Language"}
          </label>

          <Dropdown
            value={selectedLanguage}

            onChange={setSelectedLanguage}

            options={languageOptions}
          />
        </div>

        {hasChanged && (
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"

              onClick={handleCancel}
            >
              {language === "id" ? "Batal" : "Cancel"}
            </Button>

            <Button onClick={handleConfirm}>{language === "id" ? "Konfirmasi" : "Confirm"}</Button>
          </div>
        )}
      </div>
    </Card>
  );
}

export default LanguageSettings;
