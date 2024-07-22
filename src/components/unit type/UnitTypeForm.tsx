"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { Label } from "../ui/label";
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
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { watch } from "fs";

const availTypeSchema = z.enum(["RENT", "LEASE", "BUY"]);

const formSchema = z.object({
  availabilityType: availTypeSchema,
  amount: z.number().min(1, "Amount must be a positive number"),
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
              <FormLabel>Choose Unit Availability</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">{field.value || " Type "}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => {field.onChange("RENT"); setType(true);}}>
                      Rent
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => {field.onChange("RENT"); setType(false);}}>
                      Lease
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => {field.onChange("RENT"); setType(false);}}>
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
                <Input placeholder="0 " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type&& (
          <>
        <FormField
          control={form.control}
          name="securityDeposit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Security Deposit</FormLabel>
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
                <Input placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </>
        )}

        <div className="flex justify-center">
          <Button type="submit" className="w-full">
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
