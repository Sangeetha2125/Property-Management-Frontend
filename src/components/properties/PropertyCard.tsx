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
import { PropertySchema } from "../../types/schema";

interface PropertyCardProps {
  property: PropertySchema
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>{property.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{property.address}</CardDescription>
          <CardDescription>{property.state}</CardDescription>
          <CardDescription>{property.city}</CardDescription>
          <CardDescription>{property.pincode}</CardDescription>
          <CardDescription>{property.type}</CardDescription>
          <CardDescription>{property.numUnits}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={`/properties/${property.id}/units`}>
            <Button>Manage Units</Button>
          </Link>
          {/*   <Button className="text right " variant="default">Request</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PropertyCard;
