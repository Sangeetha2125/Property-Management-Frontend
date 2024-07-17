import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import LogIn_Form from "../components/auth/login_form"


export default function LogIn() {
  return (
    <div className=" flex justify-center items-center h-screen">
      <Card className="w-[500px]">
      <CardHeader className="text-center">
        <CardTitle>Log In</CardTitle>
        <CardDescription>Trusted place to find a home for your family.</CardDescription>
      </CardHeader>
      <CardContent>
        <LogIn_Form/>
    </CardContent>
    </Card>
    </div>
    
  )
}
