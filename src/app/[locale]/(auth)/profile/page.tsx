import Image from "next/image";
import { createClient } from "../../../../utils/supabase/server";

export default async function ProfileClient() {
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();
  const user = userResponse.data?.user;

  return (
    <>
      {user && (
        <div className="py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              {/* Profile Header */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  {user?.user_metadata?.avatar_url ? (
                    <Image
                      src={user?.user_metadata?.avatar_url}
                      alt="Avatar"
                      width={96} 
                      height={96}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">
                        {(user?.user_metadata?.full_name || user?.email || "A")[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.user_metadata?.full_name || user?.user_metadata?.first_name || "Anonymous User"}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    @{user.user_metadata?.user_name || user?.user_metadata?.full_name || user?.user_metadata?.first_name}
                  </p>
                </div>
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-700 my-8" />

              {/* Account Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Account Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Full Name
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user?.user_metadata?.full_name || user?.user_metadata?.first_name || "Not provided"}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Username
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user.user_metadata?.user_name || user?.user_metadata?.first_name || user?.user_metadata?.full_name || "Not provided"}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user.user_metadata?.phone || "Not provided"}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Last Login
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user.last_sign_in_at
                        ? new Date(user.last_sign_in_at).toLocaleString()
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}