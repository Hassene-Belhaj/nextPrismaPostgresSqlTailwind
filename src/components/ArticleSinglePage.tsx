"use client";

import React from "react";
import ArticleComments from "./ArticleComments";
import CommentFormInput from "./CommentFormInput";
import { FaComment } from "react-icons/fa";
import { ArticleUserComment, IuserJwtPayload } from "@/utils/types/Types";

interface IsingleArticle {
  article: ArticleUserComment;
  user : IuserJwtPayload
}

const ArticleSinglePage = ({ article , user}: IsingleArticle) => {

  return (
    <div className="flex flex-col gap-8">
      <h1 className="w-full  text-3xl capitalize text-start">{article?.title}</h1>
      <p className="py-8">{article.description}</p>
      <section>

        <div className="flex justify-start items-center gap-2">
          <FaComment />
          <h3 className="py-4 text-xl font-semibold">Comments</h3>
        </div>
          {!article.comments.length && (
            <div><p className="text-sm py-4">no comments</p></div>
          )}
        <div>
          {user && (
            <CommentFormInput articleId={article.id} />
          )}
        </div>
      </section>
      <section className="flex flex-col gap-8">
      {article.comments.map((comment : any , index : number) => {
        return (
          <ArticleComments key={index} comment={comment} user={user} />
        )
       })}
      </section>
    </div>
  );
};

export default ArticleSinglePage;
