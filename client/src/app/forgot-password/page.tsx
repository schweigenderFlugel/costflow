import FormForgotPassword from "@/app/forgot-password/form-forgot-password";
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
              Recuperar contraseña
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tu correo electrónico para reestablecer tu contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormForgotPassword />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
