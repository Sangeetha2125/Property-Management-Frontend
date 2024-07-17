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

export function AddProperty() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Property</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Property</DialogTitle>
          <DialogDescription>
            Add you property here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Property_Form/>
      </DialogContent>
    </Dialog>
  )
}
