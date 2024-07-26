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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";
import axios from "axios";
import { useState } from "react";

interface RequestAlertDialogProps {
  refresh: boolean;
  setRefresh: Function;
  availabilityId: number;
}
const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
});

export function RequestAlertDialog({ refresh, setRefresh, availabilityId }: RequestAlertDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    requestUnit(values)
    form.reset()
  }

  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const requestUnit = (values: any) => {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/requests/create/${availabilityId}`,
      data: values,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data)
          setRefresh(!refresh)
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
      .finally(() => {
        setIsOpen(false)
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full px-5 col-span-4 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500"
          onClick={() => {
            setIsOpen(true); form.reset()
          }}
        >
          Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request this property</DialogTitle>
          <DialogDescription>
            This will send a request to the owner for this unit.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel> <br />
                      <FormControl>
                        <Input placeholder="Enter request message." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-4">
                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
