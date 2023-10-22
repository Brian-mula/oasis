import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteSelectedCabin(){
    const queryClient = useQueryClient();
  const {isLoading:isDeleting,mutate:deleteCabin} = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries("cabins");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {isDeleting,deleteCabin}
}