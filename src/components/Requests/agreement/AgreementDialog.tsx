import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import AgreementForm from "./AgreementForm";
import { useState } from "react";
import { UnitRequestSchema } from "@/types/schema";
import axios from "axios";
import { toast } from "sonner";

interface AgreementDialogProps {
  request: UnitRequestSchema
}

export default function AgreementDialog({ request }: AgreementDialogProps) {
  const token = localStorage.getItem("token")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const createAgreement = (values: any, requestId: number) => {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/agreements/create/${requestId}`,
      data: values,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later")
        }
        else {
          toast.error(err.response.data)
          console.log(err)
        }
      })
      .finally(() => {
        setIsOpen(false)
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full px-5 col-span-4 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500" onClick={() => setIsOpen(true)}>Create Agreement</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Agreement to {request.type}</DialogTitle>
          <DialogDescription>
            {request.type !== "BUY" ? <>The owner has accepted your request. Enter details below to create agreement.</> : <>Proceed to payment to buy the unit</>}
          </DialogDescription>
        </DialogHeader>
        {request.type !== "BUY" ? <AgreementForm createAgreement={createAgreement} request={request} /> :<div className="flex gap-4"> <Button className="w-full px-5 col-span-4 text-green-500 border-green-500 hover:text-white hover:bg-green-500" variant="outline">Yes, Proceed to payment</Button> <Button className="w-full px-5 col-span-4 text-red-500 border-red-500 hover:text-white hover:bg-red-500" variant="outline">No, Cancel</Button></div>}
      </DialogContent>
    </Dialog>
  );
}
