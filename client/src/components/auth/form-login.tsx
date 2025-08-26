"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/schemas/login-schema";
import { EmailField } from "@/components/field-forms/email-field";
import { PasswordField } from "@/components/field-forms/password-field";
import type { LoginFormSchema } from "@/schemas/login-schema";
import { fetcher } from "@/utils/fetcher";
import { itemToasts } from "@/components/item-toasts";
import { useTransition } from "react";
import SpinLoader from "@/components/shared/spin-loader";

const defaultValues = {
  email: "",
  password: "",
}


export default function FormLogin() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(userSchema),
    defaultValues
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const data = await fetcher({ input: "/api/auth/login", method: "POST", body: JSON.stringify(values) })
      if (data?.success) {
        window.location.reload()
        itemToasts.info({
          description: data.message || data.description || data.detail,
          message: "¡Bienvenido nuevamente!"
        })
        return;
      }

      itemToasts.error({
        description: data.message || data.description || data.detail,
        type: "inicio de sesión"
      })
      form.reset()
    })
  });

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        className="flex flex-col gap-y-5 lg:gap-y-6 max-w-lg mx-auto"
        onSubmit={onSubmit}
      >
        <EmailField control={form.control} errors={form.formState.errors} />
        <PasswordField
          control={form.control}
          errors={form.formState.errors}
          name="password"
          label="Contraseña"
          placeholder="Ingresá tu contraseña"
        />
        <Link
          href="/olvide-mi-contrasena"
          className="text-sm text-gray-600 text-right hover:text-gray-200 lg:hover:text-gray-700"
        >
          ¿Olvidaste la contraseña?
        </Link>

        <div className="lg:flex lg:gap-2 lg:*:flex-1 *:font-bold *:w-full *:p-6">
          <Button variant="default" disabled={isPending}>
            {isPending && <SpinLoader isPending={isPending} />}
            {
              isPending ? "Iniciando..." : "Iniciar sesión"
            }
          </Button>

          <div className="flex items-center lg:hidden">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500">o</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <Button
            asChild
            variant="ghost"
            className="p-6 w-full lg:flex-1 bg-gray-900 text-white lg:text-black hover:bg-gray-800 hover:text-white lg:bg-transparent lg:hover:bg-gray-100 lg:hover:text-black"
          >
            <Link href="/registro">Crear cuenta</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
