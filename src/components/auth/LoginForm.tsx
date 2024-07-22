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

const roleSchema = z.enum(['Owner', 'Tenant', 'Buyer']);

const formSchema = z.object({
  email: z.string()
    .min(1, { message: "Please enter your email id." })
    .email("This is not a valid email."),

  password: z.string()
    .min(1, { message: "Please enter your password." }),

})

export default function LoginForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios({
      method: 'post',
      url: "http://localhost:8080/api/auth/login",
      data: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          localStorage.setItem("token",res.data.token)
          localStorage.setItem("role",res.data.role)
          toast.success("Logged in successfully")
          setTimeout(() => {
            navigate("/properties")
          }, 1500)
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          toast.error("Invalid credentials")
        }
      })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
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