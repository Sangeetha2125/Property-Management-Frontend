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
import {  MapPin, Phone, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { UpdateProperty } from "./UpdatePropertyDialog";
import { useState } from "react";
import noimage from "../../assets/noimage.png"
import AddImage from "./AddImage";

interface PropertyCardProps {
  property: PropertySchema;
  role: string | null;
  refresh: boolean;
  setRefresh: Function;
  imageData?: string[];
}

const PropertyCard = ({
  property,
  role,
  refresh,
  setRefresh,
  imageData
}: PropertyCardProps) => {
  return (
    <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      <Card className="w-[450px]">
        <div className="p-8 h-72">
        {imageData && imageData.length > 0?(
          <img
          src={`data:image/jpeg;base64,${imageData[0]}`}
          alt={`Property ${property.id}`}
          className="h-full w-full object-cover"
          
        />):
        <img src={noimage} className="h-full w-full object-cover"/>}
        </div>
        <CardHeader className="grid grid-cols-12 items-center pt-0">
          <CardTitle
            className={`${
              property.type == "GATED_COMMUNITY"
                ? "col-span-8"
                : `${
                    property.type == "APARTMENT" ? "col-span-9" : "col-span-10"
                  }`
            }`}
          >
            <p className="flex space-x-3 flex-wrap">
              <span>{property.name}</span>
              {role==="OWNER"?(
                <><UpdateProperty
                refresh={refresh}
                setRefresh={setRefresh}
                property={property}
              />
              {(!imageData || imageData.length === 0) && <AddImage propertyid={""+property.id} refresh={refresh} setRefresh={setRefresh}/>}</>
              ):<></>}
              
            </p>
          </CardTitle>
          <div className="flex">
            <Badge variant={"outline"}>{property.type}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center ">
              <MapPin size="28" color="darkblue" />
              <div className="ml-4">
                <CardDescription className="leading-6 text-black-[500]">
                  {property.address}, {property.city}, {property.state} -{" "}
                  {property.pincode}
                </CardDescription>
              </div>
            </div>
            {role !== "OWNER" && (
              <CardDescription className="leading-6 pt-6 text-gray-500 text-sm grid grid-cols-2 gap-10 w-full ml-10">
                <p className="flex space-x-2">
                  <User size="20" color="darkblue" />
                  <span>
                    {" " +
                      property.owner.firstName +
                      " " +
                      property.owner.lastName}
                  </span>
                </p>

                <p className="flex space-x-2">
                  <Phone size="20" color="darkblue" />
                  <span>{" " + property.owner.phoneNumber}</span>
                </p>
              </CardDescription>
            )}
          </div>
        </CardContent>
        <CardFooter className="w-full">
          {role === "OWNER" ? (
            <>
              <Link
                to={`/properties/${property.id}/units`}
                className="block w-full"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full px-5 col-span-4 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500"
                >
                  Manage Units
                </Button>
              </Link>
            </>
          ) : (
            <Link
              to={`/properties/${property.id}/units`}
              className="block w-full"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full px-5 col-span-4 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500"
              >
                View Units
              </Button>
            </Link>
          )}
          
        </CardFooter>
      </Card>
    </div>
  );
};

export default PropertyCard;
