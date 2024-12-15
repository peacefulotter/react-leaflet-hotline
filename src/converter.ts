import { LatLng } from 'leaflet'
import { DataPoint, HotlineGetter, HotlineGetterParams } from './types'

const iterateCoords = <T>(
  coords: T[] | T[][],
  callback: (point: DataPoint<T>[], segment: number) => LatLng[],
): LatLng[][] =>
  Array.isArray(coords[0])
    ? (coords as DataPoint<T>[][]).map((cs: DataPoint<T>[], i: number) => callback(cs, i))
    : [callback(coords as DataPoint<T>[], 0)]

const Converter = {
  toLatLngs<T>(
    coords: T[] | T[][],
    getLat: HotlineGetter<T>,
    getLng: HotlineGetter<T>,
    getVal: HotlineGetter<T>,
  ) {
    const getLatLngCoords = (points: DataPoint<T>[], segment: number) =>
      points.map((point, line) => {
        const params: HotlineGetterParams<T> = {
          point,
          segment,
          line,
        }
        return new LatLng(getLat(params), getLng(params), getVal(params))
      })
    return iterateCoords(coords, getLatLngCoords)
  },
}

export default Converter
