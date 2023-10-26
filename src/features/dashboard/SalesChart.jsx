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

// const fakeData = [
//   { label: "Jan 09", totalSales: 480, extrasSales: 20 },
//   { label: "Jan 10", totalSales: 580, extrasSales: 100 },
//   { label: "Jan 11", totalSales: 550, extrasSales: 150 },
//   { label: "Jan 12", totalSales: 600, extrasSales: 50 },
//   { label: "Jan 13", totalSales: 700, extrasSales: 150 },
//   { label: "Jan 14", totalSales: 800, extrasSales: 150 },
//   { label: "Jan 15", totalSales: 700, extrasSales: 200 },
//   { label: "Jan 16", totalSales: 650, extrasSales: 200 },
//   { label: "Jan 17", totalSales: 600, extrasSales: 300 },
//   { label: "Jan 18", totalSales: 550, extrasSales: 100 },
//   { label: "Jan 19", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 20", totalSales: 800, extrasSales: 200 },
//   { label: "Jan 21", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 22", totalSales: 810, extrasSales: 50 },
//   { label: "Jan 23", totalSales: 950, extrasSales: 250 },
//   { label: "Jan 24", totalSales: 970, extrasSales: 100 },
//   { label: "Jan 25", totalSales: 900, extrasSales: 200 },
//   { label: "Jan 26", totalSales: 950, extrasSales: 300 },
//   { label: "Jan 27", totalSales: 850, extrasSales: 200 },
//   { label: "Jan 28", totalSales: 900, extrasSales: 100 },
//   { label: "Jan 29", totalSales: 800, extrasSales: 300 },
//   { label: "Jan 30", totalSales: 950, extrasSales: 200 },
//   { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
//   { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
//   { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
//   { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
//   { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
//   { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
//   { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
// ];

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
