"use client";

import { Domain } from "@/utils/domain";
import { ArticleUserComment } from "@/utils/types/Types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface Iprops {
    article : ArticleUserComment
}

const ArticleEditForm = ({article} : Iprops) => {
   const [articleData , setArticleData] = useState({newTitle : article.title , newDescription : article.description}) 
   const navigate = useRouter();

  const handleSubmitEditArticle = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await axios.put(`${Domain}/api/articles/${article.id}` , {...articleData});
      console.log(data.status);
      if (data.status === 200) {
        toast.success(data.data.message);
        setArticleData({newTitle : "" , newDescription : ""})
        navigate.refresh();
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };


  return (
    <main className="max-w-[800px] m-auto py-8 px-4 bg-slate-100 rounded-xl shadow-inner">
      <form onSubmit={handleSubmitEditArticle} className="w-full flex flex-col gap-8">
        <div className="w-full h-12">
          <input value={articleData.newTitle} onChange={(e) =>setArticleData({...articleData , newTitle : e.target.value })} className="outline-none border-2 border-slate-200 focus:border-slate-600 transition duration-300 ease-in-out w-full h-full pl-4 rounded-xl" placeholder="Title" type="text" />
        </div>
        <div className="w-full h-64">
          <textarea value={articleData.newDescription} onChange={(e)=>setArticleData({...articleData , newDescription : e.target.value})} className="outline-none border-2 border-slate-200 focus:border-slate-600 transition duration-300 ease-in-out  w-full h-full resize-none rounded-xl p-4" placeholder="Description" name="" id="" />
        </div>
        <div className="w-full h-12 mt-8">
          <button type="submit" className="w-full h-full bg-slate-800 text-white rounded-full">Sumbit</button>
        </div>
      </form>
    </main>
  );
};

export default ArticleEditForm;
