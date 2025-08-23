import useProductDialogStore from '@/store/product-dialog-store'
import { useShallow } from 'zustand/react/shallow'

export const useCreateProductDialog = () => {
  const isOpen = useProductDialogStore((state) => state.createProductDialog)
  const setIsOpen = useProductDialogStore((state) => state.setCreateProductDialog)

  return {
    isOpen,
    setIsOpen,
    close: () => setIsOpen(false)
  }
}


// export const useDetailDialog = () => {
//   const { isOpen, setIsOpen, Product, setProduct } = useProductDialogStore(useShallow((state) => ({
//     isOpen: state.detailProductDialog,
//     setIsOpen: state.setDetailProductDialog,
//     Product: state.Product,
//     setProduct: state.setProduct

//   })))

//   return {
//     isOpen,
//     setIsOpen,
//     Product,
//     setProduct
//   }
// }


export const useUpdateProductDialog = () => {
  const { isOpen, setIsOpen, product, setProduct, isLoadingProduct, setIsLoadingProduct } = useProductDialogStore(useShallow((state) => ({
    isOpen: state.updateProductDialog,
    setIsOpen: state.setUpdateProductDialog,
    product: state.product,
    setProduct: state.setProduct,
    isLoadingProduct: state.isLoadingProduct,
    setIsLoadingProduct: state.setIsLoadingProduct
  })))

  return {
    isOpen,
    setIsOpen,
    product,
    setProduct,
    isLoadingProduct,
    setIsLoadingProduct,
  }
}


export const useDeleteProductDialog = () => {
  const { isOpen, setIsOpen, product, setProduct } = useProductDialogStore(useShallow((state) => ({
    isOpen: state.deleteProductDialog,
    setIsOpen: state.setDeleteProductDialog,
    product: state.product,
    setProduct: state.setProduct
  })))

  return {
    isOpen,
    setIsOpen,
    product,
    setProduct,
  }
}

