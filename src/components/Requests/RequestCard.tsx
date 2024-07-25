import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { CancelAlert } from "./CancelAlertDialog";
import { Badge } from "../ui/badge";
import AgreementDialog from "./agreement/AgreementDialog";
import { MapPin, Phone, User } from "lucide-react";

export default function RequestsCard() {
  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-[800px]">
        <div className="grid grid-cols-3 gap-4 mb-4"></div>

        <CardHeader className="pb-2">
          <div className="justify-left grid grid-cols-8 gap-4 mb-0 ">
            <CardTitle className="col-span-7 pb-0">Unit Name</CardTitle>
            <Badge
              className="px-4 col-start-8 text-white bg-orange-500"
              variant="outline"
            >
              Declined
            </Badge>
            {/* <Badge className="col-start-8 text-white bg-green-500" variant="outline">Approved</Badge> 
            <Badge className="px-4 col-start-8 text-white bg-red-500 self-autor" variant="outline">Rejected</Badge>  
            <Badge className="px-4 col-start-8 text-white bg-gray-500 self-autor" variant="outline">Pending</Badge>   */}
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
                {/* <p>Requested by:</p> */}
                <p className="flex">
                  <Phone size={"16px"} />
                  <span>:</span>
                </p>
              </div>
            </div>
          </CardDescription>
          </CardContent>
        <CardFooter>
          {/* <div className="grid grid-cols-8 gap-4 mb-4 w-full ">
            <Button className=" px-5 col-span-4 text-red-500 border-red-500 hover:text-white hover:bg-red-500" variant="outline">Reject</Button>
            <Button className="px-5 col-span-4 text-green-500 border-green-500 hover:text-white hover:bg-green-500" variant="outline">Accept</Button>
          </div> */}
          {/* <CancelAlert /> */}
          <AgreementDialog />
        </CardFooter>
      </Card>
    </div>
  );
}
