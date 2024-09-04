import ArticlesSkeleton from "@/components/ArticlesSkeleton";
import Searchform from "@/components/SearchForm";

const loading = () => {
  console.log("loading");
  return (
    <section className="min-h-[calc(100vh_-_60px)] max-h-full">
      <Searchform />
      <ArticlesSkeleton />
    </section>
  );
};

export default loading;
