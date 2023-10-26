import { HiCurrencyDollar, HiOutlineBriefcase, HiOutlineCalendar, HiOutlineChartBar } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";
import Stat from './Stat';

export default function Stats({bookings,confirmedStays,cabins,numDays}) {
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc,booking)=>acc+booking.totalPrice,0)
    const checkins = confirmedStays?.length;
    const occupation = confirmedStays?.reduce((acc,stay)=>acc+stay.numNights,0)/(cabins.length*numDays)*100;
  return (
  <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-x-5 gap-y-8'>
    <Stat icon={<HiOutlineBriefcase/>} title='Bookings' value={numBookings} color='blue'/>
    <Stat icon={<HiCurrencyDollar/>} title='Sales' value={formatCurrency(sales)} color='blue'/>
    <Stat icon={<HiOutlineCalendar/>} title='Check Ins' value={checkins} color='blue'/>
    <Stat icon={<HiOutlineChartBar/>} title='Occupancy' value={Math.floor(occupation * 100)+'%'} color='blue'/>
  </div>
  )
}
