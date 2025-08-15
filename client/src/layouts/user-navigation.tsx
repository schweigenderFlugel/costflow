"use client"

import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";

const UserNavigation = () => {

  return (
    <div className="flex items-center gap-2">
      <Button variant={"outline"} title="Notificaciones" name="Notificaciones" aria-label="notifications-button">
        <Bell size={15} />
      </Button>

      <Button className="bg-foreground">
        <LogOut size={15} />
        <span className="hidden lg:inline">
          Cerrar sesión
        </span>
      </Button>
    </div>
  )
}

export default UserNavigation
