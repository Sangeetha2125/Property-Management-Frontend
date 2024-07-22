import { Button } from "../components/ui/button"
import image from '../assets/image.png'
import { Link } from 'react-router-dom'

export const Hero = () => {
    return (
        <div className="grid grid-cols-2 gap-4 ">
            <div className="text-center px-10">
                <div className="mb-0">
                    <h1 className=" ml-12 py-40 pb-5 font-extrabold tracking-loose leading-20
                    text-8xl lg:text-6xl text-zinc-600 w-128 text-left"> Trusted Place To Find A Home For Your Family</h1>
                    <p className="ml-12 pb-10 t-5 font bold tracking-loose text-5s text-left">Discover Your Ideal Home with Our Property Management Services.Whether you’re a tenant searching for the perfect rental or a homeowner seeking reliable management services, we’ve got you covered.</p>
                    <div className=" grid grid-cols-2 gap-4">
                        <Link to="/signup" className="ml-12 w-full">
                            <Button className="w-full">
                                Sign up
                            </Button>
                        </Link>
                        <Link to="/login" className="ml-12 w-full">
                            <Button className="w-full">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="p-8">
                <img className="backdrop-opacity-50 backdrop-invert bg-white/10 ...bg-fill height-100% rounded-lg" src={image} />
            </div>
        </div>
    )
}