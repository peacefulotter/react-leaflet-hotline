import L, { LatLng, LeafletEvent, LeafletEventHandlerFnMap, Map } from 'leaflet'
import HotPolyline from './core/HotPolyline'
import Renderer from './renderers/Renderer'

export type RGB = [number, number, number]
export interface Color {
  r: number
  g: number
  b: number
  t: number
}
export type Palette = Color[]

export interface HotlineOptions {
  min?: number
  max?: number
  weight?: number
  outlineWidth?: number
  outlineColor?: string
  palette?: Palette
  tolerance?: number
}

export type ProjectionFn<T> = (
  _map: Map,
  latlngs: LatLng[],
  result: T[][],
  projectedBounds: any,
  p: number
) => void

export type NewableRenderer<T> = new (options?: HotlineOptions, ...params: any[]) => Renderer<T>
export type NewableHotPolyline<T, U> = new (
  renderer: Renderer<U>,
  data: T[] | T[][],
  getLat: HotlineGetter<T>,
  getLng: HotlineGetter<T>,
  getVal: HotlineGetter<T>
) => HotPolyline<T, U>

/**
 * x, y: coordinates
 * v: value
 * p: polyline index
 * i: point index on the polyline
 */
export interface HotPoint {
  x: number
  y: number
  v: number
  p: number
  i: number
}

export type HotlineEventFn = (e: LeafletEvent, i: number, polyline: L.Polyline<any, any>) => void
export type HotlineEventHandlers = { [key in keyof LeafletEventHandlerFnMap]: HotlineEventFn }

export type HotlineGetter<T> = (t: T, i: number) => number

export interface HotlineProps<T> {
  data: T[] | T[][]
  getLat: HotlineGetter<T>
  getLng: HotlineGetter<T>
  getVal: HotlineGetter<T>
  options?: HotlineOptions
  eventHandlers?: HotlineEventHandlers
}
