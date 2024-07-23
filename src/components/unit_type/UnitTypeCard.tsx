import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DeleteTypeDialog } from "./DeleteTypeDialog";

const UnitTypeCard = () => {
  return (
    <div className='w-10/12 sm:ml-4 '>
    <Card className='grid grid-cols-8 gap-5'>
        <div className='col-span-6'>
        <CardHeader>
        <CardTitle >Availability Type</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-3 gap-5'>
        <CardDescription>Unit Price: </CardDescription>
        <CardDescription>Security Deposit: </CardDescription>
        <CardDescription>Monthly Due Date: </CardDescription>
      </CardContent>
        </div>
        <div className='flex justify-center items-center col-span-2'>
        <br/>
        <DeleteTypeDialog/>   
        {/* <RequestAlertDialog /> */}
        </div>
    </Card>
    <br/>
    </div>
  );
};

export default UnitTypeCard;
