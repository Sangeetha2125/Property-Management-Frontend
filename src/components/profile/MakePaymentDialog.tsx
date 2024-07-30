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

interface MakePaymentDialogProps{
  amount:number,
  agreementId: number,
}

export function MakePaymentDialog({amount, agreementId}:MakePaymentDialogProps) {
  const proceedToPayment = () => {
    
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
