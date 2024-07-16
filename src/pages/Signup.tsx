import SignUp_Form from "../components/auth/signup_form";
import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"


export default function Signup() {
  return (
    <div className=" flex justify-center items-center h-screen">
      <Card className="w-[500px]">
      <CardHeader className="text-center">
        <CardTitle>Create Account.</CardTitle>
        <CardDescription>Trusted place to find a home for your family.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUp_Form/>
      </CardContent>
    </Card>
    </div>
    
  )
}
