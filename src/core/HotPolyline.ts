import L, { LatLng, Map } from 'leaflet'

import { HotlineCanvas } from '../canvas/HotlineCanvas'
import Converter from '../converter'
import Renderer from '../renderers/Renderer'
import { HotlineGetter, HotlineOptions, ProjectionFn } from '../types'
import clipSegment from './clipSegment'

export default class HotPolyline<T, U> extends L.Polyline {
  projectMap: ProjectionFn<U>
  _canvas: HotlineCanvas<U>

  constructor(
    renderer: Renderer<U>,
    coords: T[] | T[][],
    getLat: HotlineGetter<T>,
    getLng: HotlineGetter<T>,
    getVal: HotlineGetter<T>
  ) {
    const canvas = new HotlineCanvas<U>(renderer)
    const latlngs = Converter.toLatLngs(coords, getLat, getLng, getVal)

    super(latlngs, { renderer: canvas, interactive: false })

    this.projectMap = renderer.projectLatLngs
    this._canvas = canvas
  }

  remove() {
    super.remove()
    this._canvas.remove()
    return this
  }

  setOptions(options?: HotlineOptions) {
    this._canvas._renderer.setOptions(options)
    this._canvas._update()
    this.redraw()
  }

  _projectLatlngs(latlngs: LatLng[] | LatLng[][], result: any, projectedBounds: any) {
    if (Array.isArray(latlngs[0]))
      (latlngs as LatLng[][]).forEach((_latlngs: LatLng[], p: number) =>
        this.projectMap(this._map, _latlngs, result, projectedBounds, p)
      )
    else this.projectMap(this._map, latlngs as LatLng[], result, projectedBounds, 0)

    if (this._canvas._renderer === undefined) return
    this._canvas._renderer.projectedData = [...result]
    this._canvas._renderer.onProjected()
  }

  /**
   * From: https://github.com/iosphere/Leaflet.hotline/blob/49e6f45dc98e1432e6a8f849ba4c2b9dd0356c8b/src/leaflet.hotline.js#L414
   */
  _clipPoints() {
    if (this._canvas._renderer === undefined) return

    if (this.options.noClip) {
      ;(this as any)._parts = (this as any)._rings
      return
    }

    ;(this as any)._parts = []

    const parts = (this as any)._parts
    const bounds = (this as any)._pxBounds

    for (let i = 0, k = 0, len = (this as any)._rings.length; i < len; i++) {
      const points = (this as any)._rings[i]

      for (let j = 0, len2 = points.length; j < len2 - 1; j++) {
        const segment = clipSegment(
          this._canvas._renderer,
          points[j],
          points[j + 1],
          bounds,
          j,
          true
        )

        if (segment === undefined) {
          continue
        }

        parts[k] = parts[k] || []
        parts[k].push(segment[0])

        // if segment goes out of screen, or it's the last one, it's the end of the line part
        if (segment[1] !== points[j + 1] || j === len2 - 2) {
          parts[k].push(segment[1])
          k++
        }
      }
    }
  }

  _clickTolerance() {
    return (
      (this as any).options.weight / 2 +
      (this as any).options.outlineWidth +
      (L.Browser.touch ? 10 : 0)
    )
  }
}
