import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import AgreementDialog from "./agreement/AgreementDialog";
import { MapPin, User, SquareArrowOutUpRight, Clock9 } from "lucide-react";
import { UnitRequestSchema } from "@/types/schema";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { CancelAlert } from "./CancelAlertDialog";
import { CalendarFold, IndianRupee, KeyRound } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";


interface RequestsCardProps {
  request: UnitRequestSchema,
  role: string | null,
  refresh: boolean,
  setRefresh: Function;
}

export default function RequestsCard({ request, role, refresh, setRefresh }: RequestsCardProps) {
  const token = localStorage.getItem("token")
  const respondRequest = (status: string) => {
    if (status !== "CANCEL") {
      axios({
        method: 'post',
        url: `http://localhost:8080/api/requests/respond/${request.id}`,
        data: { unitRequestStatus: status },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          setRefresh(!refresh)
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            toast.error("Please try again later")
          }
          else {
            toast.error(err.message)
            console.log(err)
          }
        })
    }
    else {
      axios({
        method: 'post',
        url: `http://localhost:8080/api/requests/cancel/${request.id}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          setRefresh(!refresh)
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            toast.error("Please try again later")
          }
          else {
            toast.error(err.message)
            console.log(err)
          }
        })
    }
  }

  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-[880px]">
        <div className="grid grid-cols-3 gap-4 mb-4"></div>
        <CardHeader className="pb-2">
          <div className="justify-left grid grid-cols-8 gap-4 mb-0 ">
            <CardTitle className="col-span-7 pb-0 flex items-end">{request.unit.name} - {request.type} {((request.unit.availability === "AVAILABLE" && role !== "OWNER") || role === "OWNER") && <Link to={`/properties/${request.unit.property.id}/units/${request.unit.id}`} className="inline">
              <SquareArrowOutUpRight size="20" className="inline ml-3" color="darkblue" />
            </Link>}</CardTitle>
            {request.status === "DENIED_BY_USER" && <Badge
              className="px-4 col-start-9 text-white bg-orange-500"
              variant="outline"
            >
              Declined
            </Badge>}
            {request.status === "ACCEPTED" && <Badge className="col-start-9 text-white bg-green-500" variant="outline">Accepted</Badge>}
            {request.status === "REJECTED" && <Badge className="px-4 col-start-9 text-white bg-red-500" variant="outline">Rejected</Badge>}
            {request.status === "PENDING" && <Badge className="px-4 col-start-9 text-white bg-gray-500" variant="outline">Pending</Badge>}
            {request.status === "EXPIRED" && <Badge className="px-4 col-start-9 text-white bg-orange-500" variant="outline">Expired</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className=" text-orange-900 font-bold">

          </CardDescription>
          <div className="flex gap-4 pt-4" >
            <CardDescription className="bg-violet-50 py-1 px-3 rounded-lg"><IndianRupee className="inline mr-1" size="15" />{request.amount}</CardDescription>
            {request.securityDeposit != null && <CardDescription className="bg-violet-50 py-1 px-3 rounded-lg"><KeyRound className="inline mr-1" size="15" />Deposit: {request.securityDeposit}</CardDescription>}
            {request.type === "RENT" && <CardDescription className="bg-violet-50 py-1 px-3 rounded-lg"><CalendarFold className="inline mr-1" size="15" />Due: {request.monthlyDue}</CardDescription>}
            {request.type !== "BUY" && <CardDescription className="bg-violet-50 py-1 px-3 rounded-lg"><CalendarFold className="inline mr-1" size="15" />Min No. of Months: {request.noOfMonths}</CardDescription>}
            {<CardDescription className="bg-violet-50 py-1 px-3 rounded-lg"><Clock9 className="inline mr-1" size="15" />Requested On: {new Date(request.requestDate.split(" ")[0]).toLocaleString()}</CardDescription>}
          </div>
          <br />
          {role === "OWNER" && <CardDescription className="pb-4">
            <div className="flex items-center bg-gray-100 p-4 rounded-lg leading-5">Message: {request.message}</div>
          </CardDescription>}
          <CardDescription className="grid grid-cols-2 gap-4">
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <MapPin size="28" color="darkblue" />
              <div className="ml-4">
                <CardDescription className="leading-6 text-black-[500]">
                  {request.unit.property.address}, {request.unit.property.state}, {request.unit.property.city} - {request.unit.property.pincode}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <User size="28" color="darkblue" />
              {role === "OWNER" && <div className="ml-4">
                <p className="pb-1">User: {request.user.firstName + " " + request.user.lastName}</p>
                <p className="">
                  Contact: {request.user.phoneNumber}
                </p>
              </div>}
              {role !== "OWNER" && <div className="ml-4">
                <p className="pb-1">Owner: {request.unit.property.owner.firstName + " " + request.unit.property.owner.lastName}</p>
                <p className="">
                  Contact: {request.unit.property.owner.phoneNumber}
                </p>
              </div>}
            </div>
          </CardDescription>
        </CardContent>
        {request.status !== "EXPIRED" && <>{role !== "OWNER" && <CardFooter className="flex gap-4">
          {request.status === "ACCEPTED" && <AgreementDialog request={request} refresh={refresh} setRefresh={setRefresh} />}
          {request.status === "PENDING" && <CancelAlert cancelRequest={respondRequest} />}
        </CardFooter>}
          {role === "OWNER" && request.status === "PENDING" && <CardFooter className="flex gap-4">
            <Button className="w-full px-5 col-span-4 text-green-500 border-green-500 hover:text-white hover:bg-green-500" variant="outline" onClick={() => respondRequest("ACCEPTED")}>Accept</Button>
            <Button className="w-full px-5 col-span-4 text-red-500 border-red-500 hover:text-white hover:bg-red-500" variant="outline" onClick={() => respondRequest("REJECTED")}>Reject</Button>
          </CardFooter>}</>}
      </Card>
    </div>
  );
}
