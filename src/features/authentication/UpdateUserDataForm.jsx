import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";


export default function UpdateUserDataForm() {
  const {localUser} = useAuth();
  const [email] = useState(localUser.email)
  const [name, setName] = useState(localUser.user_metadata.name)
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
           
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="file"
          />
        </div>
      </div>
      
    </form>
  </div>
  )
}
