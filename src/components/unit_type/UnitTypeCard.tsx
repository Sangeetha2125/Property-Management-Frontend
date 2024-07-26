import { CalendarFold, IndianRupee, KeyRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DeleteTypeDialog } from "./DeleteTypeDialog";
import { UnitAvailabilitySchema } from "@/types/schema";
import { RequestAlertDialog } from "./RequestAlertDialog";

interface UnitAvailabilityProps {
  unitAvailability: UnitAvailabilitySchema
  key: number,
  unitId: string | undefined,
  propertyId: string | undefined,
  refresh: boolean,
  setRefresh: Function;
}

const UnitTypeCard = ({ unitAvailability, unitId, propertyId, refresh, setRefresh }: UnitAvailabilityProps) => {
  const role = localStorage.getItem("role")

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle >{unitAvailability.availabilityType}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4" >
            <CardDescription className="bg-blue-50 p-2 rounded-lg"><IndianRupee className="inline mr-1" size="20"/>{unitAvailability.amount}</CardDescription>
            {unitAvailability.securityDeposit!=null && <CardDescription className="bg-blue-50 p-2 rounded-lg"><KeyRound className="inline mr-1"  size="20"/>Deposit: {unitAvailability.securityDeposit}</CardDescription>}
            {unitAvailability.availabilityType==="RENT" && <CardDescription className="bg-blue-50 p-2 rounded-lg"><CalendarFold className="inline mr-1"  size="20"/>Due: {unitAvailability.monthlyDue}</CardDescription>}
          </div>
          <br />
          {unitAvailability.availabilityType !=="BUY" && <CardDescription className="bg-blue-50 p-2 rounded-lg inline"><CalendarFold className="inline mr-1"  size="20"/>Min No. of Months: {unitAvailability.noOfMonths}</CardDescription>}
          <div>
            <br />
            {role == "OWNER" ? <DeleteTypeDialog unitId={unitId} propertyId={propertyId} availabilityId={unitAvailability.id} refresh={refresh} setRefresh={setRefresh} /> :<RequestAlertDialog refresh={refresh} setRefresh={setRefresh} availabilityId={unitAvailability.id}/>}
          </div>
        </CardContent> 
      </Card>
    </div> 
  );
};

export default UnitTypeCard;
