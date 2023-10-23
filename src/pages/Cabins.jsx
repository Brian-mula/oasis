import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import FilterComponent from "../ui/FilterComponent";

function Cabins() {

  const options = [
    {
      label:'All',
      value:'all'
    },
    {
      label:'With Discount',
      value:'with-discount'
    },
    {
      label:'No Discount',
      value:'no-discount'
    }
  ]
  
  return (
    
    <div>
      <div className="flex justify-between w-full items-start mb-3">
      <h1 className="text-xl font-semibold">Cabins</h1>

      <div className="flex items-center">
      <FilterComponent options={options} param="discount" />
      <CreateCabinForm/>

      </div>
      </div>
      <CabinTable />
    </div>
  );
}

export default Cabins;
