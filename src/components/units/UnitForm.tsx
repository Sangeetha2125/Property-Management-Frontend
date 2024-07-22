"use client"

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
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

const formSchema = z.object({
  name: z.string()
    .min(1, { message: "Please enter unit name.", })
    .max(50, { message: "Character limit exceeded." }),

  floor: z.number()
    .min(1, { message: "Required" }),

  squareFootage: z.number()
    .min(1, { message: "Please enter valid area." }),

  bedrooms: z.number()
    .min(1, { message: "Required" }),

  bathrooms: z.number()
    .min(1, { message: "Required" }),

  description: z.string(),
})

interface AddUnitFormProps {
  addUnit: Function;
}

export default function UnitForm({ addUnit }: AddUnitFormProps) {
  const token = localStorage.getItem("token")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      floor: 0,
      squareFootage: 0,
      bedrooms: 0,
      bathrooms: 0,
      description: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    addUnit(values, token)
    console.log(values)
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
              <FormMessage />
            </FormItem>

          )}
        />

        <FormField
          control={form.control}
          name="squareFootage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Square Footage</FormLabel>
              <FormControl>
                <Input onChange={(e) =>
                  field.onChange(parseFloat(e.target.value))
                } placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-4">

          <FormField
            control={form.control}

            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor</FormLabel>
                <FormControl>
                  <Input type="number" onChange={(e) =>
                    field.onChange(parseInt(e.target.value))
                  } placeholder="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input type="number" onChange={(e) =>
                    field.onChange(parseInt(e.target.value))
                  } placeholder="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input type="number" onChange={(e) =>
                    field.onChange(parseInt(e.target.value))
                  } placeholder="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter any description of your unit." {...field} />
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