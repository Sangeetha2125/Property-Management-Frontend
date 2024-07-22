import { Link } from "react-router-dom";
import {
  CircleUserRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../../components/ui/button";

import UnitTypeCard from "../../components/unit_type/UnitTypeCard";

import SideNavbar from "../../components/shared/SideNavbar";
import { AddUnitTypeDialog } from "../../components/unit_type/AddUnitTypeDialog";

export default function UnitType() {
  return (
    <div>
      <SideNavbar />

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* <h1 className="text-3xl">Unit:name of Property: name</h1> */}
          <div className="ml-auto flex items-center gap-2">
            <AddUnitTypeDialog/>
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
                <DropdownMenuItem>
                  <Link to={"/"}>Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>

      <div className=" flex justify-center items-center flex-col p-4 sm:ml-14">
        <br />
        <div className="w-11/12">
          <h1 className="text-3xl">Unit name</h1>
          <br />
          <h4 className="text-xl">Description</h4>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.{" "}
          </p>
          <br />
          <div className=" text-zinc-800">
            No. of bedrooms:
            <br />
            No. of bathrooms:
            <br />
            Square Footage:
          </div>
        </div>
        <br />
        <br />
        <UnitTypeCard />
        <UnitTypeCard />
        <UnitTypeCard />

      </div>
    </div>
  );
}
