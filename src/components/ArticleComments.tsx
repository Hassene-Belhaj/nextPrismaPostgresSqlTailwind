"use client";

import { Domain } from "@/utils/domain";
import { CommentWithUser, IuserJwtPayload } from "@/utils/types/Types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import moment from 'moment'
import CommentEditModal from "./CommentEditModal";

interface IcommentProps {
  comment: CommentWithUser;
  user: IuserJwtPayload;
}

const ArticleComments = ({ comment, user }: IcommentProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [newText , setNewText] = useState(comment.text);
  const [loading , setLoading] = useState(false)
  const navigate = useRouter();





  const handleDeleteComment = async () => {
    try {

      if (comment.userId !== user.id) return toast.error("this comment is not posted by you");
      if(confirm("Are you sure to delete this comment ?")) {
        const data = await axios.delete(`${Domain}/api/comments/${comment.id}`);
        if (data.status === 200) {
          // toast.success(data.data.message)
          navigate.refresh();
        }
      }
      } catch (error: any) {
        toast.error(error?.response?.data.message);
        console.log(error);
      }
  };

const handleEditComment = async (e : React.FormEvent) => {
    e.preventDefault() ;
    try {
      setLoading(true)
      const data = await axios.put(`${Domain}/api/comments/${comment.id}` , {
        newText
      })
      if(data.status === 200) {
        navigate.refresh();
        setOpenEdit(!openEdit)
      }
    } catch (error : any) {
      toast.error(error?.response?.data.message) ;
      console.log(error)
    } finally {
      setLoading(false)
    }
}

  return (
    <div className="flex flex-col gap-4 p-4 w-full bg-slate-100 rounded-md">
        <CommentEditModal loading={loading} comment={comment} openEdit={openEdit} setOpenEdit={setOpenEdit} handleEditComment={handleEditComment} newText={newText} setNewText={setNewText} />
          <div className="flex justify-between items-center font-semibold">
            <h4>{comment.user.username}</h4>
            <h5 className="text-xs">{moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h5>
          </div>
          {comment?.userId === user?.id && (
            <div className="w-full flex justify-end gap-4">
            <button className="active:scale-105 outline-none">
              <AiOutlineEdit onClick={() => setOpenEdit(!openEdit)} size={20} className="text-emerald-500" />
            </button>
            <button onClick={handleDeleteComment} type="submit" className="active:scale-105 outline-none">
              <AiOutlineDelete size={20} className="text-rose-500" />
            </button>
          </div>
          )}
          <p>{comment.text}</p>
    </div>
  );
};

export default ArticleComments;
