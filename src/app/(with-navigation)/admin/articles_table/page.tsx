import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { VerifyTokenPage } from "@/utils/verifyToken";
import { allArticles, countPages } from "@/apiCalls/ApiCalls";
import { Article } from "@prisma/client";
import ArticlesTable from "@/components/ArticlesTable";

interface IsearchParams {
  searchParams: {
    page: string;
  };
}

const page = async ({ searchParams }: IsearchParams) => {
  const { page } = searchParams;

  const token = cookies().get("access_token")?.value;
  if (!token) redirect("/");
  const user = VerifyTokenPage(token);
  if (user?.isAdmin === false) redirect("/");

  const Articles: Article[] | undefined = await allArticles(page);
  const count: number | undefined = await countPages();
  const NbrOfPages = Math.ceil(Number(count) / 6);

  return (
     <section className="">
       <ArticlesTable Articles={Articles} page={parseInt(page)} NbrOfPages={NbrOfPages} />
     </section>

  ) 
};

export default page;
