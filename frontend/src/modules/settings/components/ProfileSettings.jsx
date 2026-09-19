import { useState } from "react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { useLanguage } from "@/contexts/LanguageContext";

import useSettings from "../hooks/useSettings";

function ProfileSettings() {
  const { user, updateProfile, loading } = useSettings();

  const { language } = useLanguage();

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleEdit = () => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
    });

    setEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProfile(form);

    setEditing(false);
  };

  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {language === "id" ? "Profil" : "Profile"}
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {language === "id"
              ? "Kelola informasi pribadi Anda."
              : "Manage your personal information."}
          </p>
        </div>

        {!editing ? (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-500 dark:text-zinc-400">
                  {language === "id" ? "Nama" : "Name"}
                </label>

                <p className="mt-1 text-base font-medium text-zinc-900 dark:text-white">
                  {user?.name || "-"}
                </p>
              </div>

              <div>
                <label className="text-sm text-zinc-500 dark:text-zinc-400">Email</label>

                <p className="mt-1 text-base font-medium text-zinc-900 dark:text-white">
                  {user?.email || "-"}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleEdit}>
                {language === "id" ? "Edit Profil" : "Edit Profile"}
              </Button>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}

            className="space-y-5"
          >
            <Input
              label={language === "id" ? "Nama" : "Name"}

              value={form.name}

              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <Input
              label="Email"

              type="email"

              value={form.email}

              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"

                variant="secondary"

                onClick={() => setEditing(false)}
              >
                {language === "id" ? "Batal" : "Cancel"}
              </Button>

              <Button
                type="submit"

                disabled={loading}
              >
                {loading
                  ? language === "id"
                    ? "Menyimpan..."
                    : "Saving..."
                  : language === "id"
                    ? "Simpan"
                    : "Save"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
}

export default ProfileSettings;
