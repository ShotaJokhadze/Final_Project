import { getSession } from "@auth0/nextjs-auth0";

export default async function Profile() {
  const { user } = await getSession();

  return user ? (
    <div className="flex flex-col justify-center">
      <p>Email: {user?.email}</p>
      <p>Nickname: {user?.nickname}</p>
    </div>
  ) : (
    <div className="flex flex-col justify-center">
      <p>Please Log In</p>
    </div>
  );
}
