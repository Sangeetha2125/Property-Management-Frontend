import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UnitSchema } from "../../types/schema";
import { Bath, BedDouble, Building2, CalendarFold, IndianRupee, KeyRound, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { MapPin, Phone } from "lucide-react";
import { TerminateAlert } from "./TerminateAgreement";


const ProfileUnitCard = () => {
  return (
    <div className=" items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card>
        <div className="grid grid-cols-3 gap-4 mb-4"></div>

        <CardHeader className="pb-2">
          <div className="justify-left grid grid-cols-8 gap-4 mb-0 ">
            <CardTitle className="col-span-7 pb-0">Unit Name</CardTitle>
          </div>
        </CardHeader> 
        <CardContent>
          <CardDescription className=" text-zinc-700">
            Property Name
          </CardDescription>
          <br />

          <CardDescription className="grid grid-cols-2 gap-4">
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <MapPin size="28" color="darkblue" />
              <div className="ml-4">
                <CardDescription className="leading-6 text-black-[500]">
                  Address, State, City, <br />
                  Pincode
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <User size="28" color="darkblue" />
              <div className="ml-4">
                <p>Owner: </p>
                <p className="flex">
                  <Phone size={"16px"} />
                  <span>:</span>
                </p>
              </div>
            </div>
          </CardDescription>
          <br />
          <div className="grid grid-cols-6 gap-4">
            <CardDescription className=" col-span-2 bg-gray-100 rounded-full px-4 py-1 text-gray-600 flex items-center space-x-2">
              <IndianRupee size="24" />
              <p className="col-span-2">Amount: 12000</p>
              
            </CardDescription>
            <CardDescription className="col-span-2  bg-gray-100 rounded-full px-4 py-1 text-gray-600 flex items-center space-x-2">
              <KeyRound size="24"/>
              <p className="col-span-2">Deposit: 12000</p>
            </CardDescription>
            <CardDescription className="col-span-2 bg-gray-100 rounded-full px-4 py-1 text-gray-600 flex items-center space-x-2">
              <CalendarFold size="24" />
              <p className="col-span-2">Due Date: 3</p>
            </CardDescription>
            <CardDescription>Last paid on: </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2">
          Make payment- enable on 1st of month
          <TerminateAlert/>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileUnitCard;
