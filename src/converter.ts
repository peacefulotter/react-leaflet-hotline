import { LatLng } from 'leaflet'
import { HotlineGetter } from './types'

const Converter = {
  toLatLngs<T>(
    coords: T[] | T[][],
    getLat: HotlineGetter<T>,
    getLng: HotlineGetter<T>,
    getVal: HotlineGetter<T>
  ) {
    const getLatLngExpr = (t: T, i: number) => new LatLng(getLat(t, i), getLng(t, i), getVal(t, i))

    return Array.isArray(coords[0])
      ? (coords as T[][]).map((cs: T[], i: number) => cs.map((c) => getLatLngExpr(c, i)))
      : (coords as T[]).map(getLatLngExpr)
  },
}

export default Converter
