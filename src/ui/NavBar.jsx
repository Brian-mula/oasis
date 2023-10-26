
import { useEffect } from "react";
import { FiGrid } from "react-icons/fi";
import { HiLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../features/authentication/useUser";

export default function NavBar() {
  //const {signOut} = useLogout();
  const {user} = useUser();
  const { localUser,logout} = useAuth()
  useEffect(() => {}, [localUser])

  const handleLogout = async () => {
    await logout();
  }

  return (
    <div className="navbar bg-base-200">
  <div className="felx flex-1">
  <label htmlFor="my-drawer-2" className="btn btn-sm btn-square drawer-button lg:hidden">
    <span>
        <FiGrid className='text-3xl'/>
    </span>
  </label>
    <a className="btn btn-ghost normal-case text-xl">Worldwise Oasis</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 flex items-center">
     {
      localUser &&  <li>
      <button onClick={handleLogout} className="btn btn-warning btn-sm btn-square">
        <HiLogout className="text-2xl"/>
      </button>
    </li>
     }
      <li className="">
       <Link to="profile" className="mx-2 flex items-center">
       <img src={`${user?.user_metadata.avater || "/default-user.jpg"}`} alt="" className="h-10 w-10 rounded-full object-cover" />
       <p>{user?.user_metadata.name
}</p>
       </Link>
      </li>

    </ul>
  </div>
</div>
  )
}
