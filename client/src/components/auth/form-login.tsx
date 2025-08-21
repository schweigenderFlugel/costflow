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
import { toast } from "sonner";

export default function FormLogin() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Valores del formulario:", values);
    const id = toast("Inicio de sesión exitoso", {
      description: `Bienvenido, ${values.email}`,
      action: {
        label: "Cerrar",
        onClick: () => toast.dismiss(id),
      },
    });
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-5 xl:gap-y-6" onSubmit={onSubmit}>
        <EmailField control={form.control} errors={form.formState.errors} />
        <PasswordField control={form.control} errors={form.formState.errors} />
        <Link
          href="/olvide-mi-contrasena"
          className="text-sm text-gray-600 hover:text-gray-800 text-right"
        >
          ¿Olvidaste la contraseña?
        </Link>

        <div className="md:flex md:gap-2 md:*:flex-1 *:text-lg *:font-bold *:w-full *:p-6">
          <Button variant="default">Iniciar sesión</Button>

          <div className="flex items-center md:hidden">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500">o</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <Button
            asChild
            variant="ghost"
            className="bg-gray-900 text-white md:text-black hover:bg-gray-800 md:bg-transparent md:hover:bg-gray-100"
          >
            <Link href="/register">Crear cuenta</Link>
          </Button>
        </div>

        <div className="flex gap-2 justify-center mt-10 text-gray-500">
          <p className="text-sm">¿Necesitas ayuda con COTZIA?</p>
          <Link
            href="/register"
            className="text-sm underline text-blue-600 hover:text-blue-800"
          >
            Clickea aquí
          </Link>
        </div>
      </form>
    </Form>
  );
}
