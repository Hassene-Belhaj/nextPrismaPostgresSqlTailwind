"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import LogOutButton from "./LogOutButton";
import { useScroll, motion } from "framer-motion";
import { IuserJwtPayload } from "@/utils/types/Types";
import { AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";

interface IuserProps {
  user: IuserJwtPayload | null;
}

const Navbar = ({ user }: IuserProps) => {
  const pathname = usePathname();

  const [navScroll, setNavScroll] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const handler = () => {
      window.scrollY > 60 ? setNavScroll(true) : setNavScroll(false);
    };
    document.addEventListener("scroll", handler);
    return () => document.removeEventListener("scroll", handler);
  }, []);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth > 768) {
        setToggleMenu(false);
      }
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <nav className={`${navScroll ? "w-full fixed z-50 bg-slate-100 shadow-lg min-w-[300px]" : "w-full fixed z-50  bg-white min-w-[300px]"}`}>
      {/* <motion.div className="absolute top-[80px] w-full h-[2px] bg-indigo-950 origin-left" style={{scaleX : scrollYProgress}}></motion.div> */}

      <div className="hidden md:flex px-8 h-20 w-full justify-between items-center relative"> 
        <div className="xl:flex-none xl:w-1/3 lg:flex-none w-1/4">
          <Link href={"/"}>
            <h2 className="text-indigo-950 font-semibold text-xl">Cloud Hosting</h2>
          </Link>
        </div>

        <div className="flex-1 flex justify-between items-center gap-4">
          <ul className="flex gap-8 font-[500]">
            <Link href={"/"} className={pathname === "/" ? "text-indigo-700" : ""}>
              Home
            </Link>
            <Link href={"/articles"} className={pathname === "/articles" ? "text-indigo-700" : ""}>
              Articles
            </Link>
            <Link href={"/about"} className={pathname === "/about" ? "text-indigo-700" : ""}>
              About
            </Link>
            {user?.isAdmin && (
              <Link href={"/admin"} className={pathname === "/admin" ? "text-indigo-700" : ""}>
                Admin Dashboard
              </Link>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link href={"/signin"} className="w-20 h-8 px-12 bg-gray-800 rounded-3xl flex justify-center items-center text-white hover:opacity-80 transition duration-300 ease-in-out">
                Login
              </Link>
              <Link href={"/signup"} className="w-20 h-8 px-12 bg-white rounded-3xl flex justify-center items-center text-gray-800 border-2 border-gray-800  hover:opacity-80 transition duration-300 ease-in-out">
                Register
              </Link>
            </div>
          ) : (
            <div className="flex justify-start items-center gap-4">
              <h4 className="text-sm font-semibold lg:block md:hidden">{user.email}</h4>
              <LogOutButton />
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden h-20 w-full bg-white relative flex justify-end items-center pr-4">
        <button onClick={() => setToggleMenu(!toggleMenu)} className="absolute top-[50%] translate-y-[-50%] left-4 z-50">
          {toggleMenu ? <AiOutlineClose size={30} color="gray" /> : <FiMenu size={30} />}
        </button>
        {!user ? (
            <div className="flex items-center gap-4">
              <Link href={"/signin"} className="w-20 h-8 px-12 bg-gray-800 rounded-3xl flex justify-center items-center text-white hover:opacity-80 transition duration-300 ease-in-out">
                Login
              </Link>
              <Link href={"/signup"} className="w-20 h-8 px-12 bg-white rounded-3xl flex justify-center items-center text-gray-800 border-2 border-gray-800  hover:opacity-80 transition duration-300 ease-in-out">
                Register
              </Link>
            </div>
          ) : (
            <div className="flex justify-start items-center gap-4">
              <h4 className="text-sm font-semibold lg:block md:hidden">{user.email}</h4>
              <LogOutButton />
            </div>
          )}
      </div>
      

      <div className={toggleMenu ? "xs:flex md:hidden absolute flex-col justify-center items-center top-0 left-0 w-full h-screen bg-black/90 ease-in duration-300" : "absolute top-0 left-[-100%] w-full h-screen flex justify-center items-center bg-black/90 ease-out duration-300"}>
      
          <ul className="text-white text-2xl flex flex-col gap-8">
            <Link href={"/"}>
              <li onClick={() => setToggleMenu(!toggleMenu)} className="hover:underline underline-offset-8 cursor-pointer">
                Home
              </li>
            </Link>
            <Link href="/articles">
              <li onClick={() => setToggleMenu(!toggleMenu)} className="hover:underline underline-offset-8 cursor-pointer">
                Articles
              </li>
            </Link>
            <Link href="/about">
            <li onClick={() => setToggleMenu(!toggleMenu)} className="hover:underline underline-offset-8 cursor-pointer">
              About
            </li>
            </Link>


            <Link href="/admin">
              <li onClick={() => setToggleMenu(!toggleMenu)} className="hover:underline underline-offset-8 cursor-pointer">
                Dashboard
              </li>
            </Link>
          </ul>
        </div>
    </nav>
  );
};

export default Navbar;
