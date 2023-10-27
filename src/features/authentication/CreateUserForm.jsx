import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { useSignUp } from "./useSignUp";


export default function CreateUserForm() {
    const createUserModal = useRef(null);

    const {register, handleSubmit, formState: {errors},getValues} = useForm();
    const {signUpUser,isSigningUp} = useSignUp();

  const openModal = () => {
    createUserModal.current.showModal();
  };
  const closeModal = () => {
    createUserModal.current.close();
  };
  const onSubmitCabin = (data) => {
    
    signUpUser(data)
    console.log(data);
    
    closeModal();
  };
    const onErrors = (errors) => {
        console.log(errors);
    }
  return (
    <div>
      <button className="btn btn-success btn-sm flex mx-2" onClick={openModal}>
        <FiPlus className="mr-1" />
        <span>Create User</span>
      </button>
      <dialog ref={createUserModal} className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit(onSubmitCabin,onErrors)}
            className="w-full max-w-lg"
          >
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Full Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  {...register("name",{
                    required:"Full name is required",
                  
                  })}
                  type="text"
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                 Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  {...register("email",{
                    required:"Email is required",
                    pattern:{
                        value:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                        message:"Invalid email address"
                    }
                  
                  })}
                  type="email"
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Nationality
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  {...register("nationality",{
                    required:"nationality is required",
                  
                  })}
                  type="text"
                />
                {errors.nationality && <p className="text-red-500 text-xs italic">{errors.nationality.message}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                 National Id
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  {...register("nationalId",{
                    required:"national Id is required"
                    
                  
                  })}
                  type="text"
                />
                {errors.nationalId && <p className="text-red-500 text-xs italic">{errors.nationalId.message}</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  {...register("password",{
                    required:"Password is required",
                  })}
                  type="password"
                />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  {...register("confirmPassword",{
                    required:"Confirm password is required",
                    validate:(value)=> value === getValues().password || "Passwords do not match"
                  })}
                  type="password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
              </div>
            </div>
          
            
            <div className="flex justify-between items-center">
              <button disabled={isSigningUp}  className="btn btn-primary" type="submit">
                Create User
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
  )
}
