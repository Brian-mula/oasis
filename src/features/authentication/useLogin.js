
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
    const navigate = useNavigate();
    
    const{mutate:login,isLoading:isLogingIn}=useMutation({
        mutationFn: ({email,password})=> loginApi({email,password}),
        onSuccess:()=>{
            toast.success(`Login was successful`);
            navigate("/");
            
        },
        onError:(error)=>{
            toast.error(`Login failed: ${error.message}`);
        }
    })
    return {login,isLogingIn}
}