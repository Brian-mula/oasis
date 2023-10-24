import { FiEye, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function TableOperation({path,onClick,condition,}) {
  return (
    <div className="flex justify-center items-start">
      <button
        disabled={condition}
        onClick={() => onClick()}
        className="btn btn-sm btn-square"
      >
        <FiTrash />
      </button>
      <Link
        to={path}
        className="btn btn-sm btn-success btn-square mx-1"
      >
        <FiEye />
      </Link>
    </div>
  );
}
