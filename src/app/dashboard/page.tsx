import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin')
  }

  return (
    <div className="min-h-screen">

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-accent">
              Welcome, {user.user_metadata?.full_name || 'User'}!
            </h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600 mt-2">
              Provider: {user.app_metadata?.provider || 'email'}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}