import ArticleSinglePage from "@/components/ArticleSinglePage"
import { ArticleUserComment, Iparams, IuserJwtPayload } from "@/utils/types/Types"
import {cookies} from "next/headers"
import { VerifyTokenPage } from "@/utils/verifyToken"
import { resolve } from "path"


const GetSingleArticle = async (id : string) : Promise<ArticleUserComment | undefined>  => {
  try {
    const response = await fetch(`http://localhost:3000/api/articles/${id}` , {cache : "no-store"})
    const data = await response.json()
    if(response.ok) {
      return data ;
    }
  } catch (error) {
    console.log(error)
  }
}




const page = async ({params} : Iparams) => {
  await new Promise((resolve) =>setTimeout(resolve , 1000))
  const {id} = params ;
   const token = cookies().get("access_token")?.value as string | "" ;
   const user = VerifyTokenPage(token) as IuserJwtPayload ; 

  const data  = await GetSingleArticle(id) as ArticleUserComment
  return (
    <section className="w-full m-auto py-36 max-w-[800px] px-8">
        <ArticleSinglePage article={data} user={user} />
    </section>
  )
}

export default page