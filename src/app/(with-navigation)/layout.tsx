import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Ijwtpayload, IuserJwtPayload } from "@/utils/types/Types"
import { VerifyTokenPage } from "@/utils/verifyToken"
import { cookies } from "next/headers"



interface Ichildren  {
    children : React.ReactNode
}

const layout = ({children} : Ichildren) => {
  const token = cookies().get('access_token')?.value as string | ""
  const user = VerifyTokenPage(token) as IuserJwtPayload | null;

  return (
        <main>
            <Navbar user={user}/>
            {children}
            {/* <Footer /> */}
        </main>
  )
}

export default layout