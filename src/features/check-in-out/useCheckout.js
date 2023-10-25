import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckOut(){
    const queryClient = useQueryClient();
    const {mutate:checkOut,isLoading:isCheckingOut} = useMutation({
        mutationFn:(bookinId)=>updateBooking(bookinId,{status:"checked-out"}),
        onSuccess:(data)=>{
            toast.success(`Check out booking ${data.id} was successful`);
            queryClient.invalidateQueries({active:true});
        },
        onError:(error)=>{
            toast.error(`Check out booking failed: ${error.message}`);
        }
    })
    return {checkOut,isCheckingOut}
}