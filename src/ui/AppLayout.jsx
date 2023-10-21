
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import SideBar from './SideBar'

export default function AppLayout() {
  return (
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
    {/* Page content here */}
    <NavBar/>
    <div className='px-2 py-2'>
    <Outlet/>
    </div>
  
  </div> 
  <SideBar/>
</div>
  )
}
