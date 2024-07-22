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
  monthlyDue: z.number().min(1, "Monthly due date is required"),
});

export default function UnitTypeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      securityDeposit: 0,
      monthlyDue: 0,
    },
  });

  const [type, setType] = useState(false);

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
                    <DropdownMenuItem onSelect={() => {field.onChange("RENT"); setType(true);}}>
                      Rent
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => {field.onChange("LEASE"); setType(false);}}>
                      Lease
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => {field.onChange("BUY"); setType(false);}}>
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

        {type && (
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
              <FormLabel>Monthly Due Date</FormLabel>
              <FormControl>
                <Input placeholder="1" type="number" onChange={(e) =>
                  field.onChange(parseInt(e.target.value))
                }/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </>
        )}

        <div className="flex justify-center">
          <Button type="submit" className="w-full">
            Add Unit Availability
          </Button>
        </div>
      </form>
    </Form>
  );
}
