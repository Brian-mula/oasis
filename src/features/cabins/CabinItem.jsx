import { FiEye, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteSelectedCabin } from "./useDeleteCabin";

export default function CabinItem({cabin}) {
  const {isDeleting,deleteCabin}= useDeleteSelectedCabin();
  return (
    <>
         <img src={cabin.image} alt="" className="h-20 w-20 rounded-sm"/>
         <div>{cabin.name}</div>
         <div>Fits {cabin.maxCapacity} guests</div>
         <div>{formatCurrency(cabin.regularPrice)}</div>
         <div>{formatCurrency(cabin.discount)}</div>
         <div className="flex justify-center items-start">
          <button disabled={isDeleting} onClick={()=>deleteCabin(cabin.id)} className="btn btn-sm btn-square">
            <FiTrash/>
          </button>
          <Link to={`${cabin.id}`} className="btn btn-sm btn-success btn-square mx-1">
            <FiEye/>
          </Link>
         </div>
         </>
  )
}
