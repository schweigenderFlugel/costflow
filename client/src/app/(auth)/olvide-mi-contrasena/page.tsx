import FormForgotPassword from "@/components/auth/form-forgot-password";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata.forgotPassword();

export default function RegisterPage() {
  return (
    <main className="flex flex-col lg:flex-row ">
      <div
        className="hidden lg:block w-full md:w-5/8 lg:h-auto bg-cover bg-center"
        style={{ backgroundImage: "url('assets/images/gradientelogin.jpg')" }}
      ></div>

      <div
        className="w-full lg:w-4/8 flex items-center justify-center lg:p-6 min-h-screen
                 bg-[url('/assets/images/gradientelogin.jpg')] bg-cover bg-center
                 lg:bg-none lg:bg-white"
      >
        <Card className="w-full lg:w-10/12 h-auto border-none shadow-none rounded-none text-white lg:text-black bg-transparent">
          <CardHeader>
            <div>
              <p className="text-center text-3xl lg:hidden my-8 font-bold">
                Cotzia
              </p>
            </div>

            <CardTitle className="text-center text-2xl lg:text-xl font-bold lg:text-left">
              Reestablecer contraseña
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormForgotPassword />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
