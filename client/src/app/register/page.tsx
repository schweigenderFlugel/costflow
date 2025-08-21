import FormRegister from "@/components/auth/form-register";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className="hidden md:block w-full md:w-5/8 md:h-auto bg-cover bg-center"
        style={{ backgroundImage: "url('assets/images/gradientelogin.jpg')" }}
      ></div>

      <div className="w-full md:w-3/8 flex items-center justify-center md:p-6 min-h-screen bg-login-mobile">
        <Card className="w-full md:w-10/12 h-screen md:h-auto border-none shadow-none rounded-none text-white md:text-black bg-transparent">
          <CardHeader>
            <div>
              <p className="text-center text-4xl md:hidden my-2 font-bold">
                Cotzia
              </p>
            </div>

            <CardTitle className="text-left text-2xl md:text-3xl font-bold md:mb-10 mb-1">
              Crear cuenta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormRegister />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
