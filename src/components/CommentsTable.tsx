"use client";
import AnimationWrapper from "@/utils/AnimationWrapper";
import { Domain } from "@/utils/domain";
import { Comment } from "@prisma/client";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Iprops {
  comments: Comment[] | undefined;
}

const CommentsTable = ({ comments }: Iprops) => {
  const navigate = useRouter();

  const handleDeleteComment = async (id: number): Promise<void> => {
    try {
      if (confirm("Are you sure to delete this comment ?")) {
        const data = await axios.delete(`${Domain}/api/comments/${id}`);
        if (data.status === 200) {
          navigate.refresh();
          toast.error(data.data.message);
        }
      }
    } catch (error: any) {
      console.log(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <AnimationWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit="initial">
      <section className="max-w-full m-auto">
        <h2 className="pb-16 text-xl font-semibold text-center tracking-widest">Comments</h2>
        <div className="w-full rounded-lg shadow-md">
          <table className="table-auto w-full text-start border-2 border-slate-200 overflow-auto font-semibold">
            <thead className="bg-slate-100 tracking-widest">
              <tr className="divide-x-2 divide-solid border-2 border-slate-200">
                <th className="p-4 whitespace-nowrap text-center">Text</th>
                <th className="p-4 whitespace-nowrap text-center">Created At</th>
                <th className="p-4 whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-solid">
              {comments &&
                comments.map((c: Comment, index: number) => {
                  return (
                    <tr key={index} className="hover:bg-slate-100 cursor-pointer text-center">
                      <td className="p-4 whitespace-nowrap">{c.text.length >= 20 ? c.text.slice(0, 20) + "..." : c.text}</td>
                      <td className="p-4 whitespace-nowrap">{new Date(c.createdAt).toDateString()}</td>
                      <td className="p-4 whitespace-nowrap text-center">
                        <div className="w-16 flex justify-center m-auto">
                          <button onClick={() => handleDeleteComment(c.id)} type="submit" className="active:scale-95">
                            <AiOutlineDelete size={20} />
                          </button>
                        </div>
                      </td>
                      {/* <td className="p-4">
                      <Link href={`/articles/${article.id}`} className="hover:underline underline-offset-8 text-blue-500">
                      Read More
                      </Link>
                      </td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div>{/* <Pagination page={page || 1} NbrOfPages={NbrOfPages} route="/admin/articles_table" /> */}</div>
      </section>
    </AnimationWrapper>
  );
};

export default CommentsTable;
