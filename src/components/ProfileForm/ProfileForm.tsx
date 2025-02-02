'use client'

import { useState } from "react"
import Image from "next/image"
import { createClient } from "../../utils/supabase/client"
import { Link } from "../../i18n/routing"


export interface UserData {
  id: string;
  email: string | undefined;
  full_name: string;
  user_name: string;
  phone: string;
  avatar_url: string;
  last_sign_in_at: string | null | undefined; // Allow undefined
}


interface ProfileFormProps {
  initialData: UserData
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [editing, setEditing] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    full_name: initialData.full_name,
    user_name: initialData.user_name,
    phone: initialData.phone,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: formData.full_name,
        user_name: formData.user_name,
        phone: formData.phone,
      },
    })

    if (error) {
      console.error("Error updating profile:", error.message)
    } else {
      setEditing(false)
    }
  }

  return (
    <>
      {/* Header Section */}
      <div className="px-8 pt-8">
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
            {initialData.avatar_url ? (
              <Image
                src={initialData.avatar_url}
                alt="Avatar"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-100 dark:ring-blue-900"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-500 dark:text-blue-300">
                  {(formData.full_name || initialData.email || "A")[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formData.full_name || "Anonymous User"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{initialData.email}</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              @{formData.user_name || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-8 py-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
        <Link href="/orders">
          <span className="inline-flex px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
            View My Orders
          </span>
        </Link>
      </div>

      {/* Profile Information */}
      <div className="px-8 pb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Account Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", name: "full_name" },
            { label: "Username", name: "user_name" },
            { label: "Phone", name: "phone" },
          ].map((field) => (
            <div
              key={field.name}
              className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {field.label}
              </p>
              {editing ? (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {formData[field.name as keyof typeof formData] || "Not provided"}
                </p>
              )}
            </div>
          ))}

          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Last Login
            </p>
            <p className="text-gray-900 dark:text-white">
              {initialData.last_sign_in_at ? new Date(initialData.last_sign_in_at).toLocaleString() : "Not available"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setFormData({
                    full_name: initialData.full_name,
                    user_name: initialData.user_name,
                    phone: initialData.phone,
                  })
                  setEditing(false)
                }}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </>
  )
}