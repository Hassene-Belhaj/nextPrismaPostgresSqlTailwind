import Registerform from "@/components/RegisterForm"
import {redirect} from 'next/navigation'
import {cookies} from 'next/headers'


const Register = () => {
  const token = cookies().get("access_token")?.value ;
  if(token) redirect("/") ;
  return (
    <div className="min-h-screen max-h-full pt-32 mx-4">
      <Registerform />
    </div>

  )     
}

export default Register;