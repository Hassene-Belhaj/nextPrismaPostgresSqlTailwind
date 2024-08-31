"use client" ;
import axios from 'axios'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const LogOutButton = () => {
   const navigation  = useRouter()

   const LogOutcallapi = async() : Promise<void>=> {
   try {
     const {data} = await axios.get('http://localhost:3000/api/users/logout')
      toast.success(data.message)
      navigation.push('/')
      navigation.refresh()
   } catch (error) {
     console.log(error)
   }
   }

  return (
     <button type='submit' onClick={LogOutcallapi} className="w-20 h-8 px-12 bg-gray-800 rounded-3xl flex justify-center items-center text-white hover:opacity-90 transition duration-300 ease-in-out">
       LogOut
     </button>
  )
}

export default LogOutButton