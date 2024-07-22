import { useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import UnitForm from "./UnitForm"
import axios from "axios"
import { toast } from "sonner"

interface AddUnitProps {
  refresh: boolean,
  setRefresh: Function;
  propertyId: string | undefined
}

export function AddUnit({ refresh, setRefresh, propertyId }: AddUnitProps) {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const addUnit = (values: any, token: string) => {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/properties/${propertyId}/units/`,
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
        <Button variant="default" size="sm" className="px-6" onClick={() => setIsOpen(true)}>Add Unit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Unit</DialogTitle>
          <DialogDescription>
            Add you unit here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <UnitForm addUnit={addUnit} />
      </DialogContent>
    </Dialog>
  )
}
