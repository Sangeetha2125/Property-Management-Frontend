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

const roleSchema = z.enum(['Owner', 'Tenant', 'Buyer']);

const formSchema = z.object({
  email: z.string()
  .min(1, { message: "Please enter your email id." })
  .email("This is not a valid email."),

  password: z.string()
  .min(1, { message: "Please enter your password." }),

  role: roleSchema
})

export default function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
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
        <Button type='submit' className="w-full"> Submit</Button>
        </div>
        </form>
    </Form>
  )
}