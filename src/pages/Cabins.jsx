import CabinTable from "../features/cabins/CabinTable";

function Cabins() {
  
  return (
    
    <div>
      <div className="flex justify-between w-full items-start">
      <h1 className="text-xl font-semibold">Cabins</h1>

      <p>Filter</p>
      </div>
      <CabinTable />
    </div>
  );
}

export default Cabins;
