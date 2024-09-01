"use client";

import { Domain } from "@/utils/domain";
import axios from "axios";
import { useRouter } from "next/navigation";
import { title } from "process";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const ArticleAddForm = () => {
   const [articleData , setArticleData] = useState({title : "" , description : ""}) 
   const navigate = useRouter();

  const handleSubmitAddArticle = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await axios.post(`${Domain}/articles` , {articleData});
      console.log(data);
      if (data.status === 201) {
        toast.success(data.data.message);
        setArticleData({title : "" , description : ""})
        navigate.refresh();
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };


  return (
    <main className="max-w-[800px] m-auto pt-12 px-2">
      <form onSubmit={handleSubmitAddArticle} className="w-full flex flex-col gap-8">
        <div className="w-full h-12">
          <input value={articleData.title} onChange={(e) =>setArticleData({...articleData , title : e.target.value })} className="outline-none border-2 border-slate-200 focus:border-slate-600 transition duration-300 ease-in-out w-full h-full pl-4 rounded-xl" placeholder="Title" type="text" />
        </div>
        <div className="w-full h-64">
          <textarea value={articleData.description} onChange={(e)=>setArticleData({...articleData , description : e.target.value})} className="outline-none border-2 border-slate-200 focus:border-slate-600 transition duration-300 ease-in-out  w-full h-full resize-none rounded-xl p-4" placeholder="Description" name="" id="" />
        </div>
        <div className="w-full h-12 mt-8">
          <button type="submit" className="w-full h-full bg-slate-800 text-white rounded-full">Sumbit</button>
        </div>
      </form>
    </main>
  );
};

export default ArticleAddForm;
