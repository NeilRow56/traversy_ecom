import { Metadata } from 'next'
import { getOrderById } from '@/lib/actions/order.actions'
import { notFound } from 'next/navigation'

import { ShippingAddress } from '@/types'
import { auth } from '@/auth'
import OrderDetailsTable from './order-details-table'

export const metadata: Metadata = {
  title: 'Order Details'
}

type ParamsType = Promise<{ id: string }>

const OrderDetailsPage = async (props: { params: ParamsType }) => {
  const { id } = await props.params

  const order = await getOrderById(id)
  if (!order) notFound()

  const session = await auth()

  // Check if is not paid and using stripe

  return (
    <>
      <OrderDetailsTable />
      <div>OrderId: {order.id}</div>
    </>
  )
}

export default OrderDetailsPage
