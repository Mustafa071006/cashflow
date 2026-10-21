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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-card bg-carbon p-6 ring-1 ring-keyline sm:p-8">
        {/* HEADER */}

        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-feature-stat font-semibold text-porcelain">
              {language === "id" ? "Ubah Pengguna" : "Edit User"}
            </h2>

            <p className="mt-2 text-body text-ash">
              {language === "id" ? "Perbarui informasi pengguna." : "Update the user's information."}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label={language === "id" ? "Tutup" : "Close"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-steel/60 text-ash transition hover:bg-steel hover:text-porcelain"
          >
            <X size={16} aria-hidden="true" />
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
            <label htmlFor="edit-user-role" className="mb-2 block text-utility font-semibold text-ash">
              Role
            </label>

            <select
              id="edit-user-role"

              name="role"

              value={form.role}

              onChange={handleChange}

              className="h-11 w-full rounded-full border border-slate bg-white/4 pr-10 pl-6 text-body text-porcelain transition-colors hover:border-ash focus:outline-1 focus:outline-offset-1 focus:outline-apple-blue"
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
