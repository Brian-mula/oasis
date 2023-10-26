import { Cell, Legend, Pie, PieChart } from "recharts";

// const ChartBox = styled.div`
//   /* Box */
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);

  
//   grid-column: 3 / span 2;

//   & > *:first-child {
//     margin-bottom: 1.6rem;
//   }

//   & .recharts-pie-label-text {
//     font-weight: 600;
//   }
// `;

const startDataLight = [
  {
    duration: "1 night",
    value: 2,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 5,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 7,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 3,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 6,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

// const startDataDark = [
//   {
//     duration: "1 night",
//     value: 0,
//     color: "#b91c1c",
//   },
//   {
//     duration: "2 nights",
//     value: 0,
//     color: "#c2410c",
//   },
//   {
//     duration: "3 nights",
//     value: 0,
//     color: "#a16207",
//   },
//   {
//     duration: "4-5 nights",
//     value: 0,
//     color: "#4d7c0f",
//   },
//   {
//     duration: "6-7 nights",
//     value: 0,
//     color: "#15803d",
//   },
//   {
//     duration: "8-14 nights",
//     value: 0,
//     color: "#0f766e",
//   },
//   {
//     duration: "15-21 nights",
//     value: 0,
//     color: "#1d4ed8",
//   },
//   {
//     duration: "21+ nights",
//     value: 0,
//     color: "#7e22ce",
//   },
// ];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

export default function DurationChart({ stays }) {
  //console.log(startDataLight, startDataDark, stays);
  const data = prepareData(startDataLight, stays);
  return (
   <div className="bg-gray-100 mt-3 shadow-sm rounded-sm">
    
      <h1 className="text-center pt-6 font-bold text-lg">Stay Duration Data</h1>
      <div className="h-[400] w-[400]">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            </Pie>
            <Legend verticalAlign="middle" align="right" width="30%"/>
        </PieChart>
      </div>
    
   </div>
  );
}
