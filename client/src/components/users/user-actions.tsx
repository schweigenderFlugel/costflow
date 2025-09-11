"use client";

import { Button } from "@/components/ui/button";
import { useUserMutations } from "@/hooks/mutations/use-user-mutations";
import { UsersData } from "@/interfaces/interface-users";
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const UserActions = ({ user }: { user: UsersData }) => {
  const { acceptUser, rejectUser } = useUserMutations();

  const handleAccept = () => {
    acceptUser.mutate({ userId: user.id });
  };

  const handleReject = () => {
    rejectUser.mutate({ userId: user.id });
  };

  if (user.state !== "PENDING")
    return (
      <div className="flex gap-0.5 justify-center">
        <Button
          size="icon"
          variant="outline-ghost"
          className="text-primary hover:text-[#1B05DF]"
          title="Editar usuario"
          disabled
        >
          <PencilIcon className="size-5" />
        </Button>
        <Button
          size="icon"
          variant="outline-ghost"
          className="text-red-800 hover:text-red-600"
          title="Eliminar usuario"
          disabled
        >
          <TrashIcon className="size-5" />
        </Button>
      </div>
    );

  return (
    <div className="flex gap-0.5 justify-center">
      <Button
        size="icon"
        variant="outline-ghost"
        className="text-emerald-800 hover:text-emerald-600"
        onClick={handleAccept}
        title="Aceptar usuario"
      >
        <CheckCircleIcon className="size-5" />
      </Button>
      <Button
        size="icon"
        variant="outline-ghost"
        className="text-red-800 hover:text-red-600"
        onClick={handleReject}
        title="Denegar usuario"
      >
        <XCircleIcon className="size-5" />
      </Button>
    </div>
  );
};

export default UserActions;
