import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useLanguage } from "@/contexts/LanguageContext";

import en from "@/locales/en";
import id from "@/locales/id";

import { checkEmail, resetPassword } from "../services/authService";

function ForgotPasswordForm() {
  const navigate = useNavigate();

  const { language } = useLanguage();

  const t = language === "id" ? id : en;

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const {
    register,

    handleSubmit,

    watch,

    formState: {
      errors,

      isSubmitting,
    },
  } = useForm();

  const password = watch("newPassword");

  const handleCheckEmail = async (data) => {
    try {
      await checkEmail(data.email);

      setEmail(data.email);

      setStep(2);

      toast.success(language === "id" ? "Email ditemukan" : "Email found");
    } catch (error) {
      toast.error(language === "id" ? "Email tidak ditemukan" : "Email not found");
    }
  };

  const handleResetPassword = async (data) => {
    try {
      await resetPassword({
        email,

        newPassword: data.newPassword,
      });

      toast.success(
        language === "id" ? "Password berhasil diperbarui" : "Password updated successfully"
      );

      navigate("/login");
    } catch (error) {
      toast.error(language === "id" ? "Gagal mengubah password" : "Failed to reset password");
    }
  };

  return (
    <Card className="w-full max-w-md" padding="p-8 sm:p-10">
      <h1 className="mb-2 font-display text-hero-name font-semibold text-porcelain">
        {step === 1
          ? t.auth.forgotPasswordTitle
          : language === "id"
            ? "Reset Password"
            : "Reset Password"}
      </h1>

      <p className="mb-8 text-body text-ash">
        {step === 1
          ? t.auth.forgotPasswordDescription
          : language === "id"
            ? "Buat password baru untuk akun Anda."
            : "Create a new password for your account."}
      </p>

      {step === 1 ? (
        <form
          onSubmit={handleSubmit(handleCheckEmail)}

          className="space-y-5"
        >
          <Input
            label={t.auth.email}

            type="email"

            placeholder={t.auth.emailPlaceholder}

            error={errors.email?.message}

            {...register("email", {
              required: language === "id" ? "Email wajib diisi" : "Email is required",
            })}
          />

          <Button
            type="submit"

            size="lg"

            disabled={isSubmitting}

            className="w-full"
          >
            {isSubmitting ? t.auth.signingIn : language === "id" ? "Lanjutkan" : "Continue"}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit(handleResetPassword)}

          className="space-y-5"
        >
          <Input
            label={t.auth.email}

            value={email}

            disabled
          />

          <Input
            label={language === "id" ? "Password Baru" : "New Password"}

            type="password"

            placeholder={language === "id" ? "Masukkan password baru" : "Enter new password"}

            error={errors.newPassword?.message}

            {...register("newPassword", {
              required: language === "id" ? "Password wajib diisi" : "Password is required",

              minLength: {
                value: 6,

                message:
                  language === "id"
                    ? "Password minimal 6 karakter"
                    : "Password minimum 6 characters",
              },
            })}
          />

          <Input
            label={language === "id" ? "Konfirmasi Password" : "Confirm Password"}

            type="password"

            placeholder={language === "id" ? "Ulangi password" : "Repeat password"}

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

            className="w-full"
          >
            {isSubmitting
              ? language === "id"
                ? "Menyimpan..."
                : "Saving..."
              : language === "id"
                ? "Simpan Password"
                : "Save Password"}
          </Button>
        </form>
      )}

      <div className="mt-6 text-center text-body">
        <Link
          to="/login"

          className="text-electric-link hover:underline"
        >
          ← {t.auth.backToLogin}
        </Link>
      </div>
    </Card>
  );
}

export default ForgotPasswordForm;
