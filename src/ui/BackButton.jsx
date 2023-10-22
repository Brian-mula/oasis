import { FiArrowLeft } from "react-icons/fi";
import { useMoveBack } from "../hooks/useMoveBack";

export default function BackButton() {
    const back = useMoveBack();
  return (
    <button onClick={back} className="btn btn-sm btn-square">
      <FiArrowLeft />
    </button>
  );
}
