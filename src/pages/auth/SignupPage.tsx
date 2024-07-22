import SignupForm from '../../components/auth/SignupForm'
import { Card,CardContent,
  CardDescription,
  CardHeader,
  CardTitle, } from '../../components/ui/card'
import { Link } from 'react-router-dom'


export default function SignupPage() {
  return (
    <div className=" flex justify-center items-center h-screen">
      <Card className="w-[500px]">
      <CardHeader className="text-center">
        <CardTitle>Create Account.</CardTitle>
        <CardDescription>Trusted place to find a home for your family.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm/>
        <div className="text-center">
        <Link to={"/login"} className="inline-flex items-center justify-center p-5 text-base font-medium underline text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">Already have an account?</Link>
        </div>
      </CardContent>
    </Card>
    </div>
    
  )
}
