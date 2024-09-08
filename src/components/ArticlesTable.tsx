"use client";

import { Article } from "@prisma/client";
import Link from "next/link";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Pagination from "./Pagination";
import AnimationWrapper from "@/utils/AnimationWrapper";
import axios from "axios";
import { Domain } from "@/utils/domain";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Iprops {
  Articles: Article[] | undefined;
  page: number;
  NbrOfPages: number;
}

const ArticlesTable = ({ Articles, page, NbrOfPages }: Iprops) => {
  const navigate = useRouter();

  const handleDeleteArticle = async (id: number) => {
    try {
      if (confirm("Are you sure to delete this article")) {
        const data = await axios.delete(`${Domain}/api/articles/${id}`);
        if (data.status === 200) {
          toast.success(data.data.message);
          navigate.refresh();
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <AnimationWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit="initial" key={page}>
      <section>
        <h2 className="pb-16 text-xl font-semibold text-center tracking-widest">Articles</h2>
        <div className="w-full shadow-md">
          <table className="table-auto w-full text-start border-2 border-slate-200 overflow-auto font-semibold">
            <thead className="bg-slate-100 tracking-widest border-2 border-slate-200">
              <tr className="divide-x-2 divide-solid )">
                <th className="p-4 text-center whitespace-nowrap">Title</th>
                <th className="p-4 text-center whitespace-nowrap">Created At</th>
                <th className="p-4 text-center whitespace-nowrap">Actions</th>
                <th className="p-4 text-center whitespace-nowrap">Read More</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-solid">
              {Articles &&
                Articles.map((article: Article, index: number) => {
                  return (
                    <tr key={index} className="hover:bg-slate-100 cursor-pointer text-center">
                      <td className="p-4 whitespace-nowrap">{article.title.length >= 20 ? article.title.slice(0, 20) + "..." : article.title}</td>
                      <td className="p-4 whitespace-nowrap">{new Date(article.createdAt).toDateString()}</td>
                      <th className="p-4 whitespace-nowrap text-center">
                        <div className="w-16 flex justify-between m-auto">
                          <button className="active:scale-95">
                            <Link href={`/admin/articles_table/edit/${article.id}`}>
                              <AiOutlineEdit size={20} />
                            </Link>
                          </button>
                          <button onClick={() => handleDeleteArticle(article.id)} type="submit" className="active:scale-95">
                            <AiOutlineDelete size={20} />
                          </button>
                        </div>
                      </th>
                      <td className="p-4">
                        <Link href={`/articles/${article.id}`} className="hover:underline underline-offset-8 font-normal text-blue-500">
                          Read More
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div>
          <Pagination page={page || 1} NbrOfPages={NbrOfPages} route="/admin/articles_table" />
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default ArticlesTable;
