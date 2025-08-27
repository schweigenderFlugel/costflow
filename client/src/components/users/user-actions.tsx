"use client"

import { itemToasts } from "@/components/item-toasts";
import { Button } from "@/components/ui/button";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import { UsersData } from "@/types/items/users";
import { fetcher } from "@/utils/fetcher";
import { CircleCheck, CircleX } from "lucide-react";

const UserActions = ({ user }: { user: UsersData }) => {
  const { toggle } = useUpdateDataTable("users")


  const handleAccept = async () => {
    const data = await fetcher({ input: `/api/users/accept?id=${user.id}` })
    if (data.success) {
      toggle()
      itemToasts.info({ description: data.message, type: "usuario" })
    } else {
      itemToasts.error({ description: (data.message || data.detail || data.error), type: "usuario" })
    }
  }

  const handleReject = async () => {
    const data = await fetcher({ input: `/api/users/reject?id=${user.id}` })
    if (data.success) {
      toggle()
      itemToasts.info({ description: data.message, type: "usuario" })
    } else {
      itemToasts.error({ description: (data.message || data.detail || data.error), type: "usuario" })
    }
  }


  if (user.state !== "PENDING") return (
    <div className="text-center">
      <Button
        size="sm"
        variant="outline"
        className="bg-yellow-200 text-xs"
        onClick={() => console.log("Change to pending", user.id)}
        disabled
      >
        Modificar
      </Button>
    </div>);

  return (
    <div className="flex gap-1 justify-center">
      <Button
        size="icon"
        variant="outline-ghost"
        className="text-emerald-800 hover:text-emerald-600"
        onClick={handleAccept}
        title="Aceptar usuario"
      >
        <CircleCheck className="size-6" />
      </Button>
      <Button
        size="icon"
        variant="outline-ghost"
        className="text-red-800 hover:text-red-600"
        onClick={handleReject}
        title="Denegar usuario"
      >
        <CircleX className="size-6" />
      </Button>
    </div>
  );
}

export default UserActions;
