import Property_Form from "./PropertyForm"
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

interface AddPropertyProps {
  refresh: boolean,
  setRefresh : Function;
}

export function AddProperty ({refresh, setRefresh}:AddPropertyProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const addProperty = (values:any,token:string) => {
    axios({
      method:'post',
      url: "http://localhost:8080/api/properties/",
      data: values,
      headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
      }
    })
    .then((res)=>{
      console.log(res)
      if (res.status == 201) {
        toast.success(res.data)
        setRefresh(!refresh)
      }
    })
    .catch((err)=>{
      if (err.response.status == 400) {
        toast.error(err.response.data)
      }
    })
    .finally(()=>{
      setIsOpen(false)
    })
  }
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="px-5" onClick={()=>setIsOpen(true)}>Add Property</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Property</DialogTitle>
          <DialogDescription>
            Add you property here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <Property_Form addProperty={addProperty}/>
      </DialogContent>
    </Dialog>
  )
}
