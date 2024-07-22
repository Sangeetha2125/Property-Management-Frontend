import { Link } from 'react-router-dom'
import {
    Building,
    CircleUserRound,
    Home,
    MessageSquareDot,
  } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "../../components/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../../components/ui/button"

import UnitTypeCard from '../../components/units/UnitTypeCard'


export default function UnitType() {
  return (
    <div>
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
            Unit:name of Property: name
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
        

    <div className=" flex justify-center items-center flex-col p-4 sm:ml-14" >
        <br/>
        <div className='w-10/12'>
            <h4 className='text-xl'>Description</h4>
            <br/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
            <br/>
            <div className=' text-zinc-800'>
                No. of bedrooms: 
                <br/>
                No. of bathrooms:
                <br/>
                Square Footage:
            </div>

        </div>
        <br/>
        <br/>
    <UnitTypeCard/>
    <UnitTypeCard/>
    <UnitTypeCard/>
    
    </div>
    
    </div>
    
  )
}
