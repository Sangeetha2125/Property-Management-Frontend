import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Bath,
  BedDouble,
  Building2,
  CircleUserRound,
  LogOut,
  Phone,
  User,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";

import UnitTypeCard from "../../components/unit_type/UnitTypeCard";

import SideNavbar from "../../components/shared/SideNavbar";
import { AddUnitTypeDialog } from "../../components/unit_type/AddUnitTypeDialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UnitAvailabilitySchema, UnitSchema } from "@/types/schema";
import logo from "../../assets/logo.png";
import { Separator } from "../../components/ui/separator";
import Loading from "../shared/Loading";

export default function UnitType() {
  const { propertyId, unitId } = useParams();
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [unit, setUnit] = useState<UnitSchema>();
  const [unitAvailabilities, setUnitAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/api/properties/${propertyId}/units/${unitId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUnit(res.data);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later");
        } else {
          console.log(err);
        }
      }); // eslint-disable-next-line
  }, [refresh]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/api/properties/${propertyId}/units/${unitId}/availabilities/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUnitAvailabilities(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 250);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later");
        } else {
          console.log(err);
        }
      }); // eslint-disable-next-line
  }, [refresh]);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div>
      <SideNavbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <img width={90} height={50} src={logo} alt="logo" />

          <div className="ml-auto flex items-center gap-2">
            {role === "OWNER" && (
              <AddUnitTypeDialog
                propertyId={propertyId}
                unitId={unitId}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CircleUserRound
                  width={40}
                  height={40}
                  className=" overflow-hidden rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 mr-1 p-2 bg-white border-2 border-zinc-200 rounded-sm">
                <DropdownMenuGroup>
                  <Link to={"/profile"}>
                    <DropdownMenuItem className="flex items-center pt-2">
                      <User className="mr-2 h-4 w-4" />
                      <span className="">Profile</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <div onClick={logout}>
                  <DropdownMenuItem className="flex items-center pt-2 pb-2">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span
                      onClick={() => toast.success("Logged out successfully")}
                    >
                      Log out
                    </span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <Separator />
      </div>

      {unit && (
        <div className="p-4 pt-0 sm:ml-14 py-4">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className=" flex  flex-col p-4 pt-0">
                <Breadcrumb className="hidden md:flex pb-1">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={"/properties"}>Properties</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={`/properties/${propertyId}/units`}>
                          {unit.property.name}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{unit.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-3xl font-semibold text-blue-800 pb-2">
                  {unit.name}
                </h1>
                <h4 className="text-lg pb-4">{unit.description}</h4>
                <div className="flex gap-6 items-center">
                  <p className="col bg-gray-100 rounded-full px-4 py-1 text-gray-600 text-md">
                    <Building2 size="15" className="inline mr-2" />
                    {unit.squareFootage + " "} sqft.
                  </p>
                  <p className="col bg-gray-100 rounded-full px-4 py-1 text-gray-600 text-md">
                    <BedDouble size="15" className="inline mr-2" />
                    {unit.bedrooms + " Bedrooms"}
                  </p>
                  <p className="col bg-gray-100 rounded-full px-4 py-1 text-gray-600 text-md">
                    <Bath size="15" className="inline mr-2" />
                    {unit.bathrooms + " Bathrooms"}
                  </p>
                </div>
                {role!=="OWNER"&&(
                  <div className="flex gap-6 items-center pt-5">
                  <p className="col bg-blue-100 rounded-full px-4 py-1 text-gray-600 text-md">
                    <User size="15" className="inline mr-2" />
                    {unit.property.owner.firstName +
                      " " +
                      unit.property.owner.lastName}
                  </p>
                  <p className="col bg-blue-100 rounded-full px-4 py-1 text-gray-600 text-md">
                    <Phone size="15" className="inline mr-2" />
                    {unit.property.owner.phoneNumber}
                  </p>
                </div>
                )}
                
              </div>

              {unitAvailabilities.length > 0 ? (
                <div className="w-11/12 grid grid-cols-3 gap-4 mb-4">
                  {unitAvailabilities.map(
                    (unitAvailability: UnitAvailabilitySchema) => (
                      <UnitTypeCard
                        key={unitAvailability.id}
                        unitAvailability={unitAvailability}
                        propertyId={propertyId}
                        unitId={unitId}
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    )
                  )}
                </div>
              ) : (
                <div className="inset-0 flex flex-col justify-center text-gray-600 animate-pulse">
                  <br/>
                  <p className="">
                    You have not added any availability for this unit. Click on "Add
                    Unit Availability" button in the navigation bar to add
                    availability.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
