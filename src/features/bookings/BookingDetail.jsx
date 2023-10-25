import { useQuery } from "@tanstack/react-query";
import { format, isToday } from "date-fns";
import { HiArrowSmallUp, HiOutlineHomeModern, HiTrash } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import BackButton from "../../ui/BackButton";
import Spinner from "../../ui/Spinner";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useCheckOut } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";


export default function BookingDetail() {
  const {bookingId} = useParams()
  const {data:booking,isloading,error} = useQuery({
    queryKey:['booking',bookingId],
    queryFn:()=> getBooking(bookingId),
  })
  const {isCheckingOut,checkOut}= useCheckOut();
  const {isDeleting,deleteBooking}= useDeleteBooking();
  
 
  const{id,created_at,cabins,guests,endDate,startDate,status,totalPrice,extraprice,hasBreakfast,isPaid,numGuests,numNights,cabinPrice}=booking || {};
    console.log(booking)
    if(isloading||!booking) {
      return <Spinner/>;
    }
    if(error) {
      return <p>error</p>;
    }
    console.log(cabins)
    const checkout = () => {
      checkOut(id);
    };
    const handleDeleteBooking = () => {
      deleteBooking(id);
    }

  return (
    <div>
      <div className="flex justify-between items-start my-3">
      <BackButton/>
      <div className="flex">
      <h1 className="font-bold text-lg">Booking # {id} </h1>
      <span className={`text-xs text-center mx-2 bg-gray-200 p-1 rounded-full ${status === 'unconfirmed' ? 'bg-orange-400 text-white font-bold': status === 'confirmed' ? 'bg-green-600 text-white font-bold':'bg-blue-600 text-white font-bold'}`}>{status}</span>
      </div>
      </div>
      <div className="px-2 py-2 bg-indigo-700 rounded-t-md flex justify-between items-center">
        <div className="flex items-center">
        <HiOutlineHomeModern className="text-white text-xl " />
        <p className="text-white text-lg px-2">{numNights} nights in cabin {cabins.name}</p>
        </div>
        <p className="text-white text-xl">{format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")} </p>
      </div>
      <div className="px-7 py-3 grid grid-cols-3 gap-x-10 gap-y-4">
        <p>.{guests.fullName} + {numGuests - 1} guest</p>
        <p>.{guests.email}</p>
        <p>.National ID: {guests.nationalId}</p>
        <p>.Breakfast included? {`${hasBreakfast ? 'Yes' :'No'} `}</p>
      </div>
      <div className="px-2 py-2 bg-orange-300 rounded-t-md flex justify-between items-center">
        <p>Total price: {formatCurrency(totalPrice)} ({`${formatCurrency(cabinPrice)}cabin + ${formatCurrency(extraprice)} breakfast`})</p>
        <p className="text-white text-xl">{`${isPaid ? "paid on Booking" : "Will Pay at Property"} `} </p>
      </div>
      { booking.status === 'checked-in' && <div className="flex justify-end items-center my-3">
      <button onClick={checkout} disabled={isCheckingOut} className="btn flex bg-indigo-700 hover:bg-indigo-600 text-white">
          <HiArrowSmallUp className="text-lg"/>
          <span>Check out</span>
        </button>
        </div>}
        <div className="flex justify-end items-center my-3">
      <button onClick={handleDeleteBooking} disabled={isDeleting} className="btn flex bg-red-700 hover:bg-red-600 text-white">
          <HiTrash className="text-lg"/>
          <span>Delete</span>
        </button>
        </div>

      <p className="text-xm py-3 text-right">Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
    </div>
  )
}
