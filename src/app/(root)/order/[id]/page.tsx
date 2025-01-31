import { Metadata } from 'next'
import { getOrderById } from '@/lib/actions/order.actions'
import { notFound } from 'next/navigation'

import { ShippingAddress } from '@/types'
import { auth } from '@/auth'
import OrderDetailsTable from './order-details-table'

export const metadata: Metadata = {
  title: 'Order Details'
}

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string
  }>
}) => {
  const { id } = await props.params

  const order = await getOrderById(id)
  if (!order) notFound()

  const session = await auth()

  let client_secret = null

  // Check if is not paid and using stripe

  return <OrderDetailsTable />
}

export default OrderDetailsPage
