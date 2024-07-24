"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"; 

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react"; 

const availTypeSchema = z.enum(["RENT", "LEASE", "BUY"]);

const formSchema = z.object({
  availabilityType: availTypeSchema,
  amount: z.number().min(1, "Amount is required"),
  securityDeposit: z
    .number()
    .min(0, "Security deposit must be a positive number"),
  monthlyDue: z.number().min(1, "Monthly due date is required (1 to 31)"),
  noOfMonths: z.number().min(1, "Number of months should be greater than 0"),
});

export default function UnitTypeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      securityDeposit: 0,
      monthlyDue: 0,
      noOfMonths: 0
    },
  });

  const [isRentType, setIsRentType] = useState(false);
  const [isLeaseType, setIsLeaseType] = useState(false)

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="availabilityType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">{field.value || "Unit Availability Type "}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => {field.onChange("RENT"); setIsRentType(true); setIsLeaseType(false)}}>
                      Rent
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => {field.onChange("LEASE"); setIsRentType(false); setIsLeaseType(true)}}>
                      Lease
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => {field.onChange("BUY"); setIsRentType(false); setIsLeaseType(false)}}>
                      Buy
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="0" type="number" onChange={(e) =>
                  field.onChange(parseInt(e.target.value))
                }/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isRentType && (
          <>
        <FormField
          control={form.control}
          name="securityDeposit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Security Deposit (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Optional" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyDue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Due</FormLabel>
              <FormControl>
                <Input placeholder="(1 to 31)" type="number" onChange={(e) =>
                  field.onChange(parseInt(e.target.value))
                }/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </>
        )}

        {(isLeaseType || isRentType) && <FormField
          control={form.control}
          name="noOfMonths"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No of Months</FormLabel>
              <FormControl>
                <Input placeholder="0" type="number" onChange={(e) =>
                  field.onChange(parseInt(e.target.value))
                }/>
              </FormControl>
              <FormDescription>Minimum number of months to rent or lease unit</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />}

        <div className="flex justify-center pt-4">
          <Button type="submit" className="w-full">
            Add Unit Availability
          </Button>
        </div>
      </form>
    </Form>
  );
}
