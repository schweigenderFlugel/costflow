import FormRegister from "@/components/auth/form-register";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="flex flex-col lg:flex-row ">
      <div
        className="hidden md:block w-full md:w-5/8 lg:h-auto bg-cover bg-center"
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
