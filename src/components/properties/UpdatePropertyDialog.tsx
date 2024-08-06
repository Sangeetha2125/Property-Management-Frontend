import PropertyForm from "./PropertyForm"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Pencil } from "lucide-react"

interface UpdatePropertyProps {
  refresh: boolean,
  setRefresh: Function;
  property: any;
}

export function UpdateProperty({ refresh, setRefresh, property }: UpdatePropertyProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const updateProperty = (values: any, token: string) => {
    axios({
      method: 'put',
      url: `http://localhost:8080/api/properties/${property.id}`,
      data: values,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
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
      <div className="relative group">
        <Pencil className="cursor-pointer mt-1" color="#6b6b6b" size="20" onClick={() => setIsOpen(true)} />
        <div className="absolute left-full ml-2 top-1/2 transform -translate-x-1/2 bg-white text-gray-700 text-sm rounded-md p-2 opacity-0 group-hover:opacity-100 transition duration-200 shadow-lg">
          Edit
        </div>
      </div></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Property</DialogTitle>
          <DialogDescription>
            Update your property here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <PropertyForm updateProperty={updateProperty} property={property} />
      </DialogContent>
    </Dialog>
  )
}
