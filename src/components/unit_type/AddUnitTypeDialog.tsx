import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import UnitTypeForm from "./UnitTypeForm"

export function AddUnitTypeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="px-6">Add Unit Availability</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Unit Availablity</DialogTitle>
          <DialogDescription>
            Add you unit availabity here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <UnitTypeForm/>
      </DialogContent>
    </Dialog>
  )
}
