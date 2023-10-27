import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/apiAuth";

export function useSignUp(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate:signUpUser,isLoading:isSigningUp}=useMutation({
        mutationFn:({email,password,name,nationality,nationalId})=>signUp({email,password,name,nationalId,nationality}),
        onSuccess:()=>{
            
            toast.success(`User creation was successful`);
            queryClient.invalidateQueries({active:true})
            navigate("/dashboard");
            
        },
        onError:(error)=>{
            toast.error(`Sign Up failed: ${error.message}`);
        }
    })
    return {signUpUser,isSigningUp}
}