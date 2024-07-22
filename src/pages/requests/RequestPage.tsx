import {
  CircleUserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../../components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import SideNavbar from "../../components/shared/SideNavbar";

const RequestPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavbar/>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-3xl">View Requests</h1>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div>
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
                </div>
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

      <div className="p-4 sm:ml-14">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
            <Card className="w-[800px]">
              <div className="grid grid-cols-3 gap-4 mb-4"></div>

              <CardHeader>
              <div className="justify-left grid grid-cols-8 gap-4 mb-4 ">
                <CardTitle className="col-span-7">Unit Name</CardTitle>
                <Badge className="col-start-8">Approved</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-bold text-xl text-zinc-700 tracking-loose">
                  Property Name
                </CardDescription>

                <p className="pt-5">Address</p>
                <p>Owner Name</p>
                <p>Owner Contact Number</p>
                <CardDescription className=" font-bold text-8l tracking-loose">
                  Status :{" "}
                </CardDescription>
              </CardContent>
              <CardFooter >
                <div className="grid grid-cols-8 gap-4 mb-4 w-full ">
                  <Button className=" px-5 col-span-4">
                    Reject
                  </Button>
                  <Button className="px-5 col-span-4">
                    Accept
                  </Button>
                </div>

                {/* <CancelAlert/> */}
              </CardFooter>
            </Card>
          </div>
          <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
            <Card className="w-[800px]">
              <div className="grid grid-cols-3 gap-4 mb-4"></div>

              <CardHeader>
                <div className="justify-left grid grid-cols-8 gap-4 mb-4 ">
                  <Badge className="col-start-8">Approved</Badge>
                </div>

                <CardTitle>Unit Name</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-bold text-xl text-zinc-700 tracking-loose">
                  Property Name
                </CardDescription>

                <p className="pt-5">Address</p>
                <p>Owner Name</p>
                <p>Owner Contact Number</p>
                <CardDescription className=" font-bold text-8l tracking-loose">
                  Status :{" "}
                </CardDescription>
              </CardContent>
              <CardFooter className=" flex justify-end items-center content-center">
                <div className="grid grid-cols-4 gap-4 mb-4 ">
                  {" "}
                  <Button className=" px-5 col-start-3 col-end-3">
                    {" "}
                    Reject{" "}
                  </Button>
                  <Button className="px-5 col-start-4 col-end-4">
                    {" "}
                    Accept{" "}
                  </Button>
                </div>
                {/* <CancelAlert/>
                 */}
              </CardFooter>
            </Card>
          </div>
          <div className="flex items-center justify-center h-50 rounded bg-gray-50 dark:bg-gray-800">
            <Card className="w-[800px]">
              <div className="grid grid-cols-3 gap-4 mb-4"></div>

              <CardHeader>
              <div className="justify-left grid grid-cols-8 gap-4 mb-4 ">
                  <Badge className="col-start-8">Approved</Badge>
                </div>
                <CardTitle>Unit Name</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-bold text-xl text-zinc-700 tracking-loose">
                  Property Name
                </CardDescription>

                <p className="pt-5">Address</p>
                <p>Owner Name</p>
                <p>Owner Contact Number</p>
                <CardDescription className=" font-bold text-8l tracking-loose">
                  Status :{" "}
                </CardDescription>
              </CardContent>
              <CardFooter className=" flex justify-end items-center content-center">
                <div className="grid grid-cols-4 gap-4 mb-4 ">
                  {" "}
                  <Button className=" px-5 col-start-3 col-end-3">
                    {" "}
                    Reject{" "}
                  </Button>
                  <Button className="px-5 col-start-4 col-end-4">
                    {" "}
                    Accept{" "}
                  </Button>
                </div>
                {/* <CancelAlert/> */}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
