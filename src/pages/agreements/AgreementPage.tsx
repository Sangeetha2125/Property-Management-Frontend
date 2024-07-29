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
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AgreementSchema } from "@/types/schema";
import logo from "../../assets/logo.png";

  
  const AgreementPage = () => {
    const [currentAgreements, setCurrentAgreements] = useState([])
    const token = localStorage.getItem("token")
    useEffect(() => {
      axios({
        method: 'get',
        url: "http://localhost:8080/api/agreements/current",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data)
          setCurrentAgreements(res.data)
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            toast.error("Please try again later")
          }
          else {
            console.log(err)
          }
        }) // eslint-disable-next-line
    }, [])

    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <SideNavbar/>
  
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <img width={90} height={50}src={logo} alt="logo"/>   

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
          <div className="grid grid-cols-2 gap-4 mb-4">
           {currentAgreements.map((currentAgreement:AgreementSchema)=>(
            <AgreementCard key={currentAgreement.id} agreement={currentAgreement}/>
           ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default AgreementPage;
  