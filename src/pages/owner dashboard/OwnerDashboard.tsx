import {
    CircleUserRound,
    Copy,
    CreditCard,
    MoreVertical,
    Truck,
  } from "lucide-react";
  import { Link } from "react-router-dom";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@radix-ui/react-dropdown-menu";
  import { Button } from "../../components/ui/button";
  
  import SideNavbar from "../../components/shared/SideNavbar";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../components/ui/card";
  
import { DropdownMenuSeparator } from "../../components/ui/dropdown-menu";
import { Separator } from "../../components/ui/separator";
import ExpenseForm from "../../components/owner dashboard/ExpenseForm";
  
  const OwnerDashboard = () => {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <SideNavbar/>
  
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <h1 className="text-3xl">Your Dashboard</h1>
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
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-4" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-3xl">Your Income</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Your Income Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription>Total Income:</CardDescription>
                  <CardDescription>Total Expense:</CardDescription>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Unit Name</CardTitle>
                  <CardDescription className="text-lg">Income:</CardDescription>
                </CardHeader>
                <CardFooter>
                </CardFooter>
              </Card>
              
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Unit Name</CardTitle>
                  <CardDescription className="text-lg">Income:</CardDescription>
                </CardHeader>
                <CardFooter>
                </CardFooter>
              </Card>
            </div>
          </div>
          <Card className="p-8">
            <CardTitle>Enter Your Expenses Here.</CardTitle>
            <br/>
            <ExpenseForm/>
          </Card>
            
        </main>
        </div>
  
      </div>
    );
  };
  
  export default OwnerDashboard;