import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { newBooking } from "../../services/apiBookings";

export function useNewBooking(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: createBooking,isLoading}=  useMutation({
        
        mutationFn: newBooking,
        onSuccess: () => {
        toast.success("Booking created");
          queryClient.invalidateQueries("bookings");
          navigate("/bookings",{replace:true});
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
      return {createBooking,isLoading}
}