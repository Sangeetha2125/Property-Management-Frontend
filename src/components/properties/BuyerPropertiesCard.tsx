import { AgreementSchema } from "@/types/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  CalendarFold,
  IndianRupee,
  KeyRound,
  MapPin,
  User,
  Clock9,
} from "lucide-react";

export default function BuyerPropertiesCard() {
  return (
    <div className="rounded bg-gray-50 dark:bg-gray-800 w-full">
      <Card className="min-h-700">
        <CardHeader className="pb-2">
          <div>
            <CardTitle>Unit Name </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-zinc-700">
            Property name
          </CardDescription>
          <br />

          <CardDescription className="grid grid-cols-2 gap-4">
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <MapPin size="28" color="darkblue" />
              <div className="ml-4">
                <CardDescription className="leading-6 text-black-[500]">
                  Address,city,state, pincode
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <User size="28" color="darkblue" />
              <div className="ml-4">
                <p className="pb-1">Bought From: Name</p>
                <p className="pb-1">Contact:Phone</p>
                <p>Email: email</p>
              </div>
            </div>
          </CardDescription>
          <br />
          <div className="flex items-center gap-4 flex-wrap">
            <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <Clock9 size="20" className="inline" />
              <p className="inline ml-2">Start Date: </p>
            </CardDescription>
            <CardDescription className="bg-gray-100 rounded-full px-2 py-1 text-gray-600">
              <IndianRupee size="20" className="inline" />
              <p className="inline ml-2">Amount:</p>
            </CardDescription>
            <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <CalendarFold size="20" className="inline" />
              <p className="inline ml-2">Due Date: </p>
            </CardDescription>
            
            <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <CalendarFold size="20" className="inline" />
              <p className="inline ml-2">Min No of months: </p>
            </CardDescription>
            
            <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <CalendarFold size="20" className="inline" />
              <p className="inline ml-2">No of years: </p>
            </CardDescription>
            <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <Clock9 size="20" className="inline" />
              <p className="inline ml-2">Last paid on:</p>
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex">
          {/* Send notification enable */}
        </CardFooter>
      </Card>
    </div>
  );
}
