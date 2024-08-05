import {
    CircleUserRound,
    LogOut,
    User,
  } from "lucide-react";
  import { Link, useNavigate } from "react-router-dom";
  import { Button } from "../../components/ui/button";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../components/ui/select";
  
import { DropdownMenu,DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
  import { Input } from "../../components/ui/input";
  import SideNavbar from "../../components/shared/SideNavbar";
import AgreementCard from "../../components/agreement page/AgreementCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AgreementSchema } from "@/types/schema";
import logo from "../../assets/logo.png";
import { Separator } from "../../components/ui/separator";
import nodata from "../../assets/nodata.jpeg"
  
  const AgreementPage = () => {
    const [currentAgreements, setCurrentAgreements] = useState([])
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const logout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("role")
      setTimeout(() => {
        navigate("/")
      }, 1000)
    }
    useEffect(() => {
      axios({
        method: 'get',
        url: "http://localhost:8080/api/agreements/current",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data)
          setCurrentAgreements(res.data)
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
    const [filterType, setFilterType] = useState<"city" | "state" | "pincode" | "address" | "name">("city");
    const [search, setSearch] = useState<string>("");
    const filteredAgreements = currentAgreements.filter((agreement: AgreementSchema) =>
      agreement.request.unit.property[filterType].toLowerCase().includes(search.toLowerCase())
    );
    const len=filteredAgreements.length

    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <SideNavbar/>
  
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <img width={90} height={50}src={logo} alt="logo"/>   

            <div className="ml-auto flex items-center gap-2">
              <Select
                value={filterType}
                onValueChange={setFilterType as (value: string) => void}
                >
                <SelectTrigger className="btn min-w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                  <SelectItem value="address">Address</SelectItem>
                  <SelectItem value="pincode">Pincode</SelectItem>
                </SelectContent>
              </Select>
              
              </div>
              
              <Input type='text' value={search} className="w-60 col-span-2"
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search by ${filterType[0].toUpperCase()+filterType.substring(1)}`}></Input>            
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
                  <span onClick={()=>toast.success("Logged out successfully")}>Log out</span>
                </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
        </header>
        <Separator />
      </div>
  
        <div className="p-4 sm:ml-14">
        {len > 0 ? (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {filteredAgreements.map((currentAgreement:AgreementSchema)=>(
            <AgreementCard key={currentAgreement.id} agreement={currentAgreement}/>
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
  
  export default AgreementPage;
  