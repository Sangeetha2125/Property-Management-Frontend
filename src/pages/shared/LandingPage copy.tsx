import { Button } from "../../components/ui/button";
import image from "../../assets/image.png";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { CircleCheckBig } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import logo from "../../assets/logo.png";
import image2 from "../../assets/image2.png";

import image3 from "../../assets/image3.jpg";

export const Hero = () => {
  return (
    <div className="flex min-h-screen w-full flex-col poppins-light">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <img width={90} height={50} src={logo} alt="logo" />
          <div className="ml-auto flex items-center gap-4 w-1/5">
            <Link to="/signup" className="w-full">
              <Button className="w-full">Sign up</Button>
            </Link>
            <Link to="/login" className=" w-full">
              <Button
                className="w-full  text-blue-500 border-blue-500  hover:text-white hover:bg-blue-500"
                variant="outline"
              >
                Login
              </Button>
            </Link>
          </div>
        </header>
        <Separator />
      </div>

      <div className="p-4 ">
        <div className="h-screen rounded-3xl w-11/12 flex items-center justify-center Home">
          {/* <p className="text-4xl text-center m-4 font-semibold text-white">Trusted Place To Find A Home For Your Family</p> */}
          <div className="w-1/2 p-4 bg-white rounded-lg bg-opacity-70">
            <p className="text-4xl text-center m-4 font-semibold leading-10">
            Trusted Place To Find A Home For Your Family  
            </p>
          </div>
        </div>
        <div className="h-screen">
          <div className="rounded-3xl p-5 flex justify-center">
            <Card className="w-3/4 p-4 pb-0 bg-opacity-10 mb-10">
              <CardContent className="grid grid-cols-2 gap-6 ">
                <CardDescription className="text-black text-xl p-3 pt-6 text-justify flex items-center justify-center ">
                  <p>
                    Discover a wide range of verified rental properties tailored
                    to your needs. Whether you are looking for a cozy apartment
                    or a spacious house, our extensive database ensures you find
                    the perfect home. Navigate our platform with ease. Our
                    intuitive design makes it simple to search, compare, and
                    apply for properties, saving you time and effort.
                  </p>
                </CardDescription>
                <CardDescription className="text-black text-xl p-6 flex items-center justify-center rounded-md">
                  <img src={image2} className="rounded-lg size-fit" />
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="rounded-3xl p-5 flex justify-center">
            <Card className="w-3/4 p-4 bg-opacity-10 mb-10">
              <CardContent className="grid grid-cols-2 gap-4 ">
                <CardDescription className="text-black text-xl p-3 text-justify flex items-center justify-center ">
                  <img src={image3} className="rounded-lg size-fit" />
                </CardDescription>
                <CardDescription className="text-black text-xl p-3 pt-6 text-justify flex items-center justify-center ">
                  <ul>
                    <li className="flex items-center space-x-4">
                      <CircleCheckBig color="#25b658" />{" "}
                      <span className="pb-1"> Smart Search Filters</span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <CircleCheckBig color="#25b658" />{" "}
                      <span className="pb-1"> Role Based Authentication</span>
                    </li>
                    <li className="flex items-center space-x-4 ">
                      <CircleCheckBig color="#25b658" />{" "}
                      <span className="pb-1"> Effortless renting</span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <CircleCheckBig color="#25b658" />{" "}
                      <span className="pb-1"> Seamless Living</span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <CircleCheckBig color="#25b658" />{" "}
                      <span className="pb-1"> Rental History tracking</span>
                    </li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
