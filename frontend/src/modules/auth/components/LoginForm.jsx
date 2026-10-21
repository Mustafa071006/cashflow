import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

import en from "@/locales/en";
import id from "@/locales/id";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const { language } = useLanguage();

  const t = language === "id" ? id : en;

  const {
    register,

    handleSubmit,

    formState: {
      errors,

      isSubmitting,
    },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      if (response.success) {
        const role = response.data.role;

        if (role === "OWNER") {
          navigate("/owner");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      alert(error.message || (language === "id" ? "Login gagal" : "Login failed"));
    }
  };

  return (
    <Card className="w-full max-w-md" padding="p-8 sm:p-10">
      <h1 className="mb-2 font-display text-hero-name font-semibold text-porcelain">
        {t.auth.welcomeBack}
      </h1>

      <p className="mb-8 text-body text-ash">{t.auth.signInContinue}</p>

      <form
        onSubmit={handleSubmit(onSubmit)}

        className="space-y-4"
      >
        <Input
          label={t.auth.email}

          placeholder={t.auth.emailPlaceholder}

          error={errors.email?.message}

          {...register("email", {
            required: language === "id" ? "Email wajib diisi" : "Email is required",
          })}
        />

        <Input
          label={t.auth.password}

          type="password"

          placeholder={t.auth.passwordPlaceholder}

          error={errors.password?.message}

          {...register("password", {
            required: language === "id" ? "Password wajib diisi" : "Password is required",
          })}
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"

            className="text-utility text-electric-link hover:underline"
          >
            {t.auth.forgotPassword}
          </Link>
        </div>

        <Button
          type="submit"

          size="lg"

          disabled={isSubmitting}

          className="w-full"
        >
          {isSubmitting ? t.auth.signingIn : t.auth.signIn}
        </Button>
      </form>

      <div className="mt-6 text-center text-body">
        <span className="text-ash">
          {language === "id" ? "Belum punya akun?" : "Don't have an account?"}
        </span>{" "}
        <Link
          to="/register"

          className="text-electric-link hover:underline"
        >
          {language === "id" ? "Daftar" : "Register"}
        </Link>
      </div>
    </Card>
  );
}

export default LoginForm;
