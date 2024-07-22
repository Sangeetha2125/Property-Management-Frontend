import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../../components/ui/button";
import { AddProperty } from "../../components/properties/AddPropertyDialog";
import PropertyCard from "../../components/properties/PropertyCard";
import SideNavbar from "../../components/shared/SideNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { PropertySchema } from "../../types/schema";

const PropertyPage = () => {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const [refresh, setRefresh] = useState(false)
  const [properties, setProperties] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: "http://localhost:8080/api/properties/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        setProperties(res.data)
      })
      .catch((err) => {
        if (err.message == "Network Error") {
          toast.error("Please try again later")
        }
        else {
          console.log(err)
        }
      })
  }, [refresh])

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* <img src={logo} alt="logo"/> */}
          <div className="ml-auto flex items-center gap-4">
            {role === "OWNER" && <AddProperty refresh={refresh} setRefresh={setRefresh} />}
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

      <div className="p-4 sm:ml-14">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {properties.map((property: PropertySchema) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
