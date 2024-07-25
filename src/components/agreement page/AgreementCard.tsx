import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { MapPin, Phone } from "lucide-react";

export default function AgreementCard() {
  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-11/12">
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

          <CardDescription className="grid grid-cols-2">
            <div className="grid grid-cols-12">
              <MapPin />
              <div className="col-span-11">
                <CardDescription className="col-span-5">
                  Address, State, City, <br />
                  Pincode
                </CardDescription>
              </div>
            </div>

            <div>
              <p>Occupied by: </p>
              <p className="flex">
                <Phone size={"16px"} />
                <span>:</span>
              </p>
            </div>
          </CardDescription>
          <CardDescription>

          </CardDescription>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
