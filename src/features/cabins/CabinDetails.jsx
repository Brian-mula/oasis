
import { useParams } from "react-router-dom";

import BackButton from "../../ui/BackButton";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import UpdateCabinForm from "./UpdateCabinForm";
import { useCabins } from "./useCabin";


export default function CabinDetails() {
    const {id} = useParams();
    const {cabins,isLoading} = useCabins();
    const cabin = cabins.find((cabin)=>cabin.id===Number(id));
    
    if(isLoading){
        return <Spinner/>
    }
  return (
    <div>
        <div className="flex justify-between items-start my-3 mx-3">
          <BackButton />
          <UpdateCabinForm cabin={cabin}/>  
        </div>
        <div className="flex">
            <div className="w-1/3">
                <img src={cabin.image} alt="" className="w-full h-80 rounded-md"/>
            </div>
            <div className="px-3 w-2/3 ml-3">
                <h1 className="text-xl font-bold">{cabin.name}</h1>
                <p className="max-w-md"> {cabin.description}</p>
                <div className="flex max-w-md justify-between items-start mt-3">
                    <div className="">
                        <h1 className="font-bold">Regular Price</h1>
                        <p>{formatCurrency(cabin.regularPrice)}</p>
                    </div>
                    <div className="">
                    <h1 className="font-bold">Max Capacity</h1>
                    <p> Up to {cabin.maxCapacity}</p>
                    </div>
                    <div className="">
                    <h1 className="font-bold">Discount</h1>
                    <p>{formatCurrency(cabin.discount)}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
