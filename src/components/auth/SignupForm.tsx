import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
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
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const roleSchema = z.enum(['OWNER', 'TENANT', 'BUYER']);

const formSchema = z.object({
  firstName: z.string()
    .min(1, { message: "Please enter first name.", })
    .max(50, { message: "Character limit exceeded." }),

  lastName: z.string()
    .min(1, { message: "Please enter last name.", })
    .max(50, { message: "Character limit exceeded." }),

  email: z.string()
    .min(1, { message: "Please enter your email id." })
    .email("This is not a valid email."),

  phoneNumber: z.string()
    .refine((value) => { return /^\d{10}$/.test(value); }, {
      message: "Enter a valid phone number.",
    }),

  password: z.string()
    .min(10, { message: "Enter stronger password." })
    .max(25, { message: "Character limit exceeded. Maximum allowed: 25." }),

  role: roleSchema
})

export default function SignupForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios({
      method: 'post',
      url: "http://localhost:8080/api/auth/register",
      data: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        console.log(res)
        if (res.status == 201) {
          toast.success(res.data)
          setTimeout(() => {
            navigate("/login")
          }, 1500)
        }
      })
      .catch((err) => {
        if (err.message == "Network Error") {
          toast.error("Please try again later")
        }
        else if (err.response.status == 400) {
          toast.error(err.response.data)
        }
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} autoComplete="off" />
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
                <Input placeholder="Email" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} autoComplete="off" />
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
                <Input type="password" placeholder="Enter a password with minimum 10 characters." {...field} autoComplete="off" />
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
              <FormLabel style={{ display: "none" }}>Role</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">{field.value || 'Click to select role'}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => field.onChange('OWNER')}>Owner</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => field.onChange('TENANT')}>Tenant</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => field.onChange('BUYER')}>Buyer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type='submit' className="w-full">Submit</Button>
        </div>
      </form>
    </Form>
  )
}