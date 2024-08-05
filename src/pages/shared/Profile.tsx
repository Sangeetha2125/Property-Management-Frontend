import { LogOut } from "lucide-react";
import ProfileUnitCard from "../../components/profile/ProfileUnitCard";
import SideNavbar from "../../components/shared/SideNavbar";
import ProfileCard from "../../components/profile/ProfileCard";
import logo from "../../assets/logo.png";
import { Separator } from "../../components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/")
    toast.success("Logged out successfully")
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <img width={90} height={50} src={logo} alt="logo" />
          <div className="ml-auto flex items-center gap-4">
            <LogOut
              width={24}
              height={24}
              className=" overflow-hidden rounded-full cursor-pointer"
              onClick={logout}
            />
          </div>
        </header>
        <Separator />
      </div>

      <div className="p-4 pt-0 sm:ml-14">
      <h1 className="text-3xl font-semibold text-blue-800 pb-2 px-3">
          Profile
        </h1>
        <p className="pb-3 px-3 text-gray-600">View your details here.</p>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <ProfileCard />
          <div className="col-span-2">
            <ProfileUnitCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
