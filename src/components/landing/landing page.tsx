import * as React from "react"
import { Button } from "../ui/button"
import image from '../../assets/image.png'
import { Link } from 'react-router-dom'

export const Hero= () =>{
    return(
        <div className="grid grid-cols-2 gap-4 ">
            <div className="text-center px-8 ">
                <div className="mb-0">
                    <h1 className=" ml-12 px-30 py-40 pb-20 font-extrabold tracking-loose leading-14
                    text-7xl lg:text-6xl text-zinc-600 w-96 text-left"> Trusted Place To Find A Home For Your Family</h1>
                    <div className=" grid grid-cols-2">
                    <Button className="ml-12 col-start-1 col-end-2">
                        <Link to={"/signup"}>Sign up</Link>
                    </Button>   
                    <Button className="ml-12 col-start-2 col-end-3">
                        <Link to={"/login"}>Login</Link>
                    </Button>
                    
                    </div> 
                </div>
            </div>

            <div className="p-8">
                <img className="backdrop-opacity-50 backdrop-invert bg-white/30 ...bg-fill height-100% "src={image}/>
            </div>
        </div> 
    )
}