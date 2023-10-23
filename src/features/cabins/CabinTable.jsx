// import styled from "styled-components";



import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import CabinItem from "./CabinItem";
import { useCabins } from "./useCabin";

//const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4ZGNwZm9jdm91bmp1cHR4ZXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc3ODcwNzIsImV4cCI6MjAxMzM2MzA3Mn0.nraYMfkXnWBgf9r9mkrUos3ZSe_vCkp9hdrM-_1IwCQ"

export default function CabinTable() {
 
  
  const {
    cabins,
    isLoading,
    error,
  } = useCabins();
  const [searchParams] = useSearchParams();
  const discount = searchParams.get("discount") || "all";
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>error</div>;
  }
  let filteredCabins;
  if (discount === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  } else if (discount === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else {
    filteredCabins = cabins;
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
      {filteredCabins.map((cabin) => (
         <CabinItem key={cabin.id} cabin={cabin}/>
         
         ))}
         </div>
    </div>
  );
}
