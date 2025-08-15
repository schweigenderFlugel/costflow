import FormLogin from "@/components/auth/form-login";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex flex-col-reverse md:flex-row-reverse md:h-screen">
      <div className="w-full md:w-3/8 flex items-center justify-center md:p-6">
        <Card className="w-full md:w-10/12 h-screen md:h-auto border-none shadow-none bg-login-mobile rounded-none text-white md:text-black">
          <CardHeader>
            <div>
              <p className="text-center text-4xl md:hidden m-20 font-bold">Cotzia</p>
            </div>

            <CardTitle className="text-left text-2xl md:text-3xl font-bold md:mb-14 mb-7">
              Iniciar sesión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormLogin />
          </CardContent>
        </Card>
      </div>
      <div
        className="hidden md:block w-full md:w-5/8 md:h-auto bg-cover bg-center"
        style={{ backgroundImage: "url('assets/images/gradientelogin.jpg')" }}
      ></div>
    </div>
  );
}
