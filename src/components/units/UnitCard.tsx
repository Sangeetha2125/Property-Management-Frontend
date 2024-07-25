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
import { UnitSchema } from "../../types/schema";
import { Bath, BedDouble, Building2 } from "lucide-react";
import { Badge } from "../ui/badge";

interface UnitCardProps {
  unit: UnitSchema,
  role: string | null
}

const UnitCard = ({ unit, role }: UnitCardProps) => {
  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-[480px]">
        <CardHeader className="grid grid-cols-8">
          <CardTitle className="col-span-6">{unit.name}</CardTitle>
          <Badge variant={"outline"} className="col-span-2 ">{unit.availability}</Badge>
        </CardHeader>
        <CardContent>
          <CardDescription>{unit.description}</CardDescription>
          <br />
          <div className="flex justify-between items-center">
            <p className="col bg-gray-100 rounded-full px-4 py-1 text-gray-600 text-md"><Building2 size="15" className="inline mr-2" />{unit.squareFootage + " "} sqft.</p>
            <p className="col bg-gray-100 rounded-full px-4 py-1 text-gray-600 text-md"><BedDouble size="15" className="inline mr-2" />{unit.bedrooms + " " + "Bedrooms"}</p>
            <p className="col bg-gray-100 rounded-full px-4 py-1 text-gray-600 text-md"><Bath size="15" className="inline mr-2" />{unit.bathrooms + " " + "Bathrooms"}</p>
          </div>
        </CardContent>
        <CardFooter className="w-full">
          {unit.availability === "SOLD_OUT" ?
            <Button variant="outline" size="sm" className="w-full px-5 col-span-4 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500">View Buyer Details</Button>
            : <Link to={`/properties/${unit.property.id}/units/${unit.id}`} className="block w-full">
              <Button variant="outline" size="sm" className="w-full px-5 col-span-4 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500">View Details</Button>
            </Link>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnitCard;
