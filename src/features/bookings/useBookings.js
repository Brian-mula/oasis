import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings(){
    const {data:bookings,isloading,error} = useQuery({
        queryKey:['bookings'],
        queryFn: getBookings
       })
         return {bookings,isloading,error}
}