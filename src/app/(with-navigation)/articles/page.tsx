import { allArticles, countPages } from "@/apiCalls/ApiCalls";
import ArticlesItems from "@/components/ArticlesItems";
import Pagination from "@/components/Pagination";
import SearchForm from "@/components/SearchForm";
import AnimationWrapper from "@/utils/AnimationWrapper";
import { Article } from "@prisma/client";

interface IsearchParams {
  searchParams: {
    page: string;
  };
}




const Articles = async ({ searchParams }: IsearchParams) => {
  //*
  // await new Promise((resolve) => setTimeout(resolve ,300));

  const { page } = searchParams;
  const data: Article[] | undefined = await allArticles(page);
  const count = await countPages();
  const NbrOfPages = Math.ceil(Number(count) / 6); //* 6 per page

  return (
    <section className="min-h-[calc(100vh_-_64px)] max-h-full">
      <SearchForm />
      <div>
        <AnimationWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 , ease: "easeInOut" }} exit={{ opacity: 0 }} key={page}>
          <section className="mt-4 p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {data &&
              data.map((article: Article, i: number) => {
                return <ArticlesItems key={i} article={article} />;
              })}
          </section>
        </AnimationWrapper>
        <Pagination page={parseInt(page) || 1} NbrOfPages={NbrOfPages} route="/articles" />
      </div>
    </section>
  );
};

export default Articles;
