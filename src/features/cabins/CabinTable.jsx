// import styled from "styled-components";

import { FiEye, FiTrash } from "react-icons/fi";


import { Link } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useCabins } from "./useCabin";
import { useDeleteSelectedCabin } from "./useDeleteCabin";

//const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4ZGNwZm9jdm91bmp1cHR4ZXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc3ODcwNzIsImV4cCI6MjAxMzM2MzA3Mn0.nraYMfkXnWBgf9r9mkrUos3ZSe_vCkp9hdrM-_1IwCQ"

export default function CabinTable() {
 
  const {isDeleting,deleteCabin}= useDeleteSelectedCabin();
  const {
    cabins,
    isLoading,
    error,
  } = useCabins();
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>error</div>;
  }
  
  
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
         <div className="flex justify-center items-center">
          <button disabled={isDeleting} onClick={()=>deleteCabin(cabin.id)} className="btn btn-sm btn-square">
            <FiTrash/>
          </button>
          <Link to={`${cabin.id}`} className="btn btn-sm btn-success btn-square mx-1">
            <FiEye/>
          </Link>
         </div>
         </>
         
         ))}
         </div>
    </div>
  );
}
