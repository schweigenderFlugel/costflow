import FormRegister from "@/components/auth/form-register";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className="w-full md:w-5/8 h-64 md:h-auto bg-cover bg-center"
        style={{ backgroundImage: "url('assets/costosbg.jpg')" }}
      ></div>
      <div className="w-full md:w-3/8 flex items-center justify-center bg-white p-6">
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Crear cuenta
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tus datos para llevar a cabo el registro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormRegister />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
