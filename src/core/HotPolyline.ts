import L, { Map } from 'leaflet';

import { HotlineCanvas } from '../canvas/HotlineCanvas';
import Renderer from '../renderers/Renderer';
import clipSegment from './clipSegment';


export class HotPolyline<CoordT extends L.LatLngExpression, DataT> extends L.Polyline 
{
    coords: CoordT[] | CoordT[][]
    projectMap: (_map: Map, latlngs: CoordT[], result: any, projectedBounds: any) => void
    _canvas: HotlineCanvas<DataT>

    constructor(
        renderer: Renderer<DataT>,
        coords: CoordT[] | CoordT[][], 
    ) {
        const canvas = new HotlineCanvas<DataT>(renderer)
        super( coords, { renderer: canvas, interactive: true } )

        this.coords = coords;
        this.projectMap = renderer.projectLatLngs;
        this._canvas = canvas;
    }

    _projectLatlngs(latlngs: CoordT[] | CoordT[][], result: any, projectedBounds: any) 
    {
        if ( Array.isArray(this.coords[0]) ) 
            this.coords.forEach( (coords: CoordT | CoordT[]) => 
                this.projectMap(this._map, coords as CoordT[], result, projectedBounds) 
            )
        else
            this.projectMap(this._map, this.coords as CoordT[], result, projectedBounds)
        
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