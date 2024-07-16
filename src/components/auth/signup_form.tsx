"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { number, z } from "zod"

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

const roleSchema = z.enum(['Owner', 'Tenant', 'Buyer']);

const formSchema = z.object({
  first_name: z.string()
    .min(1, {message: "Please enter first name.",})
    .max(50, {message: "Character limit exceeded."}),

  last_name: z.string()
    .min(1, {message: "Please enter last name.",})
    .max(50, {message: "Character limit exceeded."}),

  email: z.string()
  .min(1, { message: "Please enter your email id." })
  .email("This is not a valid email."),

  phone: z.string()
  .refine((value) => {return /^\d{10}$/.test(value);}, {message: "Enter a valid phone number.",
  }),
  
  password: z.string()
  .min(10, {message:"Enter stronger password."})
  .max(25, {message:"Character limit exceeded. Maximum allowed: 25."}),

  role: roleSchema
})

export default function SignUp_Form() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        first_name: "",
        last_name: "",
        email: "",
        password:""
      },
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
        
        console.log(values)
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
            
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter a password with minimum 10 characters." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={{display:"none"}}>Role</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">{field.value || 'Click to select role'}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => field.onChange('Owner')}>Owner</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => field.onChange('Tenant')}>Tenant</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => field.onChange('Buyer')}>Buyer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <div className="flex justify-center">
        <Button type='submit'> Submit</Button>
        </div>
        </form>
    </Form>
  )
}