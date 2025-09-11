"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PasswordField } from "@/components/shared/auth-fields/password-field";
import { fetcher } from "@/utils/fetcher";
import { itemToasts } from "@/components/shared/item-toasts";
import { useTransition } from "react";
import SpinLoader from "@/components/shared/spin-loader";
import {
  changePasswordSchema,
  type ChangePasswordForm,
} from "@/types/type-password-schema";

export default function CambiarContrasenaPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [isPending, startTransition] = useTransition();

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    if (!code) {
      itemToasts.error({
        description: "El código de recuperación no está presente en la URL",
        type: "recuperación",
      });
      return;
    }

    startTransition(async () => {
      const data = await fetcher({
        input: `/api/auth/reset-password?code=${code}`,
        method: "PUT",
        body: JSON.stringify({ password: values.password }),
      });

      if (data?.success) {
        itemToasts.updateSuccess({
          type: "contraseña",
          description: data.message,
        });
        window.location.href = "/inicio-de-sesion";
        return;
      }

      itemToasts.error({
        description: data.message || data.detail || "No se pudo actualizar",
        type: "recuperación",
      });
    });
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Cambiar contraseña</h1>
      <Form {...form}>
        <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
          <PasswordField
            control={form.control}
            errors={form.formState.errors}
            name="password"
            label="Nueva contraseña"
            placeholder="Escribe tu nueva contraseña"
          />

          <PasswordField
            control={form.control}
            errors={form.formState.errors}
            name="confirmPassword"
            label="Repetir contraseña"
            placeholder="Repite tu nueva contraseña"
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <SpinLoader isPending={isPending} />}
            {isPending ? "Guardando..." : "Guardar nueva contraseña"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
