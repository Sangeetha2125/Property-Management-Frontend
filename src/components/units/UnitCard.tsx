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

interface UnitCardProps {
  unit: UnitSchema
}

const UnitCard = ({ unit }: UnitCardProps) => {
  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>{unit.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{unit.description}</CardDescription>
          <CardDescription>Square Footage: {unit.squareFootage}</CardDescription>
          <CardDescription>No. of Bedrooms: {unit.bedrooms}</CardDescription>
          <CardDescription>No. of Bathrooms: {unit.bathrooms}</CardDescription>
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
