import FormLogin from "@/components/auth/form-login";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
      <div className="flex flex-col xl:flex-row h-screen">
        <div
          className="hidden xl:block w-full xl:w-5/8 xl:h-auto bg-cover bg-center"
          style={{ backgroundImage: "url('assets/images/gradientelogin.jpg')" }}
        ></div>

        <div className="w-full xl:w-3/8 flex items-center justify-center xl:p-6 h-auto bg-login-mobile xl:bg-white">
          <Card className="h-screen xl:h-auto w-full xl:w-10/12 border-none shadow-none rounded-none text-white xl:text-black bg-transparent">
            <CardHeader>
              <div>
                <p className="text-center text-4xl xl:hidden my-12 font-bold">
                  Cotzia
                </p>
              </div>

              <CardTitle className="text-left text-2xl xl:text-3xl font-bold xl:mb-10 mb-7">
                Iniciar sesión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormLogin />
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
