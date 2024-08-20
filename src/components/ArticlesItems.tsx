"use client";

import { Article } from "@prisma/client";
import Link from "next/link";

interface IarticleItem {
    article : Article
}

const ArticlesItems = ({ article }: IarticleItem) => {
  return (
    <div className="p-4 bg-slate-100 flex flex-col gap-4 rounded-lg shadow-md">
      <div>
        <h3 className="line-clamp-1 text-lg font-semibold pb-4">{article.title}</h3>
         <p className="line-clamp-1">{article.description}</p>
         <div className="pt-8 flex justify-end">
            <div className="xs:w-full sm:w-1/2">
            <Link href={'/'}>
             <button className="w-full h-10 bg-gray-800 text-white rounded-full">Read More</button>
            </Link>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ArticlesItems;

