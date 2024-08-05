import { CircleUserRound, LogOut, User } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import SideNavbar from "../../components/shared/SideNavbar";
import UnitCard from "../../components/units/UnitCard";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddUnit } from "../../components/units/AddUnitDialog";
import { UnitSchema } from "../../types/schema";
import logo from "../../assets/logo.png";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import nodata from "../../assets/nodata.jpeg";
const UnitPage = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [refresh, setRefresh] = useState(false);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/api/properties/${id}/units/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUnits(res.data);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later");
        } else {
          console.log(err);
        }
      }); // eslint-disable-next-line
  }, [refresh]);

  const [filterType, setFilterType] = useState<
    "bedrooms" | "bathrooms" | "squareFootage" | "name"
  >("name");
  const [search, setSearch] = useState<string>("");
  const filteredUnits = units.filter((unit: UnitSchema) =>
    String(unit[filterType]).toLowerCase().includes(search.toLowerCase())
  );
  const len = filteredUnits.length;

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <img width={90} height={50} src={logo} alt="logo" />

          <div className="ml-auto flex items-center gap-2">
            <div className="search-bar-container grid grid-cols-3 gap-3">
              <div className="">
                <Select
                  value={filterType}
                  onValueChange={setFilterType as (value: string) => void}
                >
                  <SelectTrigger className="btn">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="bedrooms">Bedrooms</SelectItem>
                    <SelectItem value="bathrooms">Bathrooms</SelectItem>
                    <SelectItem value="squareFootage">Area (sqft)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Input
                type="text"
                value={search}
                className="w-60 col-span-2"
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search by ${
                  filterType[0].toUpperCase() + filterType.substring(1)
                }`}
              ></Input>
            </div>
            {role === "OWNER" && (
              <AddUnit
                refresh={refresh}
                setRefresh={setRefresh}
                propertyId={id}
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
      <div className="px-3 sm:ml-14 py-4">
        {len > 0 ? (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {filteredUnits.map((unit: UnitSchema) => (
              <UnitCard key={unit.id} unit={unit} role={role} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-row">
            <img src={nodata} alt="No data found" className="w-1/2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitPage;
