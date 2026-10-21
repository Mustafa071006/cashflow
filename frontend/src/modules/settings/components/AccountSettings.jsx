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
          <h2 className="font-display text-product-label font-semibold text-porcelain">
            {language === "id" ? "Akun" : "Account"}
          </h2>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-body font-semibold text-porcelain">
              {language === "id" ? "Keluar" : "Logout"}
            </p>

            <p className="text-body text-ash">
              {language === "id" ? "Keluar dari akun ini." : "Sign out from this account."}
            </p>
          </div>

          <Button
            onClick={handleLogout}

            variant="destructive"
          >
            {language === "id" ? "Keluar" : "Logout"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default AccountSettings;
