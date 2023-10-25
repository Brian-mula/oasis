import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking(){
    const queryClient = useQueryClient();
    const {mutate:deleteBooking,isLoading:isDeleting} = useMutation({
        mutationFn:(id)=>deleteBookingApi(id),
        onSuccess:()=>{
            toast.success(`Booking  was deleted successfully`);
            queryClient.invalidateQueries({active:true});
        },
        onError:(error)=>{
            toast.error(`Delete booking failed: ${error.message}`);
        }
    })
    return {deleteBooking,isDeleting}
}