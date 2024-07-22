import * as React from "react"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

export default function Listing_card() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Property type</CardTitle>
        <CardDescription>Property description</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
           <h2>Property Name</h2>
            </div>
           
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
       
      </CardFooter>
    </Card>
  )
}
