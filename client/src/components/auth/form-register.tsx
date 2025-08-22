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
      passwordConfirmation: "",
      workstation: "",
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
      <form
        className="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-5 bg-login-transparent"
        onSubmit={onSubmit}
      >
        <TextField<RegisterFormSchema>
          name="name"
          label="Nombre"
          control={form.control}
          errors={form.formState.errors}
          className="placeholder:italic py-5 xl:py-6 bg-white text-black w-full"
          placeholder="Ingresá tu nombre"
        />

        <TextField<RegisterFormSchema>
          name="lastname"
          label="Apellido"
          control={form.control}
          errors={form.formState.errors}
          className="placeholder:italic py-5 xl:py-6 bg-white text-black w-full"
          placeholder="Ingresá tu apellido"
        />
        <TextField<RegisterFormSchema>
          name="workstation"
          label="Puesto"
          control={form.control}
          errors={form.formState.errors}
          className="placeholder:italic py-5 xl:py-6 bg-white text-black w-full"
          placeholder="Ingresá tu puesto"
        />

        <TextField<RegisterFormSchema>
          name="email"
          label="E-Mail"
          type="email"
          control={form.control}
          errors={form.formState.errors}
          className="placeholder:italic py-5 xl:py-6 bg-white text-black w-full"
          placeholder="Ingresá tu E-Mail"
        />

        <PasswordField
          control={form.control}
          errors={form.formState.errors}
          name="password"
          label="Contraseña"
          placeholder="Ingresá tu contraseña"
        />

        <PasswordField
          control={form.control}
          errors={form.formState.errors}
          name="passwordConfirmation"
          label="Confirmar contraseña"
          placeholder="Ingresá de nuevo tu contraseña"
        />

        <FormField
          name="terms"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 col-span-full">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                Acepto los
                <Link href="#" className="underline underline-offset-2">
                  términos y condiciones
                </Link>
              </FormLabel>
            </FormItem>
          )}
        />
        {form.formState.errors.terms && (
          <p className="text-red-500 text-sm col-span-full">
            {form.formState.errors.terms.message}
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-2 col-span-full mt-4 *:font-bold *:text-lg">
          <Button variant="default" className="p-6 w-full md:flex-1">
            Crear cuenta
          </Button>

          <div className="flex items-center md:hidden my-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500">o</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <Button
            asChild
            variant="ghost"
            className="p-6 w-full md:flex-1 bg-gray-900 text-white lg:text-black hover:bg-gray-800 lg:bg-transparent lg:hover:bg-gray-100"
          >
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
