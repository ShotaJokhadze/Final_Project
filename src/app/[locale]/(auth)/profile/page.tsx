import { createClient } from '../../../../utils/supabase/server'
import { ProfileForm } from '../../../../components/ProfileForm/ProfileForm'

export interface UserData {
  id: string;
  email: string | undefined;
  full_name: string;
  user_name: string;
  phone: string;
  avatar_url: string;
  last_sign_in_at: string | undefined;
}

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    return <div className="text-center p-4">Error loading profile</div>;
  }

  if (!user) {
    return <div>Not authenticated</div>
  }

  const userData: UserData = {
    id: user.id,
    email: user.email,
    full_name: user.user_metadata?.full_name || "",
    user_name: user.user_metadata?.user_name || "",
    phone: user.user_metadata?.phone || "",
    avatar_url: user.user_metadata?.avatar_url || "",
    last_sign_in_at: user.last_sign_in_at
  };

  return (
    <div className="min-h-screen flex items-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          <ProfileForm initialData={userData} />
        </div>
      </div>
    </div>
  );
}