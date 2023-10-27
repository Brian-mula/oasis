import { useQuery } from "@tanstack/react-query";
import { format, isToday } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { HiOutlineHomeModern } from "react-icons/hi2";
import { getBooking } from "../../services/apiBookings";
import BackButton from "../../ui/BackButton";
import Checkbox from "../../ui/Checkbox";
import Loaded from "../../ui/Loaded";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
import { useCheckIn } from "./useCheckin";

export default function CheckinBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isloading,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isTakingBreakfast, setIsTakingBreakfast] = useState(false);
  const { checkIn, isCheckingIn } = useCheckIn();
  const {isLoading:isLoadingSettings,settings}= useSettings();

  

  useEffect(() => setIsConfirmed(booking?.isPaid ?? false), [booking]);

  const {
    id,
    created_at,
    cabins,
    guests,
    endDate,
    startDate,
    status,
    totalPrice,
    extraprice,
    hasBreakfast,
    isPaid,
    numGuests,
    numNights,
    cabinPrice,
  } = booking || {};
  console.log(booking);
  if (isloading || !booking || isLoadingSettings) {
    return <Loaded />;
  }
  if (error) {
    return <p>error</p>;
  }
  console.log(cabins);
  const breakfastPrice = settings?.breakFastPrice * numGuests * numNights;
  const handleCheckin = () => {
    if (!isConfirmed) return;
    if(isTakingBreakfast){
      checkIn({bookinId:id,breakfast:{
        hasBreakfast:true,
        extraprice:breakfastPrice,
        totalPrice:totalPrice+breakfastPrice
      }})
    }else{
      checkIn({bookinId:id,breakfast:{}});
    }
    
  };

  return (
    <div>
      <div className="flex justify-between items-start my-3">
        <BackButton />
        <div className="flex">
          <h1 className="font-bold text-lg">Checkin Booking # {id} </h1>
          <span
            className={`text-xs text-center mx-2 bg-gray-200 p-1 rounded-full ${
              status === "unconfirmed"
                ? "bg-orange-400 text-white font-bold"
                : status === "confirmed"
                ? "bg-green-600 text-white font-bold"
                : "bg-blue-600 text-white font-bold"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="px-2 py-2 bg-indigo-700 rounded-t-md flex justify-between items-center">
        <div className="flex items-center">
          <HiOutlineHomeModern className="text-white text-xl " />
          <p className="text-white text-lg px-2">
            {numNights} nights in cabin {cabins.name}
          </p>
        </div>
        <p className="text-white text-xl">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}{" "}
        </p>
      </div>
      <div className="px-7 py-3 grid grid-cols-3 gap-x-10 gap-y-4">
        <p>
          .{guests.name} + {numGuests - 1} guest
        </p>
        <p>.{guests.email}</p>
        <p>.National ID: {guests.nationalId}</p>
        <p>.Breakfast included? {`${hasBreakfast ? "Yes" : "No"} `}</p>
      </div>
      <div className="px-2 py-2 bg-orange-300 rounded-t-md flex justify-between items-center">
        <p>
          Total price: {formatCurrency(totalPrice)} (
          {`${formatCurrency(cabinPrice)}cabin + ${formatCurrency(
            extraprice
          )} breakfast`}
          )
        </p>
        <p className="text-white text-xl">
          {`${isPaid ? "paid on Booking" : "Will Pay at Property"} `}{" "}
        </p>
      </div>
     {!hasBreakfast && <div className="mt-4">
        <Checkbox
          checked={isTakingBreakfast}
          onChange={() => {
            setIsTakingBreakfast((takingBreakfast) => !takingBreakfast);
            setIsConfirmed(false);
          }}
          id="breakfast"
        >Would you like to add Breakfast of {formatCurrency(breakfastPrice)} </Checkbox>
      </div>}
      {status === "unconfirmed" && (
        <div className="mt-4">
          <Checkbox
            checked={isConfirmed}
            onChange={() => setIsConfirmed((confirmed) => !confirmed)}
            disabled={isConfirmed}
          >
            {
              isTakingBreakfast
                ? `I Confirm that ${guests.name} has paid ${formatCurrency(
                    totalPrice + breakfastPrice
                  )}`
                : `I Confirm that ${guests.name} has paid ${formatCurrency(totalPrice)}`
            }
          </Checkbox>
        </div>
      )}
      <p className="text-xm py-3 text-right">
        Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
      </p>

   { status === "unconfirmed" &&  <div className="flex justify-end items-center px-4 mx-5">
        <button
          onClick={handleCheckin}
          disabled={!isConfirmed || isCheckingIn}
          className="btn bg-indigo-700 text-white"
        >
          Check in # {id}
        </button>
      </div>}
    </div>
  );
}
