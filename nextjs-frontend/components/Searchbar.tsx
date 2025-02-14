"use client";
import { useRef, useTransition, useEffect } from 'react'
import { Toaster, toast } from "sonner";
import Spinner from "./StyleEffects/Spinner";
import { getProduct } from "@/actions/scraperEntry";
import { z } from "zod";

const formSchema = z.string().url();

export default function Searchbar() {

  let [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(()=>{
    if(isPending){
      return
    }
    formRef.current?.reset();
  },[isPending])

  const onSubmit = async (formData: FormData) => {
    const userQuery = formData.get('userQuery');
    const checkQuery = formSchema.safeParse(userQuery);
    if (checkQuery.success) {
      startTransition(async () => {
        const formState = await getProduct(userQuery);
        const error = formState?.errors;
        if (error) {
          toast.error(formState?.message || "Something went wrong.");
          return;
        }
        return
      })
    } else { 
      toast.error("Please enter a valid product url");
      return;
      };
  };
  return (
    <div>
      <div>
        <Toaster position="bottom-center" />
      </div>
      <form ref={formRef} action={onSubmit} className="bg-gray-200 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-blue-500 py-2 font-bold mb-2">
            Paste product link
          </label>
          <input
            name="userQuery"
            type="text"
            autoComplete="off"
            placeholder="https:// . . . "
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          />
          <div className="flex items-center justify-between pt-4">
            <button
             className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-black font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              disabled={isPending}
              style={{
                width: "90px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isPending ? <Spinner/> : 'Search'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
