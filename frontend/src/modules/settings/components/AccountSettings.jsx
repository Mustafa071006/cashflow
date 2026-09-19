import { useNavigate } from "react-router-dom";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

function AccountSettings() {
  const { logout } = useAuth();

  const { language } = useLanguage();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {language === "id" ? "Akun" : "Account"}
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-zinc-900 dark:text-white">
              {language === "id" ? "Keluar" : "Logout"}
            </p>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {language === "id" ? "Keluar dari akun ini." : "Sign out from this account."}
            </p>
          </div>

          <Button
            onClick={handleLogout}

            className="bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          >
            {language === "id" ? "Keluar" : "Logout"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default AccountSettings;
