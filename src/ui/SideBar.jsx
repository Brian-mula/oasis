import { FiBookOpen, FiBriefcase, FiHome, FiSettings, FiUser, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function SideBar() {
    const links = [
        {
            title: "Dashboard",
            icon: <FiHome/>,
            path: "dashboard"
        },
        {
            title: "Account",
            icon: <FiUser/>,
            path: "account"
        },
        {
            title: "Cabins",
            icon: <FiBriefcase/>,
            path: "cabins"
        },
        {
            title: "Bookings",
            icon: <FiBookOpen/>,
            path: "bookings"
        },
        {
            title: "Users",
            icon: <FiUsers/>,
            path: "users"
        },
        {
            title: "Settings",
            icon: <FiSettings/>,
            path: "settings"
        },
    ]
  return (
    <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
      <li className="flex justify-center items-center mb-5">
        <img src="/logo-light.png" alt="" className="h-32 w-32 object-cover" />
      </li>
      {
            links.map((link, index) => (
                <li key={index} className="py-1">
                    <Link to={link.path} className="menu-item">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">{link.icon}</span>
                            <span>{link.title}</span>
                        </div>
                    </Link>
                </li>
            ))
      }
      
    </ul>
  
  </div>
  )
}
