
import { useEffect } from "react";
import { FiGrid } from "react-icons/fi";
import { HiLogout } from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  //const {signOut} = useLogout();
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
    <ul className="menu menu-horizontal px-1">
     {
      localUser &&  <li>
      <button onClick={handleLogout} className="btn btn-warning btn-sm btn-square">
        <HiLogout className="text-2xl"/>
      </button>
    </li>
     }
      <li>
        <details>
          <summary>
            Parent
          </summary>
          <ul className="p-2 bg-base-100">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
  )
}
