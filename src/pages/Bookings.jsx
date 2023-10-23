import BookingTable from "../features/bookings/BookingTable";
import BackButton from "../ui/BackButton";


function Bookings() {
  return (
   <div>
   <div className="flex justify-between items-start mt-4">
    <BackButton/>
    <h1 className="text-xl font-semibold">Bookings</h1>
   </div>
   <BookingTable/>
   </div>
  );
}

export default Bookings;
