import { createClient } from "../../../../utils/supabase/server";


export default async function ProfileClient() {
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();
  const user = userResponse.data?.user;

  return (
    <>
      {user && (
        <div className="flex-grow container mx-auto  p-6 bg-white  dark:bg-gray-800 dark:text-white 2xl:px-20">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user?.user_metadata?.avatar_url}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div></div>
              )}
            </div>

            {/* User details */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {user?.user_metadata?.full_name || user?.user_metadata?.first_name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.user_metadata?.user_name || "Username not set"}
              </p>
            </div>
          </div>

          {/* User metadata and additional information */}
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
              Account Information
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Full Name:</strong>{" "}
                {user?.user_metadata?.full_name || "Not provided"}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Username:</strong>{" "}
                {user.user_metadata?.user_name || "Not provided"}
              </p>
            </div>

            {/* Displaying the last login information (optional) */}
            <div className="space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Last Login:</strong>{" "}
                {user.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleString()
                  : "Not available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}