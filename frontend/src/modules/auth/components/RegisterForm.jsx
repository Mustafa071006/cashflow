import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useLanguage } from "@/contexts/LanguageContext";

import en from "@/locales/en";
import id from "@/locales/id";

import { register as registerUser } from "../services/authService";

function RegisterForm() {
  const navigate = useNavigate();

  const { language } = useLanguage();

  const t = language === "id" ? id : en;

  const {
    register,

    handleSubmit,

    watch,

    formState: {
      errors,

      isSubmitting,
    },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,

        email: data.email,

        password: data.password,
      });

      toast.success(t.auth.registerSuccess);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || t.auth.registerFailed);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">
        {t.auth.registerTitle}
      </h1>

      <p className="mb-8 text-zinc-500 dark:text-zinc-400">{t.auth.registerDescription}</p>

      <form
        onSubmit={handleSubmit(onSubmit)}

        className="space-y-4"
      >
        <Input
          label={t.auth.name}

          placeholder={t.auth.namePlaceholder}

          error={errors.name?.message}

          {...register("name", {
            required: language === "id" ? "Nama wajib diisi" : "Name is required",
          })}
        />

        <Input
          label={t.auth.email}

          type="email"

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

            minLength: {
              value: 6,

              message:
                language === "id" ? "Password minimal 6 karakter" : "Password minimum 6 characters",
            },
          })}
        />

        <Input
          label={t.auth.confirmPassword}

          type="password"

          placeholder={t.auth.confirmPasswordPlaceholder}

          error={errors.confirmPassword?.message}

          {...register("confirmPassword", {
            required:
              language === "id"
                ? "Konfirmasi password wajib diisi"
                : "Confirm password is required",

            validate: (value) =>
              value === password ||
              (language === "id" ? "Password tidak sama" : "Passwords do not match"),
          })}
        />

        <Button
          type="submit"

          size="lg"

          disabled={isSubmitting}

          className="w-full shadow-lg shadow-zinc-900/10 dark:shadow-black/20"
        >
          {isSubmitting ? t.auth.registering : t.auth.register}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-zinc-500 dark:text-zinc-400">{t.auth.alreadyHaveAccount}</span>{" "}
        <Link
          to="/login"

          className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {t.auth.loginHere}
        </Link>
      </div>
    </Card>
  );
}

export default RegisterForm;
