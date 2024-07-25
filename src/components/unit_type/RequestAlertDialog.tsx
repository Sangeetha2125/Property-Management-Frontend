import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { SetStateAction, useState } from "react";

interface RequestAlertDialogProps {
  refresh: boolean,
  setRefresh: Function,
  availabilityId: number
}

export function RequestAlertDialog({ refresh, setRefresh, availabilityId }: RequestAlertDialogProps) {
  const token = localStorage.getItem("token")
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const requestUnit = () => {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/requests/create/${availabilityId}`,
      data: message,
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
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMessage(event.target.value);
    console.log(message)
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full px-5 col-span-4 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500" onClick={() => setIsOpen(true)}>Request</Button>
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
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Input
              required
              id="message"
              defaultValue=""
              placeholder="Type your request message for the owner."
              onChange={handleChange}
              value={message}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              className="w-full"
              size="sm"
              onSubmit={requestUnit}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
