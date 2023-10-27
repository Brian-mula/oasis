import { useState } from "react";
import { useUpdateuser } from "./useUpdateuser";
import { useUser } from "./useUser";


export default function UpdateUserDataForm() {
  const {updateUser,isUpdating} = useUpdateuser();
  const {user} = useUser();
  const [email] = useState(user.email)
  const [name, setName] = useState(user.user_metadata.name)
  const [avater, setAvatar] = useState('')
 
  const handleUpdate=(e)=>{
    e.preventDefault();
    if(!name) return;
    updateUser({name,avater,})

  }
  return (
    <div className="flex flex-col justify-center h-[calc(100vh-7rem)]">
    <form className="w-full max-w-lg mx-auto">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-60">
          <label className="block text-gray-500 font-bold md:text-start mb-1 md:mb-0 pr-4">
          Full Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-60">
          <label className="block text-gray-500 font-bold md:text-start mb-1 md:mb-0 pr-4">
            Email
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            value={email}
            disabled
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="email"
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-60">
          <label className="block text-gray-500 font-bold md:text-start mb-1 md:mb-0 pr-4">
            Avater
          </label>
        </div>
        <div className="md:w-2/3">
          <input
           onChange={(e) => setAvatar(e.target.files[0])}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="file"
          />
        </div>
      </div>
      <div>
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Update
        </button>
      </div>
      
    </form>
  </div>
  )
}
