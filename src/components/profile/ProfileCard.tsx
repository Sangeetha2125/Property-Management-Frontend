import { UserSchema } from "@/types/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../ui/card";
import { Mail, Phone } from "lucide-react";
import { Circle } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const ProfileCard = () => {
  const token = localStorage.getItem("token")
  const [profile, setProfile] = useState<UserSchema | null>()

  useEffect(() => {
    axios({
      method: 'get',
      url: "http://localhost:8080/api/auth/getCurrentUser",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        setProfile(res.data)
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later")
        }
        else {
          console.log(err)
        }
      }) // eslint-disable-next-line
  }, [])

  return (
    <div>{profile && <Card>
      <CardHeader>
        <div className="flex justify-center">
          <CircleUserRound size={"168px"} />
        </div>
        <CardDescription className="text-2xl text-zinc-600 flex justify-center">
          {profile.firstName+" "+profile.lastName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-blue-50 w-full p-4 leading-8">
          <p className="flex text-zinc-500 items-center">
            <Phone size={"16px"} />
            <span className="ml-2">Mobile Number: {profile.phoneNumber}</span>
          </p>
          <p className="flex text-zinc-500 items-center">
            <Mail size={"16px"} />
            <span className="ml-2">Email Address: {profile.email}</span>

          </p>
          <p className="flex text-zinc-500 items-center">
            <Circle size={"16px"} />
            <span className="ml-2">Role: {profile.role}</span></p>
        </div>
      </CardContent>
    </Card>}</div>
  );
};

export default ProfileCard;
