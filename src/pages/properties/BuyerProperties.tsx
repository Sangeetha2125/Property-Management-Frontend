import { CircleUserRound, LogOut, User } from "lucide-react";

import SideNavbar from "../../components/shared/SideNavbar";

import logo from "../../assets/logo.png";

import { DropdownMenu,DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Separator } from "../../components/ui/separator";
import {  } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import BuyerPropertiesCard from "../../components/properties/BuyerPropertiesCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UnitSchema } from "@/types/schema";

const BuyerProperties = () => {
  const token = localStorage.getItem("token")
  const [buyerUnits, setBuyerUnits] = useState([])

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
                <div>
                <DropdownMenuItem className="flex items-center pt-2 pb-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </header>
        <Separator />
      </div>

      <div className="p-4 sm:ml-14">
        <div className="grid grid-cols-2 gap-4 mb-4">
            {buyerUnits.map((buyerUnit:UnitSchema)=>(
              <BuyerPropertiesCard key={buyerUnit.id} unit={buyerUnit}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerProperties;
