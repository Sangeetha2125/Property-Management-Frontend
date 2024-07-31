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
  Clock9
} from "lucide-react";

interface AgreementCardProps{
  agreement: AgreementSchema
}

export default function AgreementCard({agreement}:AgreementCardProps) {
  return (
    <div className="rounded bg-gray-50 dark:bg-gray-800 w-full">
      {agreement && <Card className="min-h-700">
        <CardHeader className="pb-2">
          <div>
            <CardTitle>{agreement.request.unit.name} - {agreement.request.type[0]+ agreement.request.type.slice(1).toLowerCase()} Agreement</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-zinc-700">
            {agreement.request.unit.property.name}
          </CardDescription>
          <br />

          <CardDescription className="grid grid-cols-2 gap-4">
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <MapPin size="28" color="darkblue" />
              <div className="ml-4">
                <CardDescription className="leading-6 text-black-[500]">
                  {agreement.request.unit.property.address}, {agreement.request.unit.property.state}, {agreement.request.unit.property.city} - {agreement.request.unit.property.pincode}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <User size="28" color="darkblue" />
              <div className="ml-4">
                <p className="pb-1">User: {agreement.request.user.firstName + " " + agreement.request.user.lastName}</p>
                <p className="pb-1">
                  Contact: {agreement.request.user.phoneNumber}
                </p>
                <p>Email: {agreement.request.user.email}</p>
              </div>
            </div>
          </CardDescription>
          <br />
          <div className="flex items-center gap-4 flex-wrap">
            {agreement.request.type!=="BUY" && <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <Clock9 size="20" className="inline" />
              <p className="inline ml-2">Start Date: {new Date(agreement.startDate.split(" ")[0]).toLocaleDateString()}</p>
            </CardDescription>}
            <CardDescription className="bg-gray-100 rounded-full px-2 py-1 text-gray-600">
              <IndianRupee size="20" className="inline" />
              <p className="inline ml-2">Amount: {agreement.request.amount}</p>
            </CardDescription>
            {agreement.request.securityDeposit && <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <KeyRound size="20" className="inline" />
              <p className="inline ml-2">Deposit: {agreement.request.securityDeposit}</p>
            </CardDescription>}
            {agreement.request.monthlyDue && <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <CalendarFold size="20" className="inline" />
              <p className="inline ml-2">Due Date: {agreement.request.monthlyDue}</p>
            </CardDescription>}
            {agreement.request.noOfMonths && agreement.request.type==="RENT" && <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <CalendarFold size="20" className="inline" />
              <p className="inline ml-2">Min No of months: {agreement.request.noOfMonths}</p>
            </CardDescription>}
            {agreement.numberOfYears && <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <CalendarFold size="20" className="inline" />
              <p className="inline ml-2">No of years: {agreement.numberOfYears}</p>
            </CardDescription>}
            {agreement.request.type==="RENT" && <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <Clock9 size="20" className="inline" />
              <p className="inline ml-2">Last paid on: {new Date(agreement.lastPaidDate.split(" ")[0]).toLocaleString()}</p>
            </CardDescription>}
          </div>
        </CardContent>
        <CardFooter className="flex">
          {/* Send notification enable */} 
        </CardFooter>
      </Card>}
    </div>
  );
}
