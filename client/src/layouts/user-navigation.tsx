"use client"

import SpinLoader from "@/components/shared/spin-loader";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/utils/fetcher";
import { Bell, LogOut } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const UserNavigation = () => {
  const [isPending, startTransition] = useTransition()

  const onLogout = () => {
    startTransition(async () => {
      const data = await fetcher({ input: "/api/auth/logout" })
      toast(data.message || data.detail)
      window.location.reload()
    })
  }




  return (
    <div className="flex items-center gap-2">
      <Button variant={"outline"} title="Notificaciones" name="Notificaciones" disabled aria-label="notifications-button">
        <Bell size={15} />
      </Button>

      <Button variant={"outline"} onClick={onLogout} disabled={isPending}>
        <LogOut size={15} />
        <span className="hidden lg:inline">
          {isPending ? "Cerrando..." : "Cerrar sesión"}
        </span>
        <SpinLoader isPending={isPending} />
      </Button>
    </div>
  )
}

export default UserNavigation
