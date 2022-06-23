


import { Map } from 'leaflet';
import { LatLngData, LatLngPoint } from '../hotline';
import Renderer from './Renderer';


export default class LatLngRenderer extends Renderer<LatLngData> {

    projectLatLngs(_map: Map, latlngs: any[], result: any, projectedBounds: any)
    {
        const len = latlngs.length;
        const ring: any[] = [];
        for (let i = 0; i < len; i++) 
        {
            ring[i] = _map.latLngToLayerPoint(latlngs[i]);
            ring[i].z = latlngs[i].value;
            ring[i].i = i
            projectedBounds.extend(ring[i]);
        }
        result.push(ring);
    }

    _drawHotline(): void 
    {
        for (let i = 0, dataLength = this._data.length; i < dataLength; i++) 
        {
            const path = this._data[i] as any;
            for (let j = 1, pathLength = path.length; j < pathLength; j++) 
            {
                const pointStart = path[j - 1];
                const pointEnd = path[j];

                if ( pointStart.i !== pointEnd.i )
                    this._addGradient(pointStart, pointEnd);
            }
        }
    }

    _addGradient(pointStart: LatLngPoint, pointEnd: LatLngPoint) 
    {
        const ctx = this._ctx;

        if ( ctx === undefined ) return;
        
        // Create a gradient for each segment, pick start and end colors from palette gradient
        const gradient: CanvasGradient = ctx.createLinearGradient(pointStart.x, pointStart.y, pointEnd.x, pointEnd.y);
       this.computeGradient(gradient, pointStart, pointEnd)

        ctx.lineWidth = this._options.weight
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(pointStart.x, pointStart.y);
        ctx.lineTo(pointEnd.x, pointEnd.y);
        ctx.stroke();
    }

    computeGradient(gradient: CanvasGradient, pointStart: LatLngPoint, pointEnd: LatLngPoint) 
    {
        const deltaIndex = pointEnd.i - pointStart.i

        for ( let k = pointStart.i; k <= pointEnd.i; k++ )
        {
            const point = this.projectedData[0][k]
            const dist = (point.i - pointStart.i) / (deltaIndex !== 0 ? deltaIndex : 1)
            const rgb = this.getRGBForValue(point.z);
            this._addColorGradient(gradient, rgb, dist)
        }
    } 

    override onProjected(): void {
        
    }
}



