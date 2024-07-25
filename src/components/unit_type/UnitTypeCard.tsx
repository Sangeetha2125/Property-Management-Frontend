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
}

const UnitTypeCard = ({ unitAvailability }: UnitAvailabilityProps) => {
  const role = localStorage.getItem("role")

  return (
    <div className='w-11/12'>
      <Card className='grid grid-cols-8 gap-5'>
        <div className='col-span-6'>
          <CardHeader>
            <CardTitle >{unitAvailability.availabilityType}</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-8'>
            <CardDescription className="grid grid-cols-4 col-span-2"><IndianRupee />Amount: {unitAvailability.amount}</CardDescription>
            <CardDescription className="grid grid-cols-4 col-start-4 col-span-2"><KeyRound />Deposit: {unitAvailability.securityDeposit}</CardDescription>
            <CardDescription className="grid grid-cols-4 col-start-7 col-span-2"><CalendarFold />Monthly Due: {unitAvailability.monthlyDue}</CardDescription>
          </CardContent>
        </div>
        <div className='flex justify-center items-center col-span-2'>
          <br />
          {role != "OWNER" ? <DeleteTypeDialog /> : <RequestAlertDialog />}
        </div>
      </Card>
      <br />
    </div>
  );
};

export default UnitTypeCard;
