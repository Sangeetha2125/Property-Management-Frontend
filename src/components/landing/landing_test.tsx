import { Link } from 'react-router-dom'
import { Button } from "../ui/button";

import image from '../../assets/home.jpg'

export default function Hero() {
    return (
        <div >

        <div className="container max-w-screen-xl mx-auto flex justify-center items-center min-h-screen">
            {/* Container for the hero section into 12 columns */}
            <div className="grid md:grid-cols-12">
                {/* Hero content */}
                <div className="col-span-8 place-self-center">
                    <h1 className=" text-5xl text-textColorPrimary font-black whitespace-pre-line leading-tight">
                        Trusted Place To Find A Home For Your Family
                    </h1>
                    <div className=" grid grid-cols-4 gap-12">
                    <div className="flex justify-center ">
                        <Button className="ml-12 col-start-1 col-end-2">
                            <Link to={"/signup"}>Sign up</Link>
                        </Button>
                    </div>
                    <div className="flex justify-center">
                    <Button className="ml-12 col-start-2 col-end-3">
                        <Link to={"/login"}>Login</Link>
                    </Button>
                    </div>
                    </div>
                    </div>
                </div>
                {/* Hero image */}
                <div className="col-span-4 place-self-center">
                    <img src={image} alt="Coffee Cup" />
                </div>



            </div>
        </div>

    );
}
