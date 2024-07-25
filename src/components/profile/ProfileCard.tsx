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
import React, { useRef, useEffect } from 'react';
import { Phone } from "lucide-react";

import { CircleUserRound } from "lucide-react";

const ProfileCard = () => {
  return (
    <div>
 <Card>
  <CardHeader>
    <div className="grid grid-cols-3"> <CardTitle> <CircleUserRound size={"100px"} /></CardTitle>
    <CardDescription className="pt-8 text-2xl text-zinc-600">First Name</CardDescription>
    <CardDescription className="pt-8 text-2xl text-zinc-600">Last Name</CardDescription>
</div>
</CardHeader>
  <CardContent>
  <div className="rounded-lg box-border bg-blue-100 h-40 w-80 p-4 border-4 ...">
    <p className="  flex text-l font-bold text-zinc-500"><Phone size={"16px"}/> <span className="mb-4 ml-2">:6785431267</span></p>
  </div></CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

    </div>
  );
};

export default ProfileCard;
