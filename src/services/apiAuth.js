import supabase from "./supabase";

export async function login({email,password}){

const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if(error){
    console.log(error)
    throw new Error(error.message)
  }
  console.log(data)

  return data;
  
}