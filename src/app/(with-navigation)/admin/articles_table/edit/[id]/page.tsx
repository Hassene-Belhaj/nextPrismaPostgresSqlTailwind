import { GetSingleArticle } from "@/apiCalls/ApiCalls";
import ArticleEditForm from "@/components/ArticleEditForm";
import { ArticleUserComment, Iparams } from "@/utils/types/Types";
import React from "react";

const page = async ({ params }: Iparams) => {
  const { id } = params;
  const Article = (await GetSingleArticle(id)) as ArticleUserComment;
  return (
    <section>
      <div>
        <h2 className="text-center pb-16 text-xl font-semibold tracking-widest">Edit Article</h2>
      </div>
      <ArticleEditForm article={Article} />
    </section>
  );
};

export default page;
