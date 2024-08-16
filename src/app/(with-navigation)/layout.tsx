import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"



interface Ichildren  {
    children : React.ReactNode
}

const layout = ({children} : Ichildren) => {
  return (
    <div>
        <main>
            <Navbar/>
            {children}
            <Footer />
        </main>
    </div>
  )
}

export default layout