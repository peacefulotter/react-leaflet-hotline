import { ReactNode } from 'react'

import { HotlineProps } from './types'
import useHotline from './hooks/useHotline'

function Hotline<T>({
  data,
  getLat,
  getLng,
  getVal,
  options,
  eventHandlers,
}: HotlineProps<T>): ReactNode {
  useHotline<T>({ data, getLat, getLng, getVal, options, eventHandlers })
  return null
}

export default Hotline
