import ArticlesSkeleton from "@/components/ArticlesSkeleton";
import Searchform from "@/components/SearchForm";

const loading = () => {
  console.log("loading");
  return (
    <>
      <Searchform />
      <ArticlesSkeleton />
    </>
  );
};

export default loading;
