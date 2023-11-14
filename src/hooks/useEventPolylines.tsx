import L, { Map, PolylineOptions } from 'leaflet'
import { useEffect, useState } from 'react'

import { defaultOptions } from '../constants'
import HotPolyline from '../core/HotPolyline'
import { HotlineEventHandlers, HotlineGetter, HotlineOptions } from '../types'

const getWeight = (options?: HotlineOptions) =>
  (options && options.weight ? options.weight : defaultOptions.weight) +
  (options && options.tolerance ? options.tolerance : defaultOptions.tolerance)

function useEventPolylines<T, U>(
  map: Map,
  hotline: HotPolyline<T, U> | undefined,
  data: T[] | T[][],
  getLat: HotlineGetter<T>,
  getLng: HotlineGetter<T>,
  options?: HotlineOptions,
  eventHandlers?: HotlineEventHandlers
): null {
  const [polylines, setPolylines] = useState<L.Polyline[]>([])

  const poylineOptions: PolylineOptions = {
    color: 'red',
    weight: getWeight(options),
    opacity: 0,
  }

  const createPolyline = (_data: T[], i: number) => {
    const latlngs = _data.map((d: T) => ({
      lat: getLat(d, i),
      lng: getLng(d, i),
    }))
    const polyline = L.polyline(latlngs, poylineOptions)
    attachEventHandlers(polyline, i)
    return polyline.addTo(map)
  }

  const attachEventHandlers = (polyline: L.Polyline, i: number) => {
    if (eventHandlers === undefined) return
    Object.entries(eventHandlers).forEach(([k, v]) => {
      polyline.on(k, (e) => v(e, i, polyline))
    })
  }

  useEffect(() => {
    if (eventHandlers === undefined || hotline === undefined) return

    const _polylines = Array.isArray(data[0])
      ? (data as T[][]).map((d: T[], i: number) => createPolyline(d, i))
      : [createPolyline(data as T[], 0)]

    setPolylines(_polylines)

    return () => {
      _polylines.forEach((p) => p.remove())
    }
  }, [data, hotline])

  useEffect(() => {
    if (polylines === undefined) return
    polylines.forEach(attachEventHandlers)
  }, [eventHandlers])

  return null
}

export default useEventPolylines
