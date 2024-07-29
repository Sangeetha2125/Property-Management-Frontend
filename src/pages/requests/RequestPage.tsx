import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import SideNavbar from "../../components/shared/SideNavbar";
import RequestsCard from "../../components/Requests/RequestCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UnitRequestSchema } from "@/types/schema";
import logo from "../../assets/logo.png";
import { Input } from "../../components/ui/input";

const RequestPage = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [refresh, setRefresh] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/requests/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.error("Please try again later");
        } else {
          toast.error(err.message);
          console.log(err);
        }
      }); // eslint-disable-next-line
  }, [refresh]);

  const [filterType, setFilterType] = useState<"status" | "type">("status");
  const [search, setSearch] = useState<string>("");
  const filteredRequests = requests.filter((request: UnitRequestSchema) =>
    String(request[filterType]).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <img width={90} height={30} src={logo} alt="logo" />
          <h1 className="text-3xl">View Requests</h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="search-bar-container grid grid-cols-2 gap-3">
              <div className="">
                <Select
                  value={filterType}
                  onValueChange={setFilterType as (value: string) => void}
                >
                  <SelectTrigger className="btn">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select
                value={search}
                onValueChange={setSearch as (value: string) => void}
              >
                <SelectTrigger className="btn">
                  <SelectValue placeholder="Select from drop down" />
                </SelectTrigger>
                {filterType === "status" && (
                  <SelectContent>
                    <SelectItem value="ACCEPTED">Accepted</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="EXPIRED">Expired</SelectItem>
                    <SelectItem value="DENIED_BY_USER">
                      Denied By User
                    </SelectItem>
                  </SelectContent>
                )}

                {filterType === "type" && (
                  <SelectContent>
                    <SelectItem value="RENT">Rent</SelectItem>
                    <SelectItem value="LEASE">Lease</SelectItem>
                    <SelectItem value="BUY">Buy</SelectItem>
                  </SelectContent>
                )}
              </Select>
            </div>
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
          {filteredRequests.map((request: UnitRequestSchema) => (
            <RequestsCard
              key={request.id}
              request={request}
              role={role}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
