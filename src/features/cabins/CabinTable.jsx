// import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import { FiTrash } from "react-icons/fi";


import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export default function CabinTable() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>error</div>;
  }
  console.log(cabins);
  return (
    <div className="">
      <div className="grid grid-cols-6 gap-2">
        <div className="w-12 h-12"></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </div>
      <div className="grid grid-cols-6 gap-2">
      {cabins.map((cabin) => (
         <>
         <img src={cabin.image} alt="" className="h-20 w-20 rounded-sm"/>
         <div>{cabin.name}</div>
         <div>Fits {cabin.maxCapacity} guests</div>
         <div>{formatCurrency(cabin.regularPrice)}</div>
         <div>{formatCurrency(cabin.discount)}</div>
         <div>
          <span>
            <FiTrash/>
          </span>
         </div>
         </>
         
         ))}
         </div>
    </div>
  );
}
