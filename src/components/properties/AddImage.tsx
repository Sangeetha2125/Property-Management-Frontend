"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

interface AddImageProps {
  propertyid: string;
  refresh: boolean,
  setRefresh: Function;
}

export default function AddImage({propertyid, refresh, setRefresh}: AddImageProps) {
  const token = localStorage.getItem("token");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('file', values.image);
  
    axios({
      method: "post",
      url: `http://localhost:8080/api/properties/${propertyid}/addImage`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        toast.success("Image added successfully");
        setRefresh((prevRefresh:boolean) => !prevRefresh);
      }
    })
    .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later");
        } else if (err.response.status === 400) {
          toast.error(err.response.data.message);
        }
      })
    .finally(() => {
      setIsOpen(false);
    });
  }  

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="relative group">
          <ImagePlus
            className="cursor-pointer mt-1"
            color="#6b6b6b"
            size="20"
            onClick={() => setIsOpen(true)}
          />
          <div className="absolute left-full top-1/2 transform  bg-white text-gray-700 text-sm rounded-md p-2 opacity-0 group-hover:opacity-100 transition duration-200 shadow-lg ">
            Upload Image
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Add an image for your property here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => {
                        if (e.target.files) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center w-full">
              <div className="relative group w-full">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
