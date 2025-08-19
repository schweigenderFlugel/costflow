"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, RegisterFormSchema } from "@/schemas/register-schema";
import { TextField } from "@/components/field-forms/text-field";
import { PasswordField } from "@/components/field-forms/password-field";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
// } from "@/components/ui/form";
// import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { fetcher } from "@/utils/fetcher";

export default function FormRegister() {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      // name: "",
      // lastname: "",
      email: "",
      password: "",
      // terms: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    // console.log("Valores del registro:", values);
    const data = await fetcher({
      input: process.env.NEXT_PUBLIC_SERVER_API + "/auth/register",
      method: "POST",
      body: JSON.stringify(values)
    })

    console.log(data);


    const id = toast("Registro", {
      description: data.message || data.description || data.detail,
      // "Tu cuenta ha sido creada y está pendiente de aprobación por el administrador.",
      action: {
        label: "Cerrar",
        onClick: () => toast.dismiss(id),
      },
    });
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-6" onSubmit={onSubmit}>
        {/* <TextField<RegisterFormSchema>
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
        /> */}

        <TextField<RegisterFormSchema>
          name="email"
          label="Correo"
          type="email"
          control={form.control}
          errors={form.formState.errors}
        />

        <PasswordField control={form.control} errors={form.formState.errors} />

        {/* <FormField
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
        /> */}
        {/* {form.formState.errors.terms && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.terms.message}
          </p>
        )} */}

        <div className="md:flex md:gap-2 md:*:flex-1 *:text-lg *:font-bold *:w-full *:p-6">
          <Button variant="default">Crear cuenta</Button>

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
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div>

        <div className="flex gap-2 justify-center mt-14 text-gray-500">
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
