import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { VerifyTokenPage } from "@/utils/verifyToken";

const page = () => {
  const token = cookies().get("access_token")?.value;
  if (!token) redirect("/");
  const user = VerifyTokenPage(token);
  if (user?.isAdmin === false) redirect("/");
  
  return <div>comments_table</div>;
};

export default page;
