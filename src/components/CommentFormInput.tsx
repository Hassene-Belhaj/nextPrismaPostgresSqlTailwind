"use client"

import toast from "react-hot-toast";
import { useState } from "react";
import {useRouter} from 'next/navigation';
import axios from 'axios'

interface IarticleIdProps {
  articleId : number
}



const CommentFormInput = ({articleId} : IarticleIdProps) => {
  console.log(articleId)
  const [textComment , setTextComment] =  useState('');
  const navigation = useRouter() ;
 
  const handleSubmit = async (e : React.FormEvent) =>  {
    e.preventDefault()
    try {
    if(textComment === "") return toast.error("please fill the required field")  
    const data = await axios.post("http://localhost:3000/api/comments" , {text : textComment , articleId : articleId})  
    
    if(data.status === 201) {
      // toast.success(data.data.message)
      navigation.refresh()
      setTextComment("")
    }
    console.log(data)
    } catch (error : any) {
      toast.error(error?.response?.data.message)
      console.log(error)
    }
  }


  return (
      <form onSubmit={handleSubmit} className="w-full">
          <input value={textComment} onChange={(e)=>setTextComment(e.target.value)} className="w-full h-12 pl-4 rounded-lg outline-none border-2 border-slate-200 focus:border-slate-600 transition duration-300 ease-in-out" type="text" placeholder="Add Comment" />
        <div className="my-8 w-full h-12 flex justify-end ">
          <button className="w-full h-full bg-slate-800 text-white rounded-full hover:opacity-90 transition duration-300 ease-in-out">Submit</button>
        </div>
      </form>
  );
};

export default CommentFormInput;
