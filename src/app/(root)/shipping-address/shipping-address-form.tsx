'use client'

import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useTransition } from 'react'
import { ShippingAddress } from '@/types'
import { shippingAddressSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerRenderProps, useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader } from 'lucide-react'

import { shippingAddressDefaultValues } from '@/lib/constants'
import { updateUserAddress } from '@/lib/actions/user.actions'

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit: SubmitHandler<
    z.infer<typeof shippingAddressSchema>
  > = async values => {
    startTransition(async () => {
      const res = await updateUserAddress(values)

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message
        })
        return
      }

      router.push('/payment-method')
    })
  }

  return (
    <div className='mx-auto max-w-md space-y-4'>
      <h1 className='h2-bold mt-4'>Shipping Address</h1>
      <p className='text-sm text-muted-foreground'>
        Please enter an address to ship to
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='fullName'
              render={({
                field
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'fullName'
                >
              }) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-bold text-primary'>
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='text-muted-foreground'
                      placeholder='Enter full name'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='streetAddress'
              render={({
                field
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'streetAddress'
                >
              }) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-bold text-primary'>
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='text-muted-foreground'
                      placeholder='Enter address'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='city'
              render={({
                field
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'city'
                >
              }) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-bold text-primary'>City</FormLabel>
                  <FormControl>
                    <Input
                      className='text-muted-foreground'
                      placeholder='Enter city'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='postalCode'
              render={({
                field
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'postalCode'
                >
              }) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-bold text-primary'>
                    Postal Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='text-muted-foreground'
                      placeholder='Enter postal code'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='country'
              render={({
                field
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'country'
                >
              }) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-bold text-primary'>
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='text-muted-foreground'
                      placeholder='Enter country'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex gap-2'>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Loader className='h-4 w-4 animate-spin' />
              ) : (
                <ArrowRight className='h-4 w-4' />
              )}{' '}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ShippingAddressForm
