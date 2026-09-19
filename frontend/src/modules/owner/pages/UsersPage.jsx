import { useState } from "react";

import UserTable from "../components/UserTable";
import EditUserModal from "../components/EditUserModal";
import Skeleton from "@/components/ui/Skeleton";

import useOwner from "../hooks/useOwner";
import { useLanguage } from "@/contexts/LanguageContext";

function UsersPage() {
  const { users, loading, updateUser, deleteUser } = useOwner();
  const { language } = useLanguage();

  const [selectedUser, setSelectedUser] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);

    setIsEditOpen(true);
  };

  const handleUpdate = async (id, data) => {
    await updateUser(id, data);

    setIsEditOpen(false);

    setSelectedUser(null);
  };

  const handleDelete = (user) => {
    const confirmMessage =
      language === "id"
        ? `Yakin ingin menghapus ${user.name}?`
        : `Are you sure you want to delete ${user.name}?`;

    const confirmDelete = window.confirm(confirmMessage);

    if (!confirmDelete) return;

    deleteUser(user.id);
  };

  const loadingLabel = language === "id" ? "Memuat pengguna" : "Loading users";

  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label={loadingLabel} className="space-y-6">
        <span className="sr-only">{loadingLabel}…</span>
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {language === "id" ? "Kelola Pengguna" : "Manage Users"}
        </h1>

        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          {language === "id" ? "Kelola akun pengguna CashFlow." : "Manage CashFlow user accounts."}
        </p>
      </div>

      <UserTable
        users={users}

        onEdit={handleEdit}

        onDelete={handleDelete}
      />

      <EditUserModal
        open={isEditOpen}

        user={selectedUser}

        onClose={() => {
          setIsEditOpen(false);

          setSelectedUser(null);
        }}

        onSubmit={handleUpdate}
      />
    </div>
  );
}

export default UsersPage;
