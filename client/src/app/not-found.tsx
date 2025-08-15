import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-[calc(100svh-8rem)] w-full flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full px-6 py-8 text-center">
                <div className="relative w-fit mx-auto mb-8">
                    <div className="w-64 h-64 rounded-full bg-black text-white content-center">
                        <h2 className="font-extrabold text-5xl">404</h2>
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
                <p className="text-gray-600 mb-8">
                    Es posible que la página que buscas haya sido eliminada o no esté disponible temporalmente.
                </p>
                <Button asChild>
                    <Link href="/">Volver al inicio</Link>
                </Button>
            </div>
        </div>
    );
}
