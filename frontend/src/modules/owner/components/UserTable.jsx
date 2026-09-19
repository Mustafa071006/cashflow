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
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            {language === "id" ? "Kelola Pengguna" : "Manage Users"}
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {language === "id" ? "Kelola akun pengguna CashFlow." : "Manage CashFlow user accounts."}
          </p>
        </div>

        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {users.length} {language === "id" ? "Pengguna" : "Users"}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                {language === "id" ? "Nama" : "Name"}
              </th>

              <th scope="col" className="px-4 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                Email
              </th>

              <th scope="col" className="px-4 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                Role
              </th>

              <th scope="col" className="px-4 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                {language === "id" ? "Dibuat" : "Created"}
              </th>

              <th scope="col" className="px-4 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                {language === "id" ? "Aksi" : "Action"}
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}

                className="border-b border-zinc-100 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                <td className="px-4 py-4 text-sm text-zinc-900 dark:text-white">{user.name}</td>

                <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">{user.email}</td>

                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      user.role === "OWNER"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                    } `}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                  {new Date(user.createdAt).toLocaleDateString(
                    language === "id" ? "id-ID" : "en-US",
                  )}
                </td>

                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      aria-label={`${language === "id" ? "Ubah" : "Edit"} ${user.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <Pencil size={16} aria-hidden="true" />
                    </button>

                    <button
                      onClick={() => onDelete(user)}
                      aria-label={`${language === "id" ? "Hapus" : "Delete"} ${user.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-500 dark:border-red-900 dark:hover:bg-red-950"
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
        <div className="py-10 text-center text-sm text-zinc-500">
          {language === "id" ? "Belum ada pengguna." : "No users yet."}
        </div>
      )}
    </Card>
  );
}

export default memo(UserTable);
