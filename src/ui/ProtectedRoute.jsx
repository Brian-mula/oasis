import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "./Spinner";

export default function ProtectedRoute({children}) {
  const {isLoading, localUser} = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if(!isLoading && !localUser) navigate('/login', {replace: true});
    console.log(localUser)
  }, [isLoading, localUser, navigate])

  if(isLoading) return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Spinner/>
    </div>
  )
 if(localUser) return children;
}
