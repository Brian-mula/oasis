import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import BookingItem from "./BookingItem";


export default function BookingTable() {
 const {data:bookings=[],isloading,error} = useQuery({
  queryKey:['bookings'],
  queryFn: getBookings
 })

 if(isloading) {
  return <Spinner/>;
 }
  
  
  if(error) {
    return <p>error</p>;
  }
  
  console.log(bookings);

  return (
    <>
    <div className="flex  justify-center p-3 shadow-md rounded-sm mt-4">
     <div>
     <div className="grid grid-cols-4 gap-x-10 gap-y-5 shadow-md mb-2">
          <div className="font-bold text-lg">Guest</div>
          <div className="font-bold text-lg">Dates</div>
          <div className="font-bold text-lg">Status</div>
          <div className="font-bold text-lg">Amount</div>
      </div>
      <div className="grid grid-cols-4 gap-x-10 gap-y-5">
          {bookings.map((booking) => (<BookingItem key={booking.id} booking={booking}/>))}
      </div>
     </div>
    </div>
    </>
  );
}


