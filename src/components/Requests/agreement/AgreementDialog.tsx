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
import { MakePaymentDialog } from "../../../components/profile/MakePaymentDialog";

interface AgreementDialogProps {
  request: UnitRequestSchema,
  refresh: boolean,
  setRefresh: Function
}

export default function AgreementDialog({ request, refresh, setRefresh }: AgreementDialogProps) {
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
        if(res.status===200){
          toast.success(res.data)
        }
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
        setRefresh(!refresh)
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
            {request.type !== "BUY" && <>The owner has accepted your request. Enter details below to create agreement.</>}
          </DialogDescription>
        </DialogHeader>
        {request.type !== "BUY" ? <AgreementForm createAgreement={createAgreement} request={request} /> :<MakePaymentDialog amount={request.amount} type={request.type} createAgreement={createAgreement}/>}
      </DialogContent>
    </Dialog>
  );
}
