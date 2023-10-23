import { HiOutlineArrowDown } from "react-icons/hi2";
import { Link } from "react-router-dom";
import TableOperation from "../../ui/TableOperation";
import { formatCurrency, formatDate } from "../../utils/helpers";

export default function BookingItem({ booking }) {
  return (
    <>
      <div className="w-52">
        <p className="truncate w-full">Name: {booking.guests.fullName}</p>
        <p className="truncate w-full">Email: {booking.guests.email}</p>
      </div>
      <div>
        <p>Start: {formatDate(booking.startDate)}</p>
        <p>End: {formatDate(booking.endDate)}</p>
      </div>
      <div>
        {" "}
        <p
          className={`bg-blue-100 rounded-full px-2 py-1 text-blue-700 ${
            booking.status === "checked-in" ? "bg-green-600 text-white" : ""
          } `}
        >
          {booking.status.replace("-", " ")}
        </p>
      </div>
      <div>{formatCurrency(booking.totalPrice)}</div>
      <div className="flex">
        <TableOperation path={`${booking.id}`} />
        { booking.status === 'unconfirmed' && <Link
          to={`/checkin/${booking.id}`}
          className="btn btn-sm btn-success btn-square mx-1"
        >
          <HiOutlineArrowDown />
        </Link>}
      </div>
    </>
  );
}
