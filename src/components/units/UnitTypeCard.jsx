import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RequestAlertDialog } from "./RequestAlertDialog";

const UnitTypeCard = () => {
  return (
    <div className='w-10/12 '>
      <Card className=' grid grid-cols-8 gap-5'>
        <div className='col-span-7'>
          <CardHeader>
            <CardTitle >Availability Type</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-5'>
            <CardDescription>Unit Price: </CardDescription>
            <CardDescription>Security Deposit: </CardDescription>
            <CardDescription>Availability type: </CardDescription>
          </CardContent>
        </div>
        <div className='flex justify-center items-center'>
          <br />
          <RequestAlertDialog />
        </div>
      </Card>
      <br />
    </div>
  );
};

export default UnitTypeCard;
