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

  interface CancelAlertProps{
    cancelRequest:Function
  }
  
  export function CancelAlert({cancelRequest}:CancelAlertProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className=" text-red-500 border-red-500 w-full hover:text-white hover:bg-red-500" variant="outline">Cancel Request</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.This will cancel your request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>cancelRequest("CANCEL")}>Yes, Cancel</AlertDialogCancel>
            <AlertDialogAction>No, Don't Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }