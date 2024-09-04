import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { VerifyTokenPage } from "@/utils/verifyToken";
import { Domain } from "@/utils/domain";
import { Comment } from "@prisma/client";
import CommentsTable from "@/components/CommentsTable";


const fetchComments = async (token : string): Promise<Comment[] | undefined> =>{
  try {
    const response = await fetch(`${Domain}/api/comments` , {
      headers : {cookie : `access_token=${token}` }
  }) 
   const data = await response.json()
  if(!response.ok)  {
    throw new Error("failed to fetch comments")
  } 
  return data

  } catch (error : any) {
    console.log(error)
  }

}

const page = async () => {
  const token = cookies().get("access_token")?.value;
  if (!token) redirect("/");
  const user = VerifyTokenPage(token);
  if (user?.isAdmin === false) redirect("/");
  
  const comments = await fetchComments(token)
  
  
  return (
      <CommentsTable comments={comments} />
  ) 
};

export default page;
