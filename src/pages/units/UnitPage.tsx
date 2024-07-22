import {
    Building,
    CircleUserRound,
    Home,
    MessageSquareDot,
  } from "lucide-react"
import { Link } from 'react-router-dom'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "../../components/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../../components/ui/button"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { AlertDialogDemo } from "../../components/units/RequestAlertDialog"

const UnitPage = () => {
    return(
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/"}
                className="flex h-9 w-9 items-center bg-white justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only bg-white">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
          <Link
            to="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Building className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Units</span>
          </Link>
          
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/"}
                className="flex h-9 w-9 items-center bg-white justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <MessageSquareDot className="h-5 w-5" />
                <span className="sr-only">Requests</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Requests</TooltipContent>
          </Tooltip>
          </TooltipProvider>
          </nav>
        </aside>

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-3xl">
            View Units
          </h1>
          <div className="ml-auto flex items-center gap-2">
          
          <DropdownMenu>
            <DropdownMenuTrigger>
            
            <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <CircleUserRound
                  width={36}
                  height={36}
                  className="overflow-hidden rounded-full"
                />
                
              </Button>
              
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><Link to={"/"}>Logout</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </header>
        </div>
        
      <div className="p-4 sm:ml-14">
      <div className="grid grid-cols-3 gap-4 mb-4">
         <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
         <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="pb-7">Unit Id</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Unit description</CardDescription>
        <CardDescription>No.of bedrooms</CardDescription>
        <CardDescription>No. of bathrooms</CardDescription>
        <CardDescription>Unit Price</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
      
      <AlertDialogDemo/>
      </CardFooter>
    </Card>
         </div>
         <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
         <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Unit Id</CardTitle>
      </CardHeader>
      <CardContent>
      <CardDescription>Unit description</CardDescription>
        <CardDescription>No.of bedrooms</CardDescription>
        <CardDescription>No. of bathrooms</CardDescription>
        <CardDescription>Unit Price</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
     
      <AlertDialogDemo/>
      </CardFooter>
    </Card>    
         </div>
         <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
         <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Unit Id</CardTitle>
      </CardHeader>
      <CardContent>
      <CardDescription>Unit description</CardDescription>
        <CardDescription>No.of bedrooms</CardDescription>
        <CardDescription>No. of bathrooms</CardDescription>
        <CardDescription>Unit Price</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
      
      <AlertDialogDemo/>
      </CardFooter>
    </Card>
         </div>
      </div>
  </div>
</div>
    )
}

export default UnitPage