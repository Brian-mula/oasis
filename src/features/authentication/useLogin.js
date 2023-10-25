
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const{mutate:login,isLoading:isLogingIn}=useMutation({
        
        mutationFn: ({email,password})=> loginApi({email,password}),
        onSuccess:(user)=>{
            queryClient.setQueryData(['user'],user.user)
            console.log(user)
            toast.success(`Login was successful`);
            navigate("/dashboard");
            
        },
        onError:(error)=>{
            toast.error(`Login failed: ${error.message}`);
        }
    })
    console.log(isLogingIn)
    return {login,isLogingIn}
}