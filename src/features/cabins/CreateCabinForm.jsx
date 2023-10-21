import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";


function CreateCabinForm() {
  const {register,handleSubmit} = useForm();
  const createCabinModal = useRef(null);

  const openModal = () => {
    createCabinModal.current.showModal();
  }
  const closeModal = () => {
    createCabinModal.current.close();
  }
  const onSubmitCabin = (data) => {
    console.log(data);
  }
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-success btn-sm flex mx-2" onClick={openModal}>
  <FiPlus className="mr-1"/>
  <span>Create Cabin</span>
</button>
<dialog ref={createCabinModal} className="modal">
  <div className="modal-box">
  <form onSubmit={handleSubmit(onSubmitCabin)} className="w-full max-w-lg">
  <div className="flex flex-wrap -mx-3 mb-3">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Cabin Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" {...register('name')} type="text" />
      
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Maximum Capacity
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register('maxCapacity')} type="number"/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-3">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Regular Price
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" {...register('regularPrice')} type="number" />
      
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Discount
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register('discount')} type="number"/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-3">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Cabin Description
      </label>
      <textarea className="resize rounded-md bg-gray-200 text-gray-700 py-3 px-4 w-full" {...register('description')} ></textarea>
      
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-3">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Cabin Photo
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="file"/>
      
    </div>
  </div>
    <div className="flex justify-between items-center">
      <button className="btn btn-primary" type="submit">
        Create Cabin
      </button>
      <button className="btn btn-secondary" type="reset" onClick={closeModal}>
        Cancel
      </button>
    </div>
</form>
  </div>
</dialog>
    </div>
  );
}

export default CreateCabinForm;
