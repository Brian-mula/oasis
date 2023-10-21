import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  
  return (
    
    <div>
      <div className="flex justify-between w-full items-start mb-3">
      <h1 className="text-xl font-semibold">Cabins</h1>

      <div className="flex items-center">
      <p>Filter</p>
      <p>Sort</p>
      <CreateCabinForm/>

      </div>
      </div>
      <CabinTable />
    </div>
  );
}

export default Cabins;
