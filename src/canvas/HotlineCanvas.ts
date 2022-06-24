
import L, { RendererOptions } from 'leaflet'
import Renderer from '../renderers/Renderer';


export class HotlineCanvas<DataT> extends L.Canvas 
{
    _hotline: Renderer<DataT>;

    constructor(hotline: Renderer<DataT>, options?: RendererOptions)
    {
        super({...options, tolerance: 2000});
        this._hotline = hotline;
    }

    _initContainer() 
    {
        (L.Canvas.prototype as any)._initContainer.call(this);
        this._hotline.setCanvas((this as any)._container)
    }

    _destroyContainer() 
    {
        (L.Canvas.prototype as any)._destroyContainer.call(this)
    }

    _update() 
    {
        (L.Canvas.prototype as any)._update.call(this);
        this._hotline.width((this as any)._container.width);
        this._hotline.height((this as any)._container.height);
    }

    _updatePoly(layer: any) 
    {
        const parts = layer._parts;

        if ( !parts.length ) { return; }

        this._hotline
            .data(parts)
            .draw();
    }
}