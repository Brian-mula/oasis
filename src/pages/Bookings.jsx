import { Link } from "react-router-dom";
import BookingTable from "../features/bookings/BookingTable";
import BackButton from "../ui/BackButton";
import FilterComponent from "../ui/FilterComponent";

function Bookings() {
  const options = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Unconfirmed",
      value: "unconfirmed",
    },
    {
      label: "Checked In",
      value: "checked-in",
    },
    {
      label: "Checked Out",
      value: "checked-out",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-start mt-4">
        <BackButton />
        <div className="flex">
          <FilterComponent options={options} param="status" />
          <Link to="/new-booking" className="mx-2 p-1 ">
            New Booking
          </Link>
        </div>
      </div>
      <BookingTable />
    </div>
  );
}

export default Bookings;
