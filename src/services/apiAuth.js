import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  console.log(data);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function signUp({ email, password, name }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avater:""
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}

export async function updateUser({name,avater,password}){
    let updateData;
    if(password){
        updateData={password}
    }
    if(name){
        updateData={data:{name}}
    }
const { data, error } = await supabase.auth.updateUser(updateData);
if(error){
    throw new Error(error.message)
}
if(!avater){
    return data;
}
const fileName = `avater-${data.user.id}-${Math.random()}`;

const{error:storageError} = await supabase.storage.from('avaters').upload(fileName,avater);
if(storageError){
    throw new Error(storageError.message)
}

const{data:updateduser, error:avaterError} = await supabase.auth.updateUser({
    data:{
        avater:`${supabaseUrl}/storage/v1/object/public/avaters/${fileName}`
    }
})
if(avaterError){
    throw new Error(avaterError.message)
}
return updateduser;


  
}