"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, RegisterFormSchema } from "@/schemas/register-schema";
import { TextField } from "@/components/shared/auth-fields/text-field";
import { PasswordField } from "@/components/shared/auth-fields/password-field";
import { fetcher } from "@/utils/fetcher";
import { Checkbox } from "@/components/ui/checkbox";
import { itemToasts } from "@/components/shared/item-toasts";
import { useTransition } from "react";
import SpinLoader from "@/components/shared/spin-loader";

const dtoValues = (values: {
  name: string,
  lastname: string,
  workstation: string,
  email: string,
  password: string
}) => ({
  "name": values.name,
  "lastname": values.lastname,
  "workstation": values.workstation,
  "email": values.email,
  "password": values.password
})

const defaultValues = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  workstation: "",
  terms: false,
}

export default function FormRegister() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const data = await fetcher({
        input: "/api/auth/register",
        method: "POST",
        body: JSON.stringify(dtoValues(values))
      })

      form.reset()

      itemToasts.info({
        description: data?.success ? data.message : data,
        type: "registro"
      })
    })
  });

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        className="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-5 bg-login-transparent max-w-md md:max-w-full w-full mx-auto"
        onSubmit={onSubmit}
      >
        <TextField<RegisterFormSchema>
          name="name"
          label="Nombre"
          control={form.control}
          errors={form.formState.errors}
          className="py-5 xl:py-6 bg-white text-black w-full"
          placeholder="Ingresá tu nombre"
        />

        <TextField<RegisterFormSchema>
          name="lastname"
          label="Apellido"
          control={form.control}
          errors={form.formState.errors}
          className="py-5 xl:py-6 bg-white text-black w-full"
          placeholder="Ingresá tu apellido"
        />
        <TextField<RegisterFormSchema>
          name="workstation"
          label="Puesto"
          control={form.control}
          errors={form.formState.errors}
          className="py-5 xl:py-6 bg-white text-black w-full"
          placeholder="Ingresá tu puesto"
        />

        <TextField<RegisterFormSchema>
          name="email"
          label="Correo electrónico"
          type="email"
          control={form.control}
          errors={form.formState.errors}
          className="py-5 xl:py-6 bg-white text-black w-full"
          placeholder="Ingresá tu correo electrónico"
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
            <FormItem className="flex flex-row justify-center items-center space-y-0 col-span-full">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                Acepto los
                <span className="underline underline-offset-2">
                  términos y condiciones
                </span>
              </FormLabel>
            </FormItem>
          )}
        />
        {form.formState.errors.terms && (
          <p className="text-red-500 text-sm col-span-full text-center">
            {form.formState.errors.terms.message}
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-2 col-span-full mt-4 *:font-bold ">
          <Button variant="default" className="p-6 w-full md:flex-1" disabled={isPending}>
            {isPending && <SpinLoader isPending={isPending} />}
            {
              isPending ? "Creando..." : "  Crear cuenta"
            }
          </Button>

          <div className="flex items-center md:hidden my-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500">o</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <Button
            asChild
            variant="ghost"
            className="p-6 w-full md:flex-1 bg-gray-900 text-white lg:text-black hover:bg-gray-800 hover:text-white lg:bg-transparent lg:hover:bg-gray-100 lg:hover:text-black"
          >
            <Link href="/inicio-de-sesion">Iniciar sesión</Link>
          </Button>
        </div>
      </form>
    </Form >
  );
}
