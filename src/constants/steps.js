import { MapPin, List, Package, Shield, Calendar, CreditCard } from 'lucide-react'

export const STEP_STATUS = {
  COMPLETED: 'completed',
  CURRENT: 'current',
  PENDING: 'pending'
}

export const STEPS = [
  {
    id: 'postcode',
    label: 'Postcode',
    icon: MapPin,
    status: STEP_STATUS.COMPLETED
  },
  {
    id: 'waste-type',
    label: 'Waste Type',
    icon: List,
    status: STEP_STATUS.COMPLETED
  },
  {
    id: 'select-skip',
    label: 'Select Skip',
    icon: Package,
    status: STEP_STATUS.CURRENT
  },
  {
    id: 'permit-check',
    label: 'Permit Check',
    icon: Shield,
    status: STEP_STATUS.PENDING
  },
  {
    id: 'choose-date',
    label: 'Choose Date',
    icon: Calendar,
    status: STEP_STATUS.PENDING
  },
  {
    id: 'payment',
    label: 'Payment',
    icon: CreditCard,
    status: STEP_STATUS.PENDING
  }
]
