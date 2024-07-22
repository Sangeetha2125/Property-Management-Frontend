"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { number, z } from "zod"
import { Label } from "../ui/label"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"

const typeSchema = z.enum(['APARTMENT', 'HOUSE', 'GATED_COMMUNITY']);

const formSchema = z.object({
  name: z.string()
  .min(1, {message: "Please enter property name.",})
  .max(50, {message: "Character limit exceeded."}),

  address: z.string()
  .min(1, { message: "Please enter valid address." }),

  city: z.string()
  .min(1, { message: "Please enter valid city." }),

  state: z.string()
  .min(1, { message: "Please enter valid state." }),

  pincode: z.string()
  .length(6),

  numUnits: z.string(),
  
  type: typeSchema
})

export default function Property_Form() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        address: "",
        city: "",
        state:"",
        numUnits:"0",
      },
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
        axios({
          method:'post',
          url: "http://localhost:8080/api/properties/",
          data:values,
          headers:{
              "Content-Type":"application/json",
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5nZWV0aGFAZ21haWwuY29tIiwiaWF0IjoxNzIxMjE0NTI3LCJleHAiOjE3MjEyMjg5Mjd9.K8hSU5eGTOd06XwMUC4oXgDn1K8VHLiyl0mlWg3I484"
          }
        })
        .then((res)=>{
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name " {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
            
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input placeholder="Pincode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numUnits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Units</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={{display:"none"}}>Role</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">{field.value || 'Click to select type of property'}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => field.onChange('APARTMENT')}>Apartment</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => field.onChange('HOUSE')}>House</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => field.onChange('GATED_COMMUNITY')}>Gated Community</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex justify-center">
        <Button type='submit' className="w-full"> Submit</Button>
        </div>
        </form>
    </Form>
  )
}