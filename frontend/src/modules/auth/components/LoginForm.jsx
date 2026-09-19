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
    <Card className="w-full max-w-md">
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">
        {t.auth.welcomeBack}
      </h1>

      <p className="mb-8 text-zinc-500 dark:text-zinc-400">{t.auth.signInContinue}</p>

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

            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {t.auth.forgotPassword}
          </Link>
        </div>

        <Button
          type="submit"

          size="lg"

          disabled={isSubmitting}

          className="w-full shadow-lg shadow-zinc-900/10 dark:shadow-black/20"
        >
          {isSubmitting ? t.auth.signingIn : t.auth.signIn}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-zinc-500 dark:text-zinc-400">
          {language === "id" ? "Belum punya akun?" : "Don't have an account?"}
        </span>{" "}
        <Link
          to="/register"

          className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {language === "id" ? "Daftar" : "Register"}
        </Link>
      </div>
    </Card>
  );
}

export default LoginForm;
