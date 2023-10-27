import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import BackButton from "../../ui/BackButton";
import { useCabins } from "../cabins/useCabin";
import { useGuests } from "../guests/useGuests";
import { useSettings } from "../settings/useSettings";
import { useNewBooking } from "./useNewBooking";

export default function NewBooking() {
  const { isLoading, cabins } = useCabins();
  const { guests, isLoading: isLoadingGuests } = useGuests();
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const {createBooking,isLoading:isCreating} = useNewBooking();



  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [cabin, setCabin] = useState(cabins[0]?.id);
  const [cabinPrice, setCabinPrice] = useState(cabin?.regularPrice || 0);
  const [breakfast, setBreakfast] = useState(false);
  const [extraPrice, setExtraPrice] = useState(0);
  const [numNights, setNumNights] = useState(1);
  const [numGuests, setNumGuests] = useState(1);
  const [observations, setObservations] = useState("");
  const [guest, setGuest] = useState(0);

  if (isLoading || isLoadingGuests || isLoadingSettings)
  return <div>Loading...</div>;

  
  
  console.log(cabinPrice);
  const handleSelectedValue = (e) => {
    const cabin = cabins.find((cabin) => cabin.id === Number(e.target.value));
    setCabin(cabin.id);
    setCabinPrice(cabin.regularPrice);
  };

  const handleHasBreakfast = (e) => {
    setBreakfast(e.target.value);
    if (e.target.value === "TRUE") {
      setExtraPrice(settings.breakFastPrice);
    } else {
      setExtraPrice(0);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(startDate === endDate || !cabin || !guest)return;
    // const formattedStartDate = moment(startDate).format('DD/MM/YYYY');
    // const formattedEndDate = moment(endDate).format('DD/MM/YYYY');
    const booking = {
      startDate,
      endDate,
      cabinId: cabin,
      hasBreakfast: Boolean(breakfast),
      observations,
      numNights,
      numGuests,
      cabinPrice,
      extraprice:extraPrice,
      totalPrice: (cabinPrice + extraPrice) * (numNights * numGuests),
      guestId: guest,
      isPaid:false,
      status:'unconfirmed',
    };
   
    
    createBooking(booking);
  };

  return (
    <div className="h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="mr-10 ml-10 mt-6">
        <div className="flex justify-between items-start pb-3">
          <BackButton/>
          <h1 className="font-bold text-lg">New Booking</h1>
        </div>
        <h3 className="font-bold text-lg py-4">Provide Booking details</h3>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Start date:
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="start date"
                  value={dayjs(startDate)}
                  onChange={(date) => setStartDate(date)}
                  inputFormat="E MMM dd yyyy HH:MM:SS O"
                />
              </LocalizationProvider>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                End Date
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="end date"
                  value={dayjs(endDate)}
                  onChange={(date) => setEndDate(date)}
                  inputFormat="E MMM dd yyyy HH:MM:SS O"
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Number of Nights:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                value={numNights}
                onChange={(e) => setNumNights(Number(e.target.value))}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Number of Guests
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                value={numGuests}
                onChange={(e) => setNumGuests(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Guest:
              </label>
              <select value={guest} onChange={(e)=> setGuest(Number(e.target.value))} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                {guests.map((guest) => (
                  <option key={guest.id} value={guest.id}>
                    {guest.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Cabin
              </label>
              <select
                value={cabin}
                onChange={handleSelectedValue}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                {cabins.map((cabin) => (
                  <option key={cabin.id} value={cabin.id}>
                    {cabin.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Cabin Price:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                value={cabinPrice}
                disabled
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Will you Take Breakfast?
              </label>
              <select
                value={breakfast}
                onChange={handleHasBreakfast}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="FALSE">No</option>
                <option value="TRUE">Yes</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Extra Price:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                value={extraPrice}
                disabled
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Comments
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="resize rounded-md appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Total
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                value={(cabinPrice + extraPrice) * (numNights * numGuests)}
              />
            </div>
          </div>
          <div className="w-full">
            <button
            disabled={isCreating}
              type="submit"
              className="btn bg-indigo-700 hover:bg-indigo-600 text-white"
            >
              Book Your Stay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
