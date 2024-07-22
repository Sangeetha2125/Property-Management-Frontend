import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const PropertyCard = () => {
  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Property Name</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Property description</CardDescription>
          <CardDescription>Pincode</CardDescription>
          <CardDescription>No.of units</CardDescription>
          <CardDescription>Unit type</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={"/properties/1/units"}>
            <Button>Manage Units</Button>
          </Link>
          {/*   <Button className="text right " variant="default">Request</Button> */}
        </CardFooter> 
      </Card>
    </div>
  );
};

export default PropertyCard;
