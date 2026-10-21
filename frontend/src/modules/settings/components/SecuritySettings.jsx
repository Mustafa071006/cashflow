import { useState } from "react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button/Button";

import useSettings from "../hooks/useSettings";

import { useLanguage } from "@/contexts/LanguageContext";

function SecuritySettings() {
  const { changePassword, loading } = useSettings();

  const { language } = useLanguage();

  const [form, setForm] = useState({
    currentPassword: "",

    newPassword: "",

    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return;
    }

    await changePassword({
      currentPassword: form.currentPassword,

      newPassword: form.newPassword,
    });

    setForm({
      currentPassword: "",

      newPassword: "",

      confirmPassword: "",
    });
  };

  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="font-display text-product-label font-semibold text-porcelain">
            {language === "id" ? "Keamanan" : "Security"}
          </h2>

          <p className="mt-1 text-body text-ash">
            {language === "id" ? "Ubah password akun Anda." : "Change your account password."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label={language === "id" ? "Password Saat Ini" : "Current Password"}

            type="password"

            value={form.currentPassword}

            onChange={(e) =>
              setForm({
                ...form,
                currentPassword: e.target.value,
              })
            }
          />

          <Input
            label={language === "id" ? "Password Baru" : "New Password"}

            type="password"

            value={form.newPassword}

            onChange={(e) =>
              setForm({
                ...form,
                newPassword: e.target.value,
              })
            }
          />

          <Input
            label={language === "id" ? "Konfirmasi Password Baru" : "Confirm New Password"}

            type="password"

            value={form.confirmPassword}

            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading
                ? language === "id"
                  ? "Menyimpan..."
                  : "Saving..."
                : language === "id"
                  ? "Simpan Password"
                  : "Save Password"}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default SecuritySettings;
