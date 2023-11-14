import L, { RendererOptions } from 'leaflet'
import Renderer from '../renderers/Renderer'

export class HotlineCanvas<DataT> extends L.Canvas {
  _renderer: Renderer<DataT>

  constructor(renderer: Renderer<DataT>, options?: RendererOptions) {
    super({ ...options, tolerance: 2000 })
    this._renderer = renderer
  }

  _initContainer() {
    ;(L.Canvas.prototype as any)._initContainer.call(this)
    this._renderer.setCanvas((this as any)._container)
  }

  _destroyContainer() {
    ;(L.Canvas.prototype as any)._destroyContainer.call(this)
  }

  _update() {
    if (this._map === null) return
    ;(L.Canvas.prototype as any)._update.call(this)
    this._renderer.width((this as any)._container.width)
    this._renderer.height((this as any)._container.height)
  }

  _updatePoly(layer: any) {
    const parts = layer._parts

    if (!parts.length) {
      return
    }

    this._renderer.data(parts).draw()
  }
}
