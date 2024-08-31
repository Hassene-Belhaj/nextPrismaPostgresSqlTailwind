"use client" ;

import { Domain } from "@/utils/domain";
import { CommentWithUser, IuserJwtPayload } from "@/utils/types/Types";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";



interface IcommentProps {
  comment : CommentWithUser
  user : IuserJwtPayload
}



const ArticleComments = ({comment , user} : IcommentProps) => {
    const navigate = useRouter() ;
 
   const handleDeleteComment = async () => {
    try {
      if(comment.userId !== user.id) return toast.error("this comment is not posted by you")
      const data = await axios.delete(`${Domain}/comments/${comment.id}`)
      if(data.status === 200) {
        // toast.success(data.data.message)
        navigate.refresh()
      }
    } catch (error : any) {
      toast.error(error?.response?.data.message)
      console.log(error)
    }
   } 

  

  return (
    <div className="flex flex-col gap-4 p-4 w-full bg-slate-100 rounded-md">
      <div className="flex justify-between items-center font-semibold">
        <h4>{comment.user.username}</h4>
        <h5 className="text-xs">{new Date(comment.createdAt).toDateString()}</h5>
      </div>
      <div className="w-full flex justify-end gap-4">
        <button className="active:scale-105">
          <AiOutlineEdit size={20} className="text-emerald-500" />
        </button>
        <button onClick={handleDeleteComment} type="submit" className="active:scale-105">
          <AiOutlineDelete size={20} className="text-rose-500" />
        </button>
      </div>
      <p>
        {comment.text}
      </p>
    </div>
  );
};

export default ArticleComments;
