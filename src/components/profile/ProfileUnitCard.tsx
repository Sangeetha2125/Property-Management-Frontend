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
import { Bath, BedDouble, Building2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { MapPin, Phone } from "lucide-react";


const ProfileUnitCard = () => {
  return (
    <div className=" grid grid-cols-3 flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
       <Card className=" w-[900px]">
        <CardHeader className="grid grid-cols-8">
          <CardTitle  className="col-start-1 col-span-6">Unit Name</CardTitle>
          <Badge className="px-7 col-start-8 text-white bg-green-500" variant="outline">Occupied</Badge> 
        </CardHeader>
        <CardContent>
          
          <br/>
          <div className="grid grid-cols-2">
          <CardDescription>
            <div className="grid grid-cols-8">
              <MapPin />
              <div className="col-span-7">
                <CardDescription className="col-span-5 col-start-2 ">
                  Address, State, City, <br />
                  Pincode
                </CardDescription>
                <br/>
              </div>
            </div>
            <div className="grid grid-cols-2">
            <p className="text-l font-bold text-zinc-500">Owner Name: </p>
            <p className="  flex text-l font-bold text-zinc-500"><Phone py-10 size={"16px"}/> <span className="mb-2"> : 6785431267</span></p>

            </div>
            <br/>
            </CardDescription>
          <br/>
        </div>
          <div className="grid grid-cols-8">
          <CardDescription className="grid grid-cols-2 col-span-2 gap-1"><Building2/>3452sqft</CardDescription>
          <CardDescription className="grid grid-cols-2 col-start-4 col-span-2 gap-1"><BedDouble/>2</CardDescription>
          <CardDescription className="grid grid-cols-2 col-start-7 col-span-2 gap-1"><Bath/>3</CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
        
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileUnitCard;
