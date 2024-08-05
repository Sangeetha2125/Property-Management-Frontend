import { CircleUserRound, LogOut, User } from "lucide-react";

import SideNavbar from "../../components/shared/SideNavbar";

import logo from "../../assets/logo.png";

import { DropdownMenu,DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Separator } from "../../components/ui/separator";
import {  } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import BuyerPropertiesCard from "../../components/properties/BuyerPropertiesCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UnitSchema } from "@/types/schema";
import nodata from "../../assets/nodata.jpeg";
import Loading from "../shared/Loading";


const BuyerProperties = () => {
  const token = localStorage.getItem("token")
  const [buyerUnits, setBuyerUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: 'get',
      url: "http://localhost:8080/api/units/own",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        setBuyerUnits(res.data)
        setTimeout(() => {
          setLoading(false);
        }, 250);
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

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate("/")
    }, 1000)
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <img width={90} height={30} src={logo} alt="logo" />
          <div className="ml-auto flex items-center gap-4">
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
            </div>
        </header>
        <Separator />
      </div>

      <div className="p-4 pt-0 sm:ml-14">
      {loading ? (
          <Loading/>
        ) : (
          <>
        <h1 className="text-3xl font-semibold text-blue-800 pb-2 px-3">
          Bought Properties
        </h1>
        <p className="pb-3 px-3 text-gray-600"></p>
        {buyerUnits.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 mb-4">
          {buyerUnits.map((buyerUnit:UnitSchema)=>(
            <BuyerPropertiesCard key={buyerUnit.id} unit={buyerUnit}/>
          ))}
      </div>
        ) : (
          <div className="flex items-center justify-center flex-row">
            <img src={nodata} alt="No data found" className="w-1/2" />
          </div>
        )}
        </>
        )}
      
        
      </div>
    </div>
  );
};

export default BuyerProperties;
