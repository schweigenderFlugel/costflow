"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, RegisterFormSchema } from "@/schemas/register-schema";
import { TextField } from "@/components/field-forms/text-field";
import { PasswordField } from "@/components/field-forms/password-field";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function FormRegister() {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Valores del registro:", values);
    const id = toast("Registro exitoso", {
      description:
        "Tu cuenta ha sido creada y está pendiente de aprobación por el administrador.",
      action: {
        label: "Cerrar",
        onClick: () => toast.dismiss(id),
      },
    });
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
        <TextField<RegisterFormSchema>
          name="name"
          label="Nombre"
          control={form.control}
          errors={form.formState.errors}
        />

        <TextField<RegisterFormSchema>
          name="lastname"
          label="Apellido"
          control={form.control}
          errors={form.formState.errors}
        />

        <TextField<RegisterFormSchema>
          name="email"
          label="Correo"
          type="email"
          control={form.control}
          errors={form.formState.errors}
        />

        <PasswordField control={form.control} errors={form.formState.errors} />

        <FormField
          name="terms"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                Acepto los
                <Link
                  href="#"
                  className="underline underline-offset-2"
                  // target="_blank"
                  // rel="noopener noreferrer"
                >
                  términos y condiciones
                </Link>
              </FormLabel>
            </FormItem>
          )}
        />
        {form.formState.errors.terms && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.terms.message}
          </p>
        )}

        <Button>Registrarme</Button>

        <div className="flex gap-2 justify-center mt-2 text-gray-500">
          <p className="text-sm">¿Ya tienes una cuenta?</p>
          <Link href="/login" className="text-sm hover:text-gray-700">
            Inicia sesión
          </Link>
        </div>
      </form>
    </Form>
  );
}
