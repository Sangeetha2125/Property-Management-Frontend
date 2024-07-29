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
  role: string|null
}

const PropertyCard = ({ property, role }: PropertyCardProps) => {
  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-[450px]">
        <CardHeader className="grid grid-cols-12 items-center">
          <CardTitle className={`${property.type=="GATED_COMMUNITY" ? "col-span-8": `${property.type=="APARTMENT" ? "col-span-9":  "col-span-10" }` }`}>{property.name}</CardTitle>
          <div><Badge variant={"outline"}>{property.type}</Badge></div>
        </CardHeader>
        <CardContent>

          <div className="flex items-center bg-blue-50 p-4 rounded-lg">
            <MapPin size="28" color="darkblue"/>
            <div className="ml-4">
              <CardDescription className="leading-6 text-black-[500]">
                {property.address}, {property.city}, {property.state} - {property.pincode}
              </CardDescription>
            </div>
          </div>

        </CardContent>
        <CardFooter className="w-full">
          {role==="OWNER"?<Link to={`/properties/${property.id}/units`} className="block w-full">
            <Button variant="outline" size="sm" className="w-full px-5 col-span-4 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500">Manage Units</Button>
          </Link>:<Link to={`/properties/${property.id}/units`} className="block w-full">
            <Button variant="outline" size="sm" className="w-full px-5 col-span-4 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500">View Units</Button>
          </Link>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PropertyCard;
