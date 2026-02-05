'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ProfileForm({ user } : any) {
  const [fullName, setFullName] = useState(user.user_metadata?.full_name || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()
  const router = useRouter()

  const handleUpdate = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Profile updated successfully!')
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-body"
          />
          <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-body"
          />
        </div>

        {message && (
          <div className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  )
}