import {
  CircleUserRound,
} from "lucide-react"
import { Link, useParams } from 'react-router-dom'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../../components/ui/button"
import SideNavbar from "../../components/shared/SideNavbar"
import UnitCard from "../../components/units/UnitCard"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import axios from "axios"
import { AddUnit } from "../../components/units/AddUnitDialog"
import { UnitSchema } from "../../types/schema"

const UnitPage = () => {
  const { id } = useParams()
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const [refresh, setRefresh] = useState(false)
  const [units, setUnits] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/properties/${id}/units/`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        setUnits(res.data)
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later")
        }
        else {
          console.log(err)
        }
      }) // eslint-disable-next-line
  }, [refresh])

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* <img src={logo} alt="logo"/> */}
          <div className="ml-auto flex items-center gap-2">
            {role === "OWNER" && <AddUnit refresh={refresh} setRefresh={setRefresh} propertyId={id} />}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <CircleUserRound
                    width={36}
                    height={36}
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><Link to={"/"}>Logout</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>
      <div className="p-4 sm:ml-14">
        {/* <h1 className="text-3xl text-center mb-8">
            Units of Property: name
          </h1> */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {units.map((unit: UnitSchema) => (
            <UnitCard key={unit.id} unit={unit} role={role}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UnitPage