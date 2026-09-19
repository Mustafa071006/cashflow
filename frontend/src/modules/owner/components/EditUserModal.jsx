import { X } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useLanguage } from "@/contexts/LanguageContext";

function EditUserModal({ open, user, onClose, onSubmit }) {
  const { language } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "USER",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",

        email: user.email || "",

        role: user.role || "USER",
      });
    }
  }, [user]);

  if (!open || !user) {
    return null;
  }

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(user.id, form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        {/* HEADER */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              {language === "id" ? "Ubah Pengguna" : "Edit User"}
            </h2>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {language === "id" ? "Perbarui informasi pengguna." : "Update the user's information."}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label={language === "id" ? "Tutup" : "Close"}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-zinc-900"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}

          className="space-y-4"
        >
          <Input
            label={language === "id" ? "Nama" : "Name"}

            name="name"

            value={form.name}

            onChange={handleChange}
          />

          <Input
            label="Email"

            name="email"

            value={form.email}

            onChange={handleChange}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Role
            </label>

            <select
              name="role"

              value={form.role}

              onChange={handleChange}

              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 transition outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
            >
              <option value="USER">USER</option>

              <option value="OWNER">OWNER</option>
            </select>
          </div>

          {/* ACTION */}

          <div className="mt-6 flex gap-3">
            <Button
              type="button"

              variant="secondary"

              onClick={onClose}

              className="flex-1"
            >
              {language === "id" ? "Batal" : "Cancel"}
            </Button>

            <Button
              type="submit"

              className="flex-1"
            >
              {language === "id" ? "Simpan" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
