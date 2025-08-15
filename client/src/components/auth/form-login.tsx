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
      <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
        <EmailField control={form.control} errors={form.formState.errors} />
        <PasswordField control={form.control} errors={form.formState.errors} />

        <Link
          href="/olvide-mi-contrasena"
          className="text-sm text-gray-600 hover:text-gray-800 my-2"
        >
          Olvidé mi contraseña
        </Link>

        <Button>Ingresar</Button>

        <div className="flex gap-2 justify-center mt-2 text-gray-500">
          <p className="text-sm">¿No tienes una cuenta?</p>
          <Link href="/register" className="text-sm hover:text-gray-700">
            Regístrate
          </Link>
        </div>
      </form>
    </Form>
  );
}
