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

const formSchema = z.object({
  propertyName: z.string()
    .min(1, { message: "Please enter property name", })
    .max(50, { message: "Character limit exceeded" }),

  unitName: z.string()
    .min(1, { message: "Please enter unit name", })
    .max(50, { message: "Character limit exceeded" }),

    amount: z.number()
})

export default function ExpenseForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyName: "",
      unitName: "",

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
        if (res.status === 201) {
          toast.success(res.data)
          setTimeout(() => {
            navigate("/login")
          }, 1500)
        }
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later")
        }
        else if (err.response.status === 400) {
          toast.error(err.response.data)
        }
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="propertyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input placeholder="Property Name" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unitName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Name</FormLabel>
              <FormControl>
                <Input placeholder="Unit Name" {...field} autoComplete="off" />
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