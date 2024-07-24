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
import { MapPin } from "lucide-react";
import { Badge } from "../ui/badge";

interface PropertyCardProps {
  property: PropertySchema;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-[450px]">
        <CardHeader className="grid grid-cols-8">
          <CardTitle className="col-span-6">{property.name}</CardTitle>
          <Badge variant={"outline"} className="col-span-2 text">{property.type}</Badge>
        </CardHeader>
        <CardContent>

          <div className="grid grid-cols-6">
            <MapPin />
            <div className="col-span-5">
              <CardDescription className="col-span-5">
                {property.address}, {property.state}, {property.city} <br/>{property.pincode}
              </CardDescription>
            </div>
          </div>
          <br/>
          <CardDescription>Number of units: {property.numUnits}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={`/properties/${property.id}/units`}>
            <Button>Manage Units</Button>
          </Link>
          {/*   <Button className="text right " variant="default">View Units</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PropertyCard;
