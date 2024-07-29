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
  } from "../ui/alert-dialog"
  import { Button } from "../ui/button"
  
  export function MakePayment() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-full text-red-500 border-red-500  hover:text-white hover:bg-red-500" variant="outline">Make Payment</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Please ensure you have competed your payment process.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-red-500 bg-white border-2 border-destructive hover:text-white hover:bg-red-500">Yes, Terminate</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }