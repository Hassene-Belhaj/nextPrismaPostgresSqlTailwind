"use client" ;

import AnimationWrapper from "@/utils/AnimationWrapper"
import Link from "next/link"

const LoginForm = () => {
  return (
    <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : .3}} exit={{opacity: 0}}>
     <div className="max-w-[500px] flex flex-col items-center mx-auto border-2 bg-gray-200 rounded-xl py-8 shadow-xl">
        <h2 className="py-8 text-2xl">Welcome Back</h2>
        <form className="px-8 w-full flex flex-col gap-4">
        <label htmlFor="">Email</label>
        <input type="text"  placeholder="exemple@exemple.com"  className="h-10 outline-none border-2 border-gray-200 focus:border-gray-800 transition duration-300 ease-in-out rounded-md pl-4"/>
        <label htmlFor="">Password</label>
        <input type="password" placeholder="*********"  className="h-10 outline-none border-2 border-gray-200 focus:border-gray-800 transition duration-300 ease-in-out rounded-md pl-4"/>
        <div className="py-8">
          <button className="h-12 w-full rounded-full bg-gray-800 text-white hover:opacity-90 trasition-all duration-300 ease-in-out">Submit</button>
        </div>
        <div className="flex justify-center gap-4">
          <h3>Don't Have An Account Yet ? </h3>
           <Link href={'/signup'} className="underline underline-offset-8">Register</Link>
        </div>
      </form>
    </div>
  </AnimationWrapper>
  )
}

export default LoginForm