import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckIn(){
    const queryClient = useQueryClient();
    const {mutate:checkIn,isLoading:isCheckingIn} = useMutation({
        mutationFn:(bookinId)=>updateBooking(bookinId,{status:"checked-in",isPaid:true}),
        onSuccess:(data)=>{
            toast.success(`Check in booking ${data.id} was successful`);
            queryClient.invalidateQueries({active:true});
        },
        onError:(error)=>{
            toast.error(`Check in booking failed: ${error.message}`);
        }
    })
    return {checkIn,isCheckingIn}
}