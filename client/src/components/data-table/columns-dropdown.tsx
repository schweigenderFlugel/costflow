import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { ObjFeedstock } from "@/types/items/feedstock";
import { translateFeedstockHeaders } from "@/utils/translate/feedstock";
import { translateUserHeaders } from "@/utils/translate/user";
import { UsersData } from "@/types/items/users";

type DropdownProps<T> = {
  table: Table<T>;
  columnsTo: "feedstock" | "product" | "users";
};

const ColumnsDropdown = <TData,>({
  table,
  columnsTo,
}: DropdownProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {columnsTo === "users"
                  ? translateUserHeaders(column.id as keyof UsersData)
                  : columnsTo === "feedstock"
                  ? translateFeedstockHeaders(column.id as keyof ObjFeedstock)
                  : column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnsDropdown;
