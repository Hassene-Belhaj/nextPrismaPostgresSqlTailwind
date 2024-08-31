"use client";

import AnimationWrapper from "@/utils/AnimationWrapper";
import { Article } from "@prisma/client";
import Link from "next/link";

interface IarticleItem {
  article: Article;
}

const ArticlesItems = ({ article }: IarticleItem) => {
  return (

      <div className="h-[220px] p-4 bg-slate-100 flex flex-col gap-2 rounded-lg shadow-md">
        <div className="h-16 text-md font-semibold">
          <h3>{article.title.length >= 60 ? article.title.slice(0, 60) + "..." : article.title}</h3>
        </div>
        <div className="h-18 text-sm">
          <p>{article.description.length >= 120 ? article.description.slice(0, 120) + "..." : article.description}</p>
        </div>
        <div className="h-24 flex justify-end items-end">
          <div className="xs:w-full sm:w-1/2">
            <Link href={`/articles/${article.id}`}>
              <button className="w-full h-10 bg-gray-800 text-white rounded-full">Read More</button>
            </Link>
          </div>
        </div>
      </div>
      
  );
};

export default ArticlesItems;
