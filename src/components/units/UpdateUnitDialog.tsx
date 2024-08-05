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
import { UnitSchema } from "@/types/schema"
import { Pencil } from "lucide-react"

interface UpdateUnitProps {
  refresh: boolean,
  setRefresh: Function;
  unit:UnitSchema;
  propertyId: string | undefined
}

export function UpdateUnit({ refresh, setRefresh, unit,propertyId }: UpdateUnitProps) {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const updateUnit = (values: any, token: string) => {
    axios({
      method: 'put',
      url: `http://localhost:8080/api/properties/${propertyId}/units/${unit.id}`,
      data: values,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          toast.success("Updated successfully")
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
      <div className="relative group">
        <Pencil className="cursor-pointer mt-1" color="#6b6b6b" size="20" onClick={() => setIsOpen(true)} />
        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 text-sm rounded-md p-2 opacity-0 group-hover:opacity-100 transition duration-200 shadow-lg">
          Edit
        </div>
      </div></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Unit</DialogTitle>
          <DialogDescription>
            Update you unit here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <UnitForm updateUnit={updateUnit} unit={unit} />
      </DialogContent>
    </Dialog>
  )
}
