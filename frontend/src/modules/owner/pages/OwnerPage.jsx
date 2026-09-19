import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

import useOwner from "../hooks/useOwner";
import { useLanguage } from "@/contexts/LanguageContext";

function OwnerPage() {
  const { stats, users, loading } = useOwner();
  const { language } = useLanguage();

  const loadingLabel = language === "id" ? "Memuat dasbor owner" : "Loading owner dashboard";

  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label={loadingLabel} className="space-y-8">
        <span className="sr-only">{loadingLabel}…</span>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {language === "id" ? "Dasbor Owner" : "Owner Dashboard"}
        </h1>

        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          {language === "id"
            ? "Pantau sistem dan kelola pengguna CashFlow."
            : "Monitor the system and manage CashFlow users."}
        </p>
      </div>

      {/* OWNER STATISTICS */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {language === "id" ? "Total Pengguna" : "Total Users"}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">
            {stats?.totalUsers || 0}
          </h2>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {language === "id" ? "Dompet Saya" : "My Wallets"}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">
            {stats?.totalWallet || 0}
          </h2>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {language === "id" ? "Transaksi Saya" : "My Transactions"}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">
            {stats?.totalTransactions || 0}
          </h2>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {language === "id" ? "Pemasukan Saya" : "My Income"}
          </p>

          <h2 className="mt-3 text-xl font-bold text-green-600 dark:text-green-400">
            {formatRupiah(stats?.income)}
          </h2>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {language === "id" ? "Pengeluaran Saya" : "My Expenses"}
          </p>

          <h2 className="mt-3 text-xl font-bold text-red-600 dark:text-red-400">
            {formatRupiah(stats?.expense)}
          </h2>
        </Card>
      </div>

      {/* USER OVERVIEW */}

      <Card>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            {language === "id" ? "Ringkasan Pengguna" : "User Overview"}
          </h2>

          <span className="text-sm text-zinc-500">
            {users.length} {language === "id" ? "Pengguna" : "Users"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full text-left">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th scope="col" className="px-4 py-3 text-sm">
                  {language === "id" ? "Nama" : "Name"}
                </th>

                <th scope="col" className="px-4 py-3 text-sm">
                  Email
                </th>

                <th scope="col" className="px-4 py-3 text-sm">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {users.slice(0, 5).map((user) => (
                <tr
                  key={user.id}

                  className="border-b border-zinc-100 dark:border-zinc-800"
                >
                  <td className="px-4 py-3 text-sm">{user.name}</td>

                  <td className="px-4 py-3 text-sm">{user.email}</td>

                  <td className="px-4 py-3 text-sm">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default OwnerPage;
