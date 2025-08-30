"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailField } from "@/components/shared/auth-fields/email-field";
import {
  ForgotPasswordSchema,
  forgotSchema,
} from "@/schemas/forgot-password-schema";
import { toast } from "sonner";

export default function FormForgotPassword() {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Valores del formulario:", values);
    const id = toast("Hemos enviado un correo electrónico a su dirección", {
      description: "Por favor revise su bandeja de entrada o spam",
      action: {
        label: "Cerrar",
        onClick: () => toast.dismiss(id),
      },
    });
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-2 max-w-md lg:max-w-full w-full mx-auto"
        onSubmit={onSubmit}
      >
        <EmailField control={form.control} errors={form.formState.errors} />

        <Button>Reestablecer contraseña</Button>

        <div className="flex gap-2 justify-center mt-2 text-gray-500">
          <p className="text-sm">¿Ya tienes una cuenta?</p>
          <Link
            href="/inicio-de-sesion"
            className="text-sm hover:text-gray-200 lg:hover:text-gray-700"
          >
            Inicia sesión
          </Link>
        </div>
      </form>
    </Form>
  );
}
