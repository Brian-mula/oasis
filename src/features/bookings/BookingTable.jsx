import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import BookingItem from "./BookingItem";
import { useBookings } from "./useBookings";


export default function BookingTable() {

const {bookings=[],isloading,error} = useBookings();
const [searchParams] = useSearchParams();

 if(isloading) {
  return <Spinner/>;
 }
  
  
  if(error) {
    return <p>error</p>;
  }
 const status=searchParams.get("status") || "all";
  let filteredBookings;
  if(status==="unconfirmed") {
    filteredBookings=bookings.filter((booking)=>booking.status==="unconfirmed");
  }else if(status==="checked-in") {
    filteredBookings=bookings.filter((booking)=>booking.status==="checked-in");
  }else if(status==="checked-out") {
    filteredBookings=bookings.filter((booking)=>booking.status==="checked-out");
  }else if(status==="all"){
    filteredBookings=bookings;
  }else{
    filteredBookings=bookings;
  }

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
          {filteredBookings.map((booking) => (<BookingItem key={booking.id} booking={booking}/>))}
      </div>
     </div>
    </div>
    </>
  );
}


