import L, { LatLng, Map } from 'leaflet';

import { HotlineCanvas } from '../canvas/HotlineCanvas';
import Renderer from '../renderers/Renderer';
import { HotlineOptions } from '../types';
import clipSegment from './clipSegment';


export default class HotPolyline<T, U> extends L.Polyline 
{
    projectMap: (_map: Map, latlngs: LatLng[], result: any, projectedBounds: any) => void
    _canvas: HotlineCanvas<U>

    constructor(
        renderer: Renderer<U>,
        coords: T[] | T[][], 
        getLat: (t: T) => number,
        getLng: (t: T) => number,
        getVal: (t: T) => number,
    ) {
        const canvas = new HotlineCanvas<U>(renderer)
        
        const getLatLngExpr = (t: T) => new LatLng( getLat(t), getLng(t), getVal(t) )
        const latlngs = coords.map( (cs: T | T[]) => 
            Array.isArray(cs) 
                ? cs.map( getLatLngExpr )
                : getLatLngExpr(cs)
        )

        super( latlngs as LatLng[] | LatLng[][], { renderer: canvas, interactive: true } )

        this.projectMap = renderer.projectLatLngs;
        this._canvas = canvas;
    }

    setOptions(options?: HotlineOptions)
    {
        this._canvas._hotline.setOptions(options)
        this._canvas._update()
        this.redraw()
    }

    destroy()
    {
        this._canvas._destroyContainer()
    }

    _projectLatlngs(latlngs: LatLng[] | LatLng[][], result: any, projectedBounds: any) 
    {
        if ( Array.isArray(latlngs[0]) ) 
            latlngs.forEach( (_latlngs: LatLng | LatLng[]) => 
                this.projectMap(this._map, _latlngs as LatLng[], result, projectedBounds) 
            )
        else
            this.projectMap(this._map, latlngs as LatLng[], result, projectedBounds)
        
        if ( this._canvas._hotline === undefined ) return;
        this._canvas._hotline.projectedData = [...result];
        this._canvas._hotline.onProjected()
    }

    /**
     * From: https://github.com/iosphere/Leaflet.hotline/blob/49e6f45dc98e1432e6a8f849ba4c2b9dd0356c8b/src/leaflet.hotline.js#L414
     */
    _clipPoints () 
    {
        if ( this._canvas._hotline === undefined ) return;
    
        if (this.options.noClip) {
            (this as any)._parts = (this as any)._rings;
            return;
        }

        (this as any)._parts = [];

        const parts = (this as any)._parts;
        const bounds = (this as any)._pxBounds;

        for (let i = 0, k = 0, len = (this as any)._rings.length; i < len; i++) 
        {
            const points = (this as any)._rings[i];

            for (let j = 0, len2 = points.length; j < len2 - 1; j++) 
            {
                const segment = clipSegment(this._canvas._hotline, points[j], points[j + 1], bounds, j, true);

                if ( segment === undefined ) { continue; }

                parts[k] = parts[k] || [];
                parts[k].push(segment[0]);

                // if segment goes out of screen, or it's the last one, it's the end of the line part
                if ((segment[1] !== points[j + 1]) || (j === len2 - 2)) {
                    parts[k].push(segment[1]);
                    k++;
                }
            }
        }
    }

    _clickTolerance() {
        return (this as any).options.weight / 2 + (this as any).options.outlineWidth + (L.Browser.touch ? 10 : 0);
    }
}