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
import { useState } from "react"

interface AddUnitDialogProps{
  unitId:string|undefined,
  propertyId:string|undefined,
  refresh: boolean,
  setRefresh: Function;
}

export function AddUnitTypeDialog({propertyId,unitId, refresh, setRefresh}:AddUnitDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
        if (res.status === 201) {
          toast.success(res.data)
          setRefresh(!refresh)
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
        setIsOpen(false)
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="px-6" onClick={() => setIsOpen(true)}>Add Unit Availability</Button>
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
