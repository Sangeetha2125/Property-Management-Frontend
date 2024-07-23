
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

export default function RequestsCard() {
  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-[800px]">
        <div className="grid grid-cols-3 gap-4 mb-4"></div>

        <CardHeader>
          <div className="justify-left grid grid-cols-8 gap-4 mb-4 ">
            <CardTitle className="col-span-7">Unit Name</CardTitle>
            <Badge className="px-4 col-start-8 text-white bg-orange-500" variant="outline">Declined</Badge> 
            {/* <Badge className="col-start-8 text-white bg-green-500" variant="outline">Approved</Badge> 
            <Badge className="px-4 col-start-8 text-white bg-red-500 self-autor" variant="outline">Rejected</Badge>  
            <Badge className="px-4 col-start-8 text-white bg-gray-500 self-autor" variant="outline">Pending</Badge>   */}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="font-bold text-xl text-zinc-700 tracking-loose">
            Property Name
          </CardDescription>

          <p className="pt-5">Address</p>
          <p>Owner Name</p>
          <p>Owner Contact Number</p>
          
        </CardContent>
        <CardFooter>
          <div className="grid grid-cols-8 gap-4 mb-4 w-full ">
            <Button className=" px-5 col-span-4 text-red-500 border-red-500 hover:text-white hover:bg-red-500" variant="outline">Reject</Button>
            <Button className="px-5 col-span-4 text-green-500 border-green-500 hover:text-white hover:bg-green-500" variant="outline">Accept</Button>
          </div>
          {/* /* <CancelAlert /> */ }
        </CardFooter>
      </Card>
    </div>
  );
}
