import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit,reset,getValues,formState } = useForm();
  const { isLoading,mutate } = useMutation({
    mutationFn:createCabin,
    onSuccess:()=>{
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries("cabins");
      reset();
    },
    onError:(error)=>{
      toast.error(error.message);
    }
  })
  const createCabinModal = useRef(null);

  const openModal = () => {
    createCabinModal.current.showModal();
  };
  const closeModal = () => {
    createCabinModal.current.close();
  };
  const onSubmitCabin = (data) => {
    
     mutate({...data,image:data.image[0]});
    
    
    closeModal();
  };
  const{errors} = formState;
  
  const onErrors = (errors) => {
    console.log(errors);
  }
  return (
    <div>
      <button className="btn btn-success btn-sm flex mx-2" onClick={openModal}>
        <FiPlus className="mr-1" />
        <span>Create Cabin</span>
      </button>
      <dialog ref={createCabinModal} className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit(onSubmitCabin,onErrors)}
            className="w-full max-w-lg"
          >
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Cabin Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  {...register("name",{
                    required:"Cabin name is required",
                  })}
                  type="text"
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Maximum Capacity
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  {...register("maxCapacity",{
                    required:"Maximum capacity is required",

                  })}
                  type="number"
                />
                {errors.maxCapacity && <p className="text-red-500 text-xs italic">{errors.maxCapacity.message}</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Regular Price
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  {...register("regularPrice",{
                    required:"Regular price is required",
                  })}
                  type="number"
                />
                {errors.regularPrice && <p className="text-red-500 text-xs italic">{errors.regularPrice.message}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Discount
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  {...register("discount",{
                    required:"Discount is required",
                    validate:(value)=> value <= getValues().regularPrice || "Discount must be less than regular price"
                  })}
                  type="number"
                />
                {errors.discount && <p className="text-red-500 text-xs italic">{errors.discount.message}</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Cabin Description
                </label>
                <textarea
                  className="resize rounded-md bg-gray-200 text-gray-700 py-3 px-4 w-full"
                  {...register("description",{
                    required:"Description is required"
                  })}
                ></textarea>
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Cabin Photo
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                 {...register("image",{
                  required:"Cabin Image is required"
                 })}
                  type="file"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button disabled={isLoading} className="btn btn-primary" type="submit">
                Create Cabin
              </button>
              <button
                className="btn btn-secondary"
                type="reset"
                onClick={closeModal}
              >
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
