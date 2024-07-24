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
  unit: UnitSchema
}

const UnitCard = ({ unit }: UnitCardProps) => {
  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-[450px]">
        <CardHeader className="grid grid-cols-8">
          <CardTitle  className="col-span-6">{unit.name}</CardTitle>
          <Badge variant={"outline"} className="col-span-2 ">Availability</Badge>
        </CardHeader>
        <CardContent>
          <CardDescription>{unit.description}</CardDescription>
          <br/>
          <div className="grid grid-cols-8">
          <CardDescription className="grid grid-cols-3 col-span-2 gap-1"><Building2/>{unit.squareFootage}sqft</CardDescription>
          <CardDescription className="grid grid-cols-3 col-start-4 col-span-2 gap-1"><BedDouble/>{unit.bedrooms}</CardDescription>
          <CardDescription className="grid grid-cols-3 col-start-7 col-span-2 gap-1"><Bath/>{unit.bathrooms}</CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={"/properties/1/units/1"}>
            <Button>View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnitCard;
