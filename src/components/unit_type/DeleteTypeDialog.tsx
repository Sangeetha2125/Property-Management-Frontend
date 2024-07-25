import axios from "axios"
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
import { toast } from "sonner"
import { useState } from "react"

interface DeleteTypeDialogProps{
  availabilityId: number,
  unitId: string|undefined,
  propertyId: string|undefined,
  refresh: boolean,
  setRefresh: Function;
}
  
  export function DeleteTypeDialog({availabilityId, unitId, propertyId, refresh, setRefresh}:DeleteTypeDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const token = localStorage.getItem("token")
    const deleteUnitAvailaibility = () => {
      axios({
        method: 'delete',
        url: `http://localhost:8080/api/properties/${propertyId}/units/${unitId}/availabilities/${availabilityId}`,
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
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button size="sm" className="text-red-500 border-red-500 hover:text-white hover:bg-red-500 px-8 w-full" variant="outline" onClick={() => setIsOpen(true)}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete this type.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={deleteUnitAvailaibility }>Yes, Delete</AlertDialogCancel>
            <AlertDialogAction>No, Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }