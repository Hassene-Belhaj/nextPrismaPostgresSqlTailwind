import ArticlesItems from "@/components/ArticlesItems";
import Pagination from "@/components/Pagination";
import SearchaBar from "@/components/SearchaBar";
import AnimationWrapper from "@/utils/AnimationWrapper";
import { Article } from "@prisma/client";



interface IsearchParams {
  searchParams : {
    page : string
  }
}

async function countPages():Promise<number | undefined> {
  try {
    const response = await fetch('http://localhost:3000/api/articles/count')
    if(!response.ok) throw new Error("failed to get count of pages")
    const count = await response.json() ;
    return count.count
    
  } catch (error) {
    console.log(error)
  }
}


async function allArticles(page : string) : Promise<Article[] | undefined>{
  try {
    const response = await fetch(`http://localhost:3000/api/articles?page=${page || 1}`);
    if(!response.ok) {
      throw new Error('failed to fetch Articles')
    }
    const data: Article[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const Articles = async ({searchParams} : IsearchParams) => {
  const {page} = searchParams ; 
  const data: Article[] | undefined = await allArticles(page);
  const count = await countPages()
  const NbrOfPages = Math.ceil(Number(count) / 6)  //* 6 per page
  console.log(page)

  return (
     <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.3}} exit={{opacity : 0}}>
      <SearchaBar />
    <div className="min-h-[calc(100vh_-_160px)]">
      <section className="mt-8 p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-8">
      {data && data.map((article: Article, i: number) => {
        return <ArticlesItems key={i} article={article} />;
      })}
      </section>
      <Pagination page={parseInt(page)} NbrOfPages={NbrOfPages} route='/articles' />
    </div>
      </AnimationWrapper>
  );
};

export default Articles;
