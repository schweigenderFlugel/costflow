import FormLogin from "@/components/auth/form-login";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen">
      <div className="w-full md:w-3/8 flex items-center justify-center bg-white p-6">
        <Card className="w-3/4 max-w-md border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Iniciar sesión
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tu correo y contraseña para iniciar sesión
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormLogin />
          </CardContent>
        </Card>
      </div>
      <div
        className="w-full md:w-5/8 h-screen md:h-auto bg-cover bg-center"
        style={{ backgroundImage: "url('assets/costosbg.jpg')" }}
      ></div>
    </div>
  );
}
