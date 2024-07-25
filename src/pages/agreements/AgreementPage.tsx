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
  
  import SideNavbar from "../../components/shared/SideNavbar";
import AgreementCard from "../../components/agreement page/AgreementCard";
  
  const AgreementPage = () => {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <SideNavbar/>
  
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <h1 className="text-3xl">Active Agreements</h1>
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
            <AgreementCard/>
          </div>
        </div>
      </div>
    );
  };
  
  export default AgreementPage;
  