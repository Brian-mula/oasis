import { formatCurrency, formatDate } from "../../utils/helpers";


export default function BookingItem({booking}) {
  return (
    <>
        <div className="w-60">
            <p className="truncate w-full">Name: {booking.guests.fullName}</p>
            <p className="truncate w-full">Email: {booking.guests.email}</p>
        </div>
          <div>
            
           <p>Start: {formatDate(booking.startDate)}</p>
           <p>End: {formatDate(booking.endDate)}</p>
          </div>
          <div > <p className={`bg-blue-100 rounded-full px-2 py-1 text-blue-700 ${booking.status === 'checked-in' ? 'bg-green-600 text-white':''} `}>{booking.status}</p></div>
          <div>{formatCurrency(booking.totalPrice)}</div>
    </>
  )
}
