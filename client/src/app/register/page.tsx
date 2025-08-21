import FormRegister from "@/components/auth/form-register";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {

  return (
    <div className="flex flex-col xl:flex-row xl:h-screen">
      <div
        className="hidden xl:block w-full xl:w-4/8 xl:h-auto bg-cover bg-center"
        style={{ backgroundImage: "url('assets/images/gradientelogin.jpg')" }}
      ></div>

      <div className="w-full xl:w-4/8 flex items-center justify-center xl:p-6 min-h-screen bg-login-mobile xl:bg-transparent">
  <Card className="w-full xl:w-10/12 h-auto border-none shadow-none rounded-none text-white xl:text-black bg-transparent">
    <CardHeader>
      <div>
        <p className="text-center text-4xl xl:hidden my-8 font-bold">
          Cotzia
        </p>
      </div>

      <CardTitle className="text-left text-2xl xl:text-3xl font-bold xl:mb-0 mb-1">
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
