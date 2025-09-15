import FormForgotPassword from "@/components/auth/form-forgot-password";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = pageMetadata.forgotPassword();

export default function RegisterPage() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2">
      <div
        className="hidden h-full bg-cover bg-center md:flex items-center justify-center"
        style={{ backgroundImage: "url('assets/images/gradientelogin.jpg')" }}
      >
        <Image
          src={"/assets/logo/white-logo.svg"}
          alt="Logo"
          width={230}
          height={47}
        />
      </div>
      <div
        className="flex items-center justify-center py-3
             bg-[url('/assets/images/gradientelogin.jpg')] bg-cover bg-center
             md:bg-none md:bg-white  min-h-screen"
      >
        <Card className="w-full border-none shadow-none rounded-none text-white md:text-black bg-transparent">
          <CardHeader>
            <div>
              <Image
                src={"/assets/logo/white-logo.svg"}
                alt="Logo"
                className="md:hidden mx-auto mb-8"
                width={230}
                height={47}
              />
            </div>

            <CardTitle className="text-2xl lg:text-xl font-bold max-w-sm mx-auto w-full mb-5">
              Reestablecer contraseña
            </CardTitle>
          </CardHeader>
          <CardContent className="max-w-sm mx-auto w-full">
            <FormForgotPassword />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
