"use client";
import { Button } from "@/components/ui/button";
import {
  useDeleteProductDialog,
  useUpdateProductDialog,
} from "@/hooks/use-product-dialog";
import { ObjProduct } from "@/interfaces/interface-product";
import { fetcher } from "@/utils/fetcher";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const ProductActions = ({ product }: { product: ObjProduct }) => {
  const {
    setIsOpen: setUpdateState,
    setProduct: setUpdateProduct,
    setIsLoadingProduct,
  } = useUpdateProductDialog();
  const { setIsOpen: setDeleteState, setProduct: setDeleteProduct } =
    useDeleteProductDialog();

  const handleDelete = () => {
    setDeleteState(true);
    setDeleteProduct(product);
  };

  const handleUpdate = async () => {
    setIsLoadingProduct(true);
    setUpdateState(true);

    try {
      const allInfoToProduct = await fetcher({
        input: `/api/product/${product.id}`,
      });

      if (!("error" in allInfoToProduct) && !allInfoToProduct.detail) {
        setUpdateProduct(allInfoToProduct);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoadingProduct(false);
    }
  };

  return (
    <div className="flex gap-0.5 justify-center">
      <Button
        data-slot="product-update-dialog-trigger"
        onClick={handleUpdate}
        type="button"
        className="text-primary hover:text-primary cursor-pointer"
        variant={"ghost"}
        size={"icon"}
      >
        <PencilIcon className="size-5" />
      </Button>

      <Button
        data-slot="product-delete-dialog-trigger"
        onClick={handleDelete}
        type="button"
        className="text-red-800 hover:text-red-800 cursor-pointer"
        variant={"ghost"}
        size={"icon"}
      >
        <TrashIcon className="size-5" />
      </Button>
    </div>
  );
};

export default ProductActions;
