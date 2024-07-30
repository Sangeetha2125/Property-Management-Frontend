import { UnitSchema } from "@/types/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Bath, BedDouble, Building2,
  MapPin,
  User,
} from "lucide-react";

interface BuyerPropertiesCardProps{
  unit: UnitSchema
}

export default function BuyerPropertiesCard({unit}:BuyerPropertiesCardProps) {
  return (
    <div className="rounded bg-gray-50 dark:bg-gray-800 w-full">
      <Card className="min-h-700">
        <CardHeader className="pb-2">
          <div>
            <CardTitle>{unit.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-zinc-700">
            {unit.property.name}
          </CardDescription>
          <br />

          <CardDescription className="grid grid-cols-2 gap-4">
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <MapPin size="28" color="darkblue" />
              <div className="ml-4">
                <CardDescription className="leading-6 text-black-[500]">
                {unit.property.address}, {unit.property.state}, {unit.property.city} - {unit.property.pincode}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <User size="28" color="darkblue" />
              <div className="ml-4">
                <p className="pb-1">Bought From: {unit.property.owner.firstName + " " + unit.property.owner.lastName}</p>
                <p className="pb-1">Mobile Number: {unit.property.owner.phoneNumber}</p>
                <p>Email: {unit.property.owner.email}</p>
              </div>
            </div>
          </CardDescription>
          <br />
          <div className="flex items-center gap-4 flex-wrap">
            <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <Building2 size="15" className="inline mr-2" />
              <p className="inline ml-2">Square Footage: {unit.squareFootage}</p>
            </CardDescription>
            <CardDescription className="bg-gray-100 rounded-full px-2 py-1 text-gray-600">
              <BedDouble size="15" className="inline mr-2" />
              <p className="inline ml-2">Bedrooms: {unit.bedrooms}</p>
            </CardDescription>
            <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
              <Bath size="15" className="inline mr-2" />
              <p className="inline ml-2">Bathrooms: {unit.bathrooms}</p>
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
