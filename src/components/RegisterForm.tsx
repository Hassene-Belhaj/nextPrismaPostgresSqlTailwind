"use client";

import AnimationWrapper from "@/utils/AnimationWrapper";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiKey, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import LoadingSpinner from '@/utils/loadingSpinner/LoadingSpinner'
import axios from "axios";

const Registerform = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useRouter()

  const handleSubmit = async (e: React.FormEvent): Promise<any> => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password !== confirmPassword) return toast.error("password and confirm password do not match");
      const data = await axios.post("http://localhost:3000/api/users/signup", {
        email,
        username,
        password,
      });
      if (data.status === 201) {
        toast.success(data.data.message);
        navigation.push("/signin");
      }
      console.log(data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <AnimationWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
      <div className="max-w-[500px] flex flex-col items-center mx-auto border-2 bg-gray-200 rounded-xl py-8 shadow-xl">
        <h2 className="py-8 text-2xl">Register</h2>
        <form onSubmit={handleSubmit} className="px-8 w-full flex flex-col gap-4">
          <label htmlFor="">Email</label>
          <div className="w-full h-10 relative flex justify-center items-center">
            <span className="absolute top-1/2 -translate-y-1/2 left-4 flex justify-center items-center">
              <TfiEmail color="gray" />
            </span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" className="w-full h-full outline-none border-2 border-gray-200 focus:border-gray-600 transition duration-300 ease-in-out rounded-md pl-10" />
          </div>
          <label htmlFor="">Username</label>
          <div className="w-full h-10 relative flex justify-center items-center">
            <span className="absolute top-1/2 -translate-y-1/2 left-4 flex justify-center items-center">
              <FiUser color="gray" />
            </span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="w-full h-full outline-none border-2 border-gray-200 focus:border-gray-600 transition duration-300 ease-in-out rounded-md pl-10" />
          </div>
          <label htmlFor="">Password</label>
          <div className="w-full h-10 relative flex justify-center items-center">
            <span className="absolute top-1/2 -translate-y-1/2 left-4 flex justify-center items-center">
              <FiKey color="gray" />
            </span>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPwd ? "text" : "password"} placeholder="password" className="w-full h-full outline-none border-2 border-gray-200 focus:border-gray-800 transition duration-300 ease-in-out rounded-md pl-10" />
            <span className={`${password.length > 1 ? "absolute top-1/2 -translate-y-1/2 right-4 flex justify-center items-center" : "hidden"}`}>
              {showPwd ? <FiEyeOff className="cursor-pointer" color="gray" onClick={() => setShowPwd(!showPwd)} /> : <FiEye className="cursor-pointer" color="gray" onClick={() => setShowPwd(!showPwd)} />}
            </span>
          </div>
          <label htmlFor="">Confirm Password</label>
          <div className="w-full h-10 relative flex justify-center items-center">
            <span className="absolute top-1/2 -translate-y-1/2 left-4 flex justify-center items-center">
              <FiKey color="gray" />
            </span>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showPwd2 ? "text" : "password"}
              placeholder="confirm password"
              className="w-full h-full outline-none border-2 border-gray-200 focus:border-gray-800 transition duration-300 ease-in-out rounded-md pl-10"
            />
            <span className={`${confirmPassword.length > 1 ? "absolute top-1/2 -translate-y-1/2 right-4 flex justify-center items-center" : "hidden"}`}>
              {showPwd2 ? <FiEyeOff className="cursor-pointer" color="gray" onClick={() => setShowPwd2(!showPwd2)} /> : <FiEye className="cursor-pointer" color="gray" onClick={() => setShowPwd2(!showPwd2)} />}
            </span>
          </div>
          <div className="py-8">
            <button type="submit" className="h-12 w-full rounded-full bg-gray-800 text-white hover:opacity-90 trasition-all duration-300 ease-in-out">
            {loading ? <LoadingSpinner /> : "Submit"}

            </button>
          </div>
          <div className="flex justify-center gap-4">
            <h3>Already A Member? </h3>
            <Link href={"/signin"} className="underline underline-offset-8">
              login
            </Link>
          </div>
        </form>
      </div>
    </AnimationWrapper>
  );
};

export default Registerform;
