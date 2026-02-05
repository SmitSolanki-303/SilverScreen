import ProfileForm from '@/components/Generic/ProfileForm'
import { requireAuth } from '@/lib/auth/route-protection'

export default async function Profile() {
const user = await requireAuth() 

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-body">Profile Settings</h1>
        <ProfileForm user={user} />
      </div>
    </div>
  )
}