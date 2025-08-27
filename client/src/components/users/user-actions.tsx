"use client"

import { Button } from "@/components/ui/button";
import { useUserMutations } from "@/hooks/mutations/use-user-mutations";
import { UsersData } from "@/types/items/users";
import { CircleCheck, CircleX } from "lucide-react";


const UserActions = ({ user }: { user: UsersData }) => {
  const { acceptUser, rejectUser } = useUserMutations()

  const handleAccept = () => {
    acceptUser.mutate({ userId: user.id })
  }

  const handleReject = () => {
    rejectUser.mutate({ userId: user.id })
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
