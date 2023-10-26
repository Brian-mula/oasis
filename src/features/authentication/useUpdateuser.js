import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateUser as updateUserApi } from "../../services/apiAuth";


export function useUpdateuser(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const{mutate:updateUser,isLoading:isUpdating}=useMutation({
        
        mutationFn:({name,avater,password})=>updateUserApi({name,avater,password}),
        onSuccess:()=>{
            toast.success(`Update was successful`);
            queryClient.invalidateQueries({active:true})
            navigate("/dashboard");
            
        },
        onError:(error)=>{
            toast.error(`Update failed: ${error.message}`);
        }
    })
    return {updateUser,isUpdating}
}