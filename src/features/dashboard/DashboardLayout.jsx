import FilterComponent from "../../ui/FilterComponent";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabin";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

export default function DashboardLayout() {
  const options = [
    {
      label: "Last 7 days",
      value: "7",
    },
    {
      label: "Last 30 days",
      value: "30",
    },
    {
      label: "Last 90 days",
      value: "90",
    },
  ];
  const { isLoading, bookings, numDays } = useRecentBookings();
  const { isLoading: isLoadingStays, stays } = useRecentStays();
  const { isLoading: isLoadingCabins, cabins } = useCabins();
  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

 
  return (
    <div className="">
      <div className="flex justify-between items-start mt-4">
        <h1 className="font-bold text-lg">Dashboard</h1>

        <FilterComponent param="last" options={options} />
      </div>

      <Stats
        bookings={bookings}
        confirmedStays={stays}
        cabins={cabins}
        numDays={numDays}
      />
      <div className="grid grid-cols-2 gap-x-5 gap-y-5 mt-3">
        <TodayActivity />
        <DurationChart stays={stays} />
      </div>

      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}
