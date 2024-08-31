import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const Login = () => {
  const token = cookies().get("access_token")?.value;
  if (token) redirect("/");
  return (
    <div className="min-h-screen pt-32 mx-4">
      <LoginForm />
    </div>
  );
};

export default Login;
