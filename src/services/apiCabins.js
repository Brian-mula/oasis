
import supabase, { supabaseUrl } from "./supabase";

export async function createCabin (cabin){
    const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/","");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

const { data, error } = await supabase
.from('cabins')
.insert([
  {...cabin, image: imagePath},
])
.select()
if(error) {
   // console.log(error)
    throw new Error(error.message)
}
const { error:storageError } = await supabase.storage.from('cabin-images').upload(imageName, cabin.image)
  if (storageError) {
    await supabase
.from('cabins')
.delete()
.eq('id', data.id)
    throw new Error(storageError.message)
  } 
 
return data;

}

export async function getCabins (){

const { data, error } = await supabase
.from('cabins')
.select('*');
if(error) {
    //console.log(error)
    throw new Error(error.message)
}
return data;
}

export async function getCabin (id){
  const { data: cabin, error:cabinError } = await supabase
  .from('cabins')
  .select("*")
  .eq('id', id)
  .single();
  if(cabinError) {
      console.log(cabinError)
      throw new Error(cabinError.message)
  }

  return cabin;
}

export async function deleteCabin(id){

const { error } = await supabase
.from('cabins')
.delete()
.eq('id', id)
if(error) {
    console.log(error)
    throw new Error(error.message)
}

}

export async function updateCabin (cabin, id){
  console.log(cabin)

const { data, error } = await supabase
.from('cabins')
.update(cabin)
.eq('id', id)
.select()
if(error) {
    console.log(error)
    throw new Error(error.message)
}
console.log(data)

}