import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Building,
  CircleUserRound,
  Home,
  MessageSquareDot,
} from "lucide-react";
import { Link } from "react-router-dom";
const SideNavbar = () => {
  return (
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
            <span className="sr-only">Properties</span>
          </Link>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/requests"}
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
  );
};

export default SideNavbar;
