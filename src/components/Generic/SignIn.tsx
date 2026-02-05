'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the sign-in page using the app router
    router.push('/signin')
  }, [router])

  return null // Render nothing since we're redirecting
}

export default SignIn