import { CircleUserRound, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
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
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UnitRequestSchema } from "@/types/schema";
import logo from "../../assets/logo.png";
import { Separator } from "../../components/ui/separator";
import nodata from "../../assets/nodata.jpeg";
import Loading from "../shared/Loading";
const RequestPage = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [refresh, setRefresh] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setTimeout(() => {
          setLoading(false);
        }, 250);
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
  const filteredRequests = requests.filter((request: UnitRequestSchema) => {
    if (search === "") {
      return request;
    }
    return String(request[filterType])
      .toLowerCase()
      .includes(search.toLowerCase());
  });
  const len = filteredRequests.length;

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <img width={90} height={30} src={logo} alt="logo" />
          <div className="ml-auto flex items-center gap-2">
            <div className="search-bar-container grid grid-cols-2 gap-3">
              <div className="">
                <Select
                  value={filterType}
                  onValueChange={(val) => {
                    setSearch("");
                    setFilterType(val as SetStateAction<"status" | "type">);
                  }}
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
                <SelectTrigger className="btn min-w-60">
                  <SelectValue placeholder="Select" />
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
              <DropdownMenuTrigger asChild>
                <CircleUserRound
                  width={40}
                  height={40}
                  className=" overflow-hidden rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40 mr-1 p-2 bg-white border-2 border-zinc-200 rounded-sm">
                <DropdownMenuGroup>
                  <Link to={"/profile"}>
                    <DropdownMenuItem className="flex items-center pt-2">
                      <User className="mr-2 h-4 w-4" />
                      <span className="">Profile</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <div onClick={logout}>
                  <DropdownMenuItem className="flex items-center pt-2 pb-2">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span
                      onClick={() => toast.success("Logged out successfully")}
                    >
                      Log out
                    </span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <Separator />
      </div>

      <div className="p-4 pt-0 sm:ml-14">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-blue-800 pb-2 px-3">
              Requests
            </h1>
            <p className="pb-3 px-3 text-gray-600"></p>

            {len > 0 ? (
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
            ) : (
              <div className="flex items-center justify-center flex-row">
                <img src={nodata} alt="No data found" className="w-1/2" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RequestPage;
