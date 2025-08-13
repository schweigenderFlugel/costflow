import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <section className="flex flex-col w-screen h-screen bg-blue-800 justify-center items-center bg-[url(/assets/ui2.jpg)] bg-cover bg-center">
      <main className="w-7/12 h-3/4 shadow-md bg-white rounded-2xl grid grid-cols-1 md:grid-cols-2">
        <div className="rounded-l-2xl bg-white flex flex-col items-center">
          <Image
            src="/assets/logo.png"
            alt="Logo de Costflow"
            width={200}
            height={100}
            className="mt-7"
          />
          <h1 className="text-xl mt-5 font-medium">{title}</h1>
          <p className="text-xs font-light text-gray-400">{subtitle}</p>
          <div className="mt-7 w-2/3">{children}</div>
        </div>
        <aside className="hidden md:block rounded-r-2xl bg-[url(/assets/costosbg.jpg)] bg-cover bg-center"></aside>
      </main>
    </section>
  );
}
