import axios from "axios"
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
import { toast } from "sonner"

interface AddUnitDialogProps{
  unitId:string|undefined,
  propertyId:string|undefined
}

export function AddUnitTypeDialog({propertyId,unitId}:AddUnitDialogProps) {
  const addUnitAvailaibility = (values: any, token: string) => {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/properties/${propertyId}/units/${unitId}/availabilities/`,
      data: values,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          toast.success(res.data)
          // setRefresh(!refresh)
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
      .finally(() => {
        // setIsOpen(false)
      })
  }
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
        <UnitTypeForm addUnitAvailaibility={addUnitAvailaibility}/>
      </DialogContent>
    </Dialog>
  )
}
