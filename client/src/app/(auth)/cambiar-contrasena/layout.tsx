import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata.changePassword();

export default function CambiarContrasenaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
