import { memo } from "react";
import { Pencil, Trash2 } from "lucide-react";

import Card from "@/components/ui/Card";
import { useLanguage } from "@/contexts/LanguageContext";

function UserTable({ users = [], onEdit, onDelete }) {
  const { language } = useLanguage();

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-product-label font-semibold text-porcelain">
            {language === "id" ? "Kelola Pengguna" : "Manage Users"}
          </h2>

          <p className="mt-1 text-body text-ash">
            {language === "id" ? "Kelola akun pengguna CashFlow." : "Manage CashFlow user accounts."}
          </p>
        </div>

        <span className="text-utility text-ash">
          {users.length} {language === "id" ? "Pengguna" : "Users"}
        </span>
      </div>

      <div className="scroll-area overflow-x-auto">
        <table className="w-full min-w-175 text-left">
          <thead>
            <tr className="border-b border-steel">
              <th scope="col" className="px-4 py-3 text-utility font-semibold text-ash">
                {language === "id" ? "Nama" : "Name"}
              </th>

              <th scope="col" className="px-4 py-3 text-utility font-semibold text-ash">
                Email
              </th>

              <th scope="col" className="px-4 py-3 text-utility font-semibold text-ash">
                Role
              </th>

              <th scope="col" className="px-4 py-3 text-utility font-semibold text-ash">
                {language === "id" ? "Dibuat" : "Created"}
              </th>

              <th scope="col" className="px-4 py-3 text-utility font-semibold text-ash">
                {language === "id" ? "Aksi" : "Action"}
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}

                className="border-b border-steel/60 transition-colors last:border-0 hover:bg-white/3"
              >
                <td className="px-4 py-4 text-body font-medium text-porcelain">{user.name}</td>

                <td className="px-4 py-4 text-body text-ash">{user.email}</td>

                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-utility font-medium ${
                      user.role === "OWNER"
                        ? "bg-porcelain text-obsidian"
                        : "border border-slate text-ash"
                    } `}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-4 text-body text-ash">
                  {new Date(user.createdAt).toLocaleDateString(
                    language === "id" ? "id-ID" : "en-US",
                  )}
                </td>

                <td className="px-4 py-4">
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEdit(user)}
                      aria-label={`${language === "id" ? "Ubah" : "Edit"} ${user.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-ash transition hover:bg-white/5 hover:text-porcelain"
                    >
                      <Pencil size={16} aria-hidden="true" />
                    </button>

                    <button
                      onClick={() => onDelete(user)}
                      aria-label={`${language === "id" ? "Hapus" : "Delete"} ${user.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-ash transition hover:bg-expense/10 hover:text-expense"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="py-10 text-center text-body text-ash">
          {language === "id" ? "Belum ada pengguna." : "No users yet."}
        </div>
      )}
    </Card>
  );
}

export default memo(UserTable);
