"use client"

import Link from "next/link";
import { FiMenu } from "react-icons/fi";


const Navbar = () => {
  return (
    <nav>
      <div className="hidden md:flex h-20 w-full px-8 bg-gray-100 shadow-sm  justify-between items-center">

      <div className="flex-1">
        <Link href={"/"}>
          <h2 className="text-gray-800 text-bold text-xl">Cloud Hosting</h2>
        </Link>
      </div>

      <div className="flex-1 flex  justify-between items-center gap-8">
        <ul className="flex gap-8">
          <Link href={"/"} className="">Home</Link>
          <Link href={"/articles"} className="">Articles</Link>
          <Link href={"/about"} className="" >About</Link>
          {/* <Link href={"/"}>Admin Dashboard</Link> */}
        </ul>
        <div className="flex items-center gap-4">
          <Link href={"/signin"} className="w-20 h-8 px-12 bg-gray-800 rounded-3xl flex justify-center items-center text-white hover:opacity-80 transition duration-300 ease-in-out">
            Login
          </Link>
          <Link href={"/signup"} className="w-20 h-8 px-12 bg-white rounded-3xl flex justify-center items-center text-gray-800 border-2 border-gray-800  hover:opacity-80 transition duration-300 ease-in-out">
            Register
          </Link>
        </div>
      </div>
      </div>

      <div className="md:hidden h-20 w-full bg-gray-100 relative">
          <button className="absolute top-[50%] translate-y-[-50%] left-4"><FiMenu size={20}/></button>
      </div>
    </nav>

  );
};

export default Navbar;
