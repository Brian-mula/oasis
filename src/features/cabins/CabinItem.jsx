import TableOperation from "../../ui/TableOperation";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteSelectedCabin } from "./useDeleteCabin";

export default function CabinItem({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteSelectedCabin();
  return (
    <>
      <img src={cabin.image} alt="" className="h-20 w-20 rounded-sm" />
      <div>{cabin.name}</div>
      <div>Fits {cabin.maxCapacity} guests</div>
      <div>{formatCurrency(cabin.regularPrice)}</div>
      <div>{formatCurrency(cabin.discount)}</div>

      <TableOperation
        path={`${cabin.id}`}
        onClick={() => deleteCabin(cabin.id)}
        condition={isDeleting}
      />
    </>
  );
}
