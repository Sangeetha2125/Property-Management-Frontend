import * as React from "react"
import { Link } from 'react-router-dom'
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
    <div className=" flex justify-center items-center h-screen" >
      <Card className="w-[500px]">
      <CardHeader className="text-center">
        <CardTitle>Log In</CardTitle>
        <CardDescription>Trusted place to find a home for your family.</CardDescription>
      </CardHeader>
      <CardContent>
        <LogIn_Form/>
        <div className="text-center">
        <Link to={"/signup"} className="inline-flex items-center justify-center p-5 text-base font-medium underline text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">Don't have an account?</Link>
        </div>
        
    </CardContent>
    </Card>
    </div>
    
  )
}
