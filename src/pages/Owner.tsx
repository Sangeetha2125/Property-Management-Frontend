import * as React from "react"

import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"



export default function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Property Name</CardTitle>
        <CardDescription>Property description</CardDescription>
        <CardDescription>Pincode</CardDescription>
        <CardDescription>No.of units</CardDescription>
        <CardDescription>unit type</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-3 w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              
              
            </div>
            <div className="flex flex-col space-y-1.5">
              
              
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        
        <Button>Add Unit</Button>
      </CardFooter>
    </Card>
  )
}

     