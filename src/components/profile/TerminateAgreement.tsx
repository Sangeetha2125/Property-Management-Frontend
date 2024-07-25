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
  
  export function TerminateAlert() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className=" text-red-500 border-red-500  hover:text-white hover:bg-red-500" variant="outline">Terminate Agreement</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will terminate your agreement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Don't Terminate</AlertDialogCancel>
            <AlertDialogAction className="text-red-500 bg-white border-2 border-destructive hover:text-white hover:bg-red-500">Yes, Terminate</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }