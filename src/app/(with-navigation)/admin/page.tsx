import ArticleAddForm from "@/components/ArticleAddForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { VerifyTokenPage } from "@/utils/verifyToken";



const page = async () => {

  const token = cookies().get("access_token")?.value;
  if (!token) redirect("/");
  const user = VerifyTokenPage(token);
  if (user?.isAdmin === false) redirect("/");

  


  return (
    <section>
      <div><h2 className="text-center pb-16 tracking-widest font-semibold text-xl">Create Article</h2></div>
      <ArticleAddForm />
    </section>
  ) 
};

export default page;
