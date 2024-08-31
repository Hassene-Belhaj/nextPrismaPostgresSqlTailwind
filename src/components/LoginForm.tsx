"use client";

import AnimationWrapper from "@/utils/AnimationWrapper";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiKey, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import LoadingSpinner from "@/utils/loadingSpinner/LoadingSpinner";

const BASEURL = "http://localhost:3000";

const LoginForm = () => {
  const navigation = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("email is required");
    if (!password) return toast.error("password is required", { position: "bottom-right" });
    try {
      setLoading(true);
      const data = await axios.post(BASEURL + "/api/users/signin", { email, password });
      if (data.status === 200) {
        toast.success(data.data.message);
        navigation.push("/");
        navigation.refresh();
      }
    } catch (error: any) {
      toast.error(error?.response.data.message);
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <AnimationWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
      <div className="max-w-[500px] flex flex-col items-center mx-auto border-2 bg-gray-200 rounded-xl py-8 shadow-xl">
        <h2 className="py-8 text-2xl font-semibold">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="px-8 w-full flex flex-col gap-4">
          <label htmlFor="">Email</label>
          <div className="w-full h-10 relative flex justify-center items-center">
            <span className="absolute top-1/2 -translate-y-1/2 left-4 flex justify-center items-center">
              <TfiEmail color="gray" />
            </span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" className="w-full h-full outline-none border-2 border-gray-200 focus:border-gray-800 transition duration-300 ease-in-out rounded-md pl-10" />
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
          <div className="py-8">
            <button type="submit" disabled={loading} className="h-12 w-full rounded-full bg-gray-800 text-white hover:opacity-90 trasition-all duration-300 ease-in-out">
              {!loading ? "Submit" : <LoadingSpinner />}
            </button>
          </div>
          <div className="flex justify-center gap-4">
            <h3>Don't Have An Account Yet ? </h3>
            <Link href={"/signup"} className="underline underline-offset-8">
              Register
            </Link>
          </div>
        </form>
      </div>
    </AnimationWrapper>
  );
};

export default LoginForm;
