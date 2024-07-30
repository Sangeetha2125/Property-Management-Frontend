import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface MakePaymentDialogProps{
  amount:number,
  agreementId: number,
}

export function MakePaymentDialog({amount, agreementId}:MakePaymentDialogProps) {
  const token = localStorage.getItem("token")
  const proceedToPayment = () => {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/transactions/${agreementId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data)
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
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full text-blue-500 border-blue-500  hover:text-white hover:bg-blue-500"
          variant="outline"
        >
          Make Payment
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Make Payment</AlertDialogTitle>
          <AlertDialogDescription className="text-black text-md">
            Your monthly rent amount is <span className="font-semibold">₹{amount}</span>. Click the button below to pay now.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          <AlertDialogAction className="w-full" onClick={proceedToPayment}>Pay Now</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
