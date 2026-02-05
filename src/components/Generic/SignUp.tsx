'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the sign-up page using the app router
    router.push('/signup')
  }, [router])

  return null // Render nothing since we're redirecting
}

export default SignUp