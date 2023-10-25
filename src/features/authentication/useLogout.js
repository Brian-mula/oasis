import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logout } from "../../services/apiAuth";

export function useLogout(){
    const{mutate:signOut,isLoading:isLogingOut}=useMutation({
        mutationFn:logout,
        onSuccess:()=>{
            //queryClient.setQueriesData(['user'],null)
            toast.success(`Logout was successful`);
            //navigate("/login");
        },
        onError:(error)=>{
            toast.error(`Logout failed: ${error.message}`);
        }
    
    })
    return {signOut,isLogingOut}
}