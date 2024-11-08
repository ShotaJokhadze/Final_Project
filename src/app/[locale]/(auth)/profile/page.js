import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/login");
  }

  if (session?.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {session.error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-mediumGray dark:text-light  ">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="mb-2">Email: {session.user.email}</p>
        <p>Nickname: {session.user.nickname}</p>
      </div>
    </div>
  );
}
