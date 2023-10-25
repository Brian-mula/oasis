import { createContext, useContext, useEffect, useReducer } from "react";
import supabase from "../services/supabase";

const AuthContext = createContext();

const initialState = {
    user: null,
    isLoading: false,
    error: null
}
function reducer(state, action){
    switch(action.type){
        case 'login/loading':
            return {
                ...state,
                
                isLoading: true,
              
            }
        case 'login/loaded':
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: null,
                localUser: action.payload
            }
        case 'currentuser/loaded':
            console.log(action.payload)
            return {
                ...state,
                
                isLoading: false,
                error: null,
                localUser: action.payload
            }
        case 'currentuser/session':
            return {
                ...state,
                user: null,
                isLoading: false,
                error: null,
                localUser: null
            }
        case 'logout/loaded':
            return {
                ...state,
                user: null,
                isLoading: false,
                error: null,
                localUser: null
            }
        case 'ERROR':
            return {
                ...state,
                user: null,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

function AuthContextProvider({children}){
    const [{user,isLoading,error,localUser}, dispatch] = useReducer(reducer, initialState)

    async function login({email, password}){
        dispatch({type: 'login/loading'})
        
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
              })
              if(error){
                console.log(error)
                dispatch({type: 'ERROR', payload: error.message})
                throw new Error(error.message)
              }
            console.log(data)
            dispatch({type: 'login/loaded', payload: data.user})
        
    
    }
   useEffect(() => {
    async function getCurrentUser(){
        dispatch({type: 'login/loading'})
        const{data:session}= await supabase.auth.getSession()
        if(!session.session){
            dispatch({type: 'currentuser/session', payload: null})
        }
        const {data,error}=await supabase.auth.getUser()
        if(error){
            dispatch({type: 'ERROR', payload: error.message})
            throw new Error(error.message)
        }
        //return data?.user;
        dispatch({type: 'currentuser/loaded', payload: data.user})
    }
    getCurrentUser()
   },[])
     //localUser = getCurrentUser()
    async function logout(){
        dispatch({type: 'logout/loaded'})
        const { error } = await supabase.auth.signOut()
        if(error){
            dispatch({type: 'ERROR', payload: error.message})
        }
    }
return(
<AuthContext.Provider value={{
    user,isLoading,error,login,localUser,logout
}}>
{children}
</AuthContext.Provider>
)
}

function useAuth(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within AuthContextProvider')
    }
    return context;
}
export { AuthContextProvider, useAuth };
