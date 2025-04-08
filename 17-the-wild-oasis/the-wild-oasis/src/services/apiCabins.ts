import { Cabin } from "../entities";
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
