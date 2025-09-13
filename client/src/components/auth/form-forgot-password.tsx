"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailField } from "@/components/shared/auth-fields/email-field";
import { forgotSchema } from "@/schemas/forgot-password-schema";
import { toast } from "sonner";
import { ForgotPasswordSchema } from "@/types/type-forgot-password";

export default function FormForgotPassword() {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit(() => {
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
        className="flex flex-col gap-y-4 lg:gap-y-5 justify-center mx-auto max-w-xs"
        onSubmit={onSubmit}
      >
        <EmailField control={form.control} errors={form.formState.errors} />

        <Button className="mt-4">Reestablecer contraseña</Button>

        <div className="flex gap-2 justify-center mt-2 text-muted-foreground">
          <p className="text-sm">¿Ya tienes una cuenta?</p>
          <Button asChild variant={"link"} className="p-0 h-fit text-inherit">
            <Link
              href="/inicio-de-sesion"
              className="text-sm"
            >
              Inicia sesión
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
