import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  CalendarFold,
  IndianRupee,
  KeyRound,
  User,
  Clock9,
} from "lucide-react";
import { MapPin } from "lucide-react";
import { TerminateAlert } from "./TerminateAgreement";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { AgreementSchema } from "@/types/schema";
import { MakePaymentDialog } from "./MakePaymentDialog";

const ProfileUnitCard = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [currentAgreement, setCurrentAgreement] =
    useState<AgreementSchema | null>(null);
  const [lastPaidDate, setLastPaidDate] = useState<Date>(
    new Date("1900-01-01")
  );
  const [isRentPaid, setIsRentPaid] = useState(false);
  

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/agreements/current",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setCurrentAgreement(res.data);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later");
        } else {
          console.log(err);
        }
      }); // eslint-disable-next-line
  }, []);
 
  const terminateAgreement = () => {
    axios({
      method: "post",
      url: `http://localhost:8080/api/agreements/terminate/${currentAgreement?.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data);
          setCurrentAgreement(null);
        }
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later");
        } else {
          console.log(err);
          toast.error(err.response.data);
        }
      });
  };

  useEffect(() => {
    if (currentAgreement) {
      axios
        .get(
          `http://localhost:8080/api/transactions/lastTransactionDate/${currentAgreement.request.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming the JWT token is stored in local storage
            },
          }
        )
        .then((response) => {
          if (response.data) {
            const day = response.data.slice(0, 2);
            const month = response.data.slice(2, 4);
            const year = response.data.slice(4);
            const lastPaid = new Date(year, month - 1, day);
            setLastPaidDate(lastPaid);
            const currentDate = new Date();
            if (
              lastPaid.getMonth() === currentDate.getMonth() &&
              lastPaid.getFullYear() === currentDate.getFullYear()
            ) {
              setIsRentPaid(true);
            } else {
              setIsRentPaid(false);
            }
          }
        });
    }
  }, [currentAgreement]);

  return (
    <div className=" items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
      {role !== "OWNER" && currentAgreement && (
        <Card>
          <div className="grid grid-cols-3 gap-4 mb-4"></div>
          <CardHeader className="pb-2">
            <div className="justify-left grid grid-cols-8 gap-4 mb-0 ">
              <CardTitle className="col-span-7 pb-0">
                {currentAgreement.request.unit.name} -{" "}
                {currentAgreement.request.type[0] +
                  currentAgreement.request.type.slice(1).toLowerCase()}{" "}
                Agreement
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className=" text-zinc-700">
              {currentAgreement.request.unit.property.name}
            </CardDescription>
            <br />

            <CardDescription className="grid grid-cols-2 gap-4">
              <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                <MapPin size="28" color="darkblue" />
                <div className="ml-4">
                  <CardDescription className="leading-6 text-black-[500]">
                    {currentAgreement.request.unit.property.address},{" "}
                    {currentAgreement.request.unit.property.state},{" "}
                    {currentAgreement.request.unit.property.city} -{" "}
                    {currentAgreement.request.unit.property.pincode}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                <User size="28" color="darkblue" />
                <div className="ml-4">
                  <p className="pb-1">
                    Owner:{" "}
                    {currentAgreement.request.unit.property.owner.firstName +
                      " " +
                      currentAgreement.request.unit.property.owner.lastName}
                  </p>
                  <p className="pb-1">
                    Contact:{" "}
                    {currentAgreement.request.unit.property.owner.phoneNumber}
                  </p>
                  <p>
                    Email: {currentAgreement.request.unit.property.owner.email}
                  </p>
                </div>
              </div>
            </CardDescription>
            <br />
            <div className="flex flex-wrap items-center gap-4">
              {currentAgreement.request.type !== "BUY" && (
                <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
                  <Clock9 size="20" className="inline" />
                  <p className="inline ml-2">
                    Start Date:{" "}
                    {new Date(
                      currentAgreement.startDate.split(" ")[0]
                    ).toLocaleDateString()}
                  </p>
                </CardDescription>
              )}
              <CardDescription className="bg-gray-100 rounded-full px-2 py-1 text-gray-600">
                <IndianRupee size="20" className="inline" />
                <p className="inline ml-2">
                  Amount: {currentAgreement.request.amount}
                </p>
              </CardDescription>
              {currentAgreement.request.securityDeposit && (
                <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
                  <KeyRound size="20" className="inline" />
                  <p className="inline ml-2">
                    Deposit: {currentAgreement.request.securityDeposit}
                  </p>
                </CardDescription>
              )}
              {currentAgreement.request.monthlyDue && (
                <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
                  <CalendarFold size="20" className="inline" />
                  <p className="inline ml-2">
                    Due Date: {currentAgreement.request.monthlyDue}
                  </p>
                </CardDescription>
              )}
              {currentAgreement.request.noOfMonths &&
                currentAgreement.request.type === "RENT" && (
                  <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
                    <CalendarFold size="20" className="inline" />
                    <p className="inline ml-2">
                      Min No of months: {currentAgreement.request.noOfMonths}
                    </p>
                  </CardDescription>
                )}
              {currentAgreement.numberOfYears && (
                <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
                  <CalendarFold size="20" className="inline" />
                  <p className="inline ml-2">
                    No of years: {currentAgreement.numberOfYears}
                  </p>
                </CardDescription>
              )}
              {currentAgreement.request.type === "RENT" && (
                <CardDescription className="bg-gray-100 rounded-full px-4 py-1 text-gray-600">
                  <Clock9 size="20" className="inline" />
                  <p className="inline ml-2">
                    Last paid on:{" "}
                    {lastPaidDate.getFullYear() > 1900
                      ? lastPaidDate.toLocaleDateString()
                      : "N/A"}
                  </p>
                </CardDescription>
              )}
              {isRentPaid && (
                <CardDescription className="bg-green-500 text-white rounded-full px-4 py-1">
                  Rent Paid for this month
                </CardDescription>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            {currentAgreement.request.type === "RENT" && (
              <MakePaymentDialog
                amount={currentAgreement.request.amount}
                agreementId={currentAgreement.id}
                isRentPaid={isRentPaid}
              />
            )}
            <TerminateAlert terminateAgreement={terminateAgreement} />
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ProfileUnitCard;
