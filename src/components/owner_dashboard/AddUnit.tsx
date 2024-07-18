import Property_Form from "./property_form"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import Unit_Form from "./unit_form"

export function AddUnit() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Unit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Unit</DialogTitle>
          <DialogDescription>
            Add you unit here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <Unit_Form/>
      </DialogContent>
    </Dialog>
  )
}
