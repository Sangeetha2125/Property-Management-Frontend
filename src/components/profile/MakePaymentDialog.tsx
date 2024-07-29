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

export function MakePaymentDialog() {
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
          <AlertDialogDescription className="text-black">
            Your rent amount is <span className="font-semibold">AMOUNT</span>. Click the button below to pay now.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Pay Now</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
