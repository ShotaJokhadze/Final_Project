import { getSession } from "@auth0/nextjs-auth0";
import { Session } from "@auth0/nextjs-auth0/dist/session";

interface User {
  email: string;
  nickname: string;
}

export default async function Profile() {
  const session: Session | null = (await getSession()) ?? null;

  if (!session || !session.user) {
    return <div>You must be logged in to view this page</div>;
  }

  const user: User = session.user as User;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-mediumGray dark:text-light">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="mb-2">Email: {user.email}</p>
        <p>Nickname: {user.nickname}</p>
      </div>
    </div>
  );
}
