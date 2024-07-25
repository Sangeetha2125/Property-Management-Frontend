import { Link, useParams } from "react-router-dom";
import {
  Bath,
  BedDouble,
  Building2,
  CircleUserRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../../components/ui/button";

import UnitTypeCard from "../../components/unit_type/UnitTypeCard";

import SideNavbar from "../../components/shared/SideNavbar";
import { AddUnitTypeDialog } from "../../components/unit_type/AddUnitTypeDialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UnitAvailabilitySchema, UnitSchema } from "@/types/schema";

export default function UnitType() {
  const { propertyId, unitId } = useParams()
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const [unit, setUnit] = useState<UnitSchema>()
  const [unitAvailabilities, setUnitAvailabilities] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/properties/${propertyId}/units/${unitId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        setUnit(res.data)
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later")
        }
        else {
          console.log(err)
        }
      }) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/properties/${propertyId}/units/${unitId}/availabilities/`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        setUnitAvailabilities(res.data)
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later")
        }
        else {
          console.log(err)
        }
      }) // eslint-disable-next-line
  }, [])

  return (
    <div>
      <SideNavbar />

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="ml-auto flex items-center gap-2">
            {role==="OWNER" && <AddUnitTypeDialog propertyId={propertyId} unitId={unitId}/>}
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
                <DropdownMenuItem>
                  <Link to={"/"}>Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>

      {unit && <div className=" flex justify-center items-center flex-col p-4 pt-0 sm:ml-8">
        <div className="w-11/12 pb-8">
          <h1 className="font-bold text-2xl pb-4">{unit.name}</h1>
          <h4 className="text-lg pb-4">{unit.description}</h4>
          <div className="flex gap-6 items-center">
            <p className="col bg-gray-100 rounded-full px-4 py-1 text-gray-600 text-md"><Building2 size="15" className="inline mr-2" />{unit.squareFootage + " "} sqft.</p>
            <p className="col bg-gray-100 rounded-full px-4 py-1 text-gray-600 text-md"><BedDouble size="15" className="inline mr-2" />{unit.bedrooms + " " + "Bedrooms"}</p>
            <p className="col bg-gray-100 rounded-full px-4 py-1 text-gray-600 text-md"><Bath size="15" className="inline mr-2" />{unit.bathrooms + " " + "Bathrooms"}</p>
          </div>
        </div>
        {unitAvailabilities.map((unitAvailability:UnitAvailabilitySchema) => (
          <UnitTypeCard key={unitAvailability.id} unitAvailability={unitAvailability}/>
        ))}
      </div>}
    </div>
  );
}
