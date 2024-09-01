"use client";

import BtnLoader1 from "@/utils/loadingSpinner/LoadingSpinner";
import { CommentWithUser } from "@/utils/types/Types";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Iprops {
  loading : boolean 
  comment: CommentWithUser;
  openEdit: boolean;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  newText: string;
  setNewText: Dispatch<SetStateAction<string>>;
  handleEditComment: (e: React.FormEvent) => Promise<void>;
}

const CommentEditModal = ({ loading , comment, openEdit, setOpenEdit, handleEditComment, newText, setNewText }: Iprops) => {
  const Ref = useRef<HTMLDivElement>(null);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpenEdit(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <AnimatePresence>
      {openEdit && (
        <div className="fixed w-full h-screen inset-0 bg-black/80 z-50 flex justify-center items-center ">
          <motion.div initial={{ opacity: 1, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} exit={{ opacity: 1, y: 25 , transition: { duration: 0.2 } }} className="w-1/2 pt-4 pb-8 px-6 bg-gray-200 rounded-lg relative">
            <div className="flex justify-between items-center">
              <h5 className="font-semibold">{comment.user.username}</h5>
              <button onClick={() => setOpenEdit(!openEdit)} type="button">
                <AiOutlineClose />
              </button>
            </div>
            <form onSubmit={handleEditComment} className="pt-4 flex flex-col gap-4">
              <textarea value={newText} onChange={(e) => setNewText(e.target.value)} className="w-full h-64 px-4 py-2 resize-none outline-none border-2 rounded-lg border-slate-200 focus:border-slate-800 duration-300 ease-in-out"></textarea>
              <div className="pt-6">
                <button type="submit" className="w-full h-12 bg-slate-800 text-white rounded-full">
                    {!loading ? "Edit" : <BtnLoader1/>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommentEditModal;
