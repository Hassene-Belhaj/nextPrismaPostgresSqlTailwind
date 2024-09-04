import ArticleSinglePage from "@/components/ArticleSinglePage"
import { ArticleUserComment, Iparams, IuserJwtPayload } from "@/utils/types/Types"
import {cookies} from "next/headers"
import { VerifyTokenPage } from "@/utils/verifyToken"
import { GetSingleArticle } from "@/apiCalls/ApiCalls"






const page = async ({params} : Iparams) => {
  await new Promise((resolve) =>setTimeout(resolve , 1000))
  const {id} = params ;
   const token = cookies().get("access_token")?.value as string | "" ;
   const user = VerifyTokenPage(token) as IuserJwtPayload ; 

  const data = await GetSingleArticle(id) as ArticleUserComment
  return (
    <section className="w-full min-h-[calc(100vh_-_64px)] m-auto py-36 max-w-[800px] px-8">
        <ArticleSinglePage article={data} user={user} />
    </section>
  )
}

export default page