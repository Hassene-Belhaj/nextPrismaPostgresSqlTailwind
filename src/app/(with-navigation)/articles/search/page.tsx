import { Article } from "@prisma/client";
import ArticlesItems from "@/components/ArticlesItems";
import AnimationWrapper from "@/utils/AnimationWrapper";
import SearchForm from "@/components/SearchForm";

interface IsearchParams {
  searchParams: { searchText: string };
}

const GetArticlesBySearch = async (searchText: string): Promise<Article[] | undefined> => {
  try {
    const response = await fetch(`http://localhost:3000/api/articles/search?searchText=${searchText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const SearchArticePage = async ({ searchParams: { searchText } }: IsearchParams) => {
  const data = await GetArticlesBySearch(searchText);

  return (
    <AnimationWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
      <SearchForm />
      <div className="min-h-[calc(100vh_-_160px)] max-h-full">
        {!data?.length && (
          <div className="p-16">
            <h3 className="w-full text-center">Sorry , No Result For This Search</h3>
          </div>
        )}
        <section className="mt-8 p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {data &&
            data.map((article: Article, i: number) => {
              return <ArticlesItems key={i} article={article} />;
            })}
        </section>
      </div>
    </AnimationWrapper>
  );
};

export default SearchArticePage;
