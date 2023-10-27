import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import DashboardBox from "./DashboardBox";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: gray;
  }
`;



export default function SalesChart({ bookings, numDays}) {
  const alldates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  })
  const data = alldates.map((date) => {
    return{
      label:format(date,'MMM dd'),
      totalSales:bookings.filter((booking)=>isSameDay(date,new Date(booking.created_at))).reduce((acc,booking)=>acc+booking.totalPrice,0),
      extrasSales:bookings.filter((booking)=>isSameDay(date,new Date(booking.created_at))).reduce((acc,booking)=>acc+booking.extraprice,0),
    }
  })
  console.log(data)
  return (
    <StyledSalesChart>
      <h1>Sales from {format(alldates.at(0),"MMM dd yyyy")} &mdash; {format(alldates.at(-1),"MMM dd yyyy")} </h1>
      <div className="bg-white h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            height={300}
            width={600}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3" />
            <Tooltip />
            <XAxis dataKey="label" />
            <YAxis />
            <Area
              dataKey="totalSales"
              type="monotone"
              stroke="red"
              fill="orange"
              
              unit="$"
            />
            <Area
              dataKey="extrasSales"
              type="monotone"
              stroke="orange"
              fill="blue"
             
              unit="$"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </StyledSalesChart>
  );
}
