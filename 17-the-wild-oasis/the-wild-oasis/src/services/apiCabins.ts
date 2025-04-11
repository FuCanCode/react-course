import { Cabin, NewCabin } from "../entities";
import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error || !data.length) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data as Cabin[];
}

export async function removeCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }

  return data;
}

export async function uploadCabinImage(image: File) {
  const { error, data } = await supabase.storage
    .from("cabin-images")
    .upload(image.name, image, { upsert: true });

  if (error) {
    console.error(error);
    throw new Error("Image could not be uploaded.");
  }

  console.log(data);
}

export async function addCabin(cabin: NewCabin) {
  const { error, data } = await supabase
    .from("cabins")
    .insert([cabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be added.");
  }

  console.log("Cabin added: ", data);
}
