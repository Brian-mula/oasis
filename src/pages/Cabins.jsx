import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import FilterComponent from "../ui/FilterComponent";

function Cabins() {
  
  return (
    
    <div>
      <div className="flex justify-between w-full items-start mb-3">
      <h1 className="text-xl font-semibold">Cabins</h1>

      <div className="flex items-center">
      <FilterComponent/>
      <CreateCabinForm/>

      </div>
      </div>
      <CabinTable />
    </div>
  );
}

export default Cabins;
