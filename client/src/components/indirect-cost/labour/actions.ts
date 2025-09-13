"use server";

import { fetcher } from "@/utils/fetcher";
import { getToken } from "@/utils/get-token";
import { revalidatePath } from "next/cache";
import z from "zod";

const labourSchema = z.object({
  salary: z.coerce.number().min(1),
  hours: z.coerce.number().min(1),
});

export const onCreateAction = async (values: FormData) => {
  const token = await getToken();

  if (!token) {
    console.error("No estas autorizado.");
    return { error: "No estas autorizado." };
  }

  try {
    // Extraer datos del FormData correctamente
    const formDataObject = Object.fromEntries(values);
    const { salary, hours } = formDataObject;

    // Validar los datos
    const validated = labourSchema.safeParse({ salary, hours });
    if (!validated.success) {
      console.error("Validation failed:", validated.error);
      return { error: "Datos inválidos" };
    }

    const data = await fetcher({
      input: `${process.env.SERVER_API}/labour`,
      method: "POST",
      body: JSON.stringify(validated.data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/configuracion");

    return { success: true, data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Error desconocido" };
  }
};
