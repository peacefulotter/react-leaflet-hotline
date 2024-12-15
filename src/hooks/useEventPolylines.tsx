import L, { Map, PolylineOptions } from 'leaflet'
import { useEffect, useState } from 'react'

import { defaultOptions } from '../constants'
import HotPolyline from '../core/HotPolyline'
import { HotlineEventHandlers, HotlineGetter, HotlineOptions } from '../types'
import Converter from '../converter'
import { LatLng } from 'leaflet'

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
  eventHandlers?: HotlineEventHandlers,
): null {
  const [polylines, setPolylines] = useState<L.Polyline[]>([])

  const poylineOptions: PolylineOptions = {
    color: 'red',
    weight: getWeight(options),
    opacity: 0,
  }

  const createPolyline = (latlngs: LatLng[], segment: number) => {
    const polyline = L.polyline(latlngs, poylineOptions)
    attachEventHandlers(polyline, segment)
    return polyline.addTo(map)
  }

  const attachEventHandlers = (polyline: L.Polyline, line: number) => {
    if (eventHandlers === undefined) return
    Object.entries(eventHandlers).forEach(([k, v]) => {
      polyline.on(k, (e) => v({ event: e, line, polyline }))
    })
  }

  useEffect(() => {
    if (eventHandlers === undefined || hotline === undefined) return

    const coords = Converter.toLatLngs(data, getLat, getLng, () => 0)
    const _polylines = coords.map((c, i) => createPolyline(c, i))

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
