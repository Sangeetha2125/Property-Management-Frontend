import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"

import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "../../ui/calendar"
import { UnitRequestSchema } from "@/types/schema"
import { MakePaymentDialog } from "../../../components/profile/MakePaymentDialog"

const formSchema = z.object({
  startDate: z.date().min(new Date()),
  numberOfYears: z.number().optional()
})

interface AgreementFormProps{
  createAgreement: Function,
  request: UnitRequestSchema
}
  
export default function AgreementForm({createAgreement, request}:AgreementFormProps){
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createAgreement(values, request.id)
  }
  
  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)} >
      <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"}>
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl> 
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value || null}
                    onSelect={field.onChange }
                    disabled={(date) =>
                      date < new Date()}
                    initialFocus
                    style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Enter your move in date
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {request.type==="LEASE" && <FormField
          control={form.control}
          name="numberOfYears"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Years</FormLabel>
              <FormControl>
              <Input placeholder="0" type="number" onChange={(e) =>
                  field.onChange(parseInt(e.target.value))
                }/>              
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />}

        <div className="flex justify-center">
          <Button  className="w-full" type="submit"> Submit </Button>      
        </div>
      </form>
    </Form>
  )
}