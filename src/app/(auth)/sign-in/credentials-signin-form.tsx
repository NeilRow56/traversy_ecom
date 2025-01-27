'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useActionState } from 'react'
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { useSearchParams } from 'next/navigation'
import { SubmitButton } from '@/components/shared/submit-button'

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: ''
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            placeholder='user@example.com'
          />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
            placeholder='******'
          />
        </div>
        <div>
          <SubmitButton text='Sign In' />
        </div>

        {/* 
        The symbol && denotes the AND operator. It evaluates two statements/conditions and returns true only when both statements/conditions are true.
        */}

        {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}

        <div className='text-center text-sm text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up' target='_self' className='link'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default CredentialsSignInForm
