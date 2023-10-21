
import { FiGrid } from "react-icons/fi";

export default function NavBar() {
  return (
    <div className="navbar bg-base-200">
  <div className="felx flex-1">
  <label htmlFor="my-drawer-2" className="btn btn-sm btn-square drawer-button lg:hidden">
    <span>
        <FiGrid className='text-3xl'/>
    </span>
  </label>
    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a>Link</a></li>
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
