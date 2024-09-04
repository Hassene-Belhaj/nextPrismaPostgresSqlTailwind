import { Domain } from "@/utils/domain";
import { Article } from "@prisma/client";
import { ArticleUserComment } from "@/utils/types/Types";



export const GetSingleArticle = async (id : string) : Promise< ArticleUserComment | undefined>  => {
  try {
    const response = await fetch(`${Domain}/api/articles/${id}` , {cache : "no-store"})
    const data = await response.json()
    if(response.ok) {
      return data ;
    }
  } catch (error) {
    console.log(error)
  }
}

export async function allArticles(page: string): Promise<Article[] | undefined> {
  try {
    const response = await fetch(`${Domain}/api/articles?page=${page || 1}` , {cache : "no-store"});
    if (!response.ok) {
      throw new Error("failed to fetch Articles");
    }
    const data: Article[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function countPages(): Promise<number | undefined> {
  try {
    const response = await fetch(`${Domain}/api/articles/count`);
    if (!response.ok) throw new Error("failed to get count of pages");
    const count = await response.json();
    return count.count;
  } catch (error) {
    console.log(error);
  }
}
