import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { updateCabin } from "../../services/apiCabins";



export default function UpdateCabinForm({cabin}) {
    const queryClient = useQueryClient();
    const{isLoading:isUpdating,mutate} = useMutation({
        mutationFn:({updateCabinData,id})=>updateCabin(updateCabinData,id),
        onSuccess:()=>{
            toast.success("Cabin updated successfully");
            queryClient.invalidateQueries("cabins");
            
        },
        onError:(error)=>{
            toast.error(error.message);
        }
    })

    const { register, handleSubmit,getValues, formState} = useForm({
        defaultValues:{
            name:cabin.name,
            maxCapacity:cabin.maxCapacity,
            regularPrice:cabin.regularPrice,
            discount:cabin.discount,
            description:cabin.description,
        }
    });
   
    const onUpdateCabin=(data)=>{
        console.log(data);
        mutate({updateCabinData:data,id:cabin.id})
    }
    const updateCabinModal = useRef(null);

  const openModal = () => {
    updateCabinModal.current.showModal();
  };
  const closeModal = () => {
    updateCabinModal.current.close();
  };
  const{errors} = formState;
  
  const onErrors = (errors) => {
    console.log(errors);
  }
  return (
    <div>
      <button className="btn btn-success btn-sm flex mx-2" onClick={openModal}>
        <FiPlus className="mr-1" />
        <span>Update Cabin</span>
      </button>
      <dialog ref={updateCabinModal} className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit(onUpdateCabin,onErrors)}
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
                  {...register("maxCapacity")}
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
                  {...register("regularPrice")}
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
                  {...register("description")}
                ></textarea>
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button disabled={isUpdating} className="btn btn-primary" type="submit">
                Update Cabin
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}
