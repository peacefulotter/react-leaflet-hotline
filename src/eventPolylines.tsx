import L, { Map, PolylineOptions } from "leaflet";

import { defaultOptions } from "./constants";
import Converter from "./converter";
import { HotlineEventHandlers, HotlineGetter, HotlineOptions } from "./types";

const getWeight = ( { weight, tolerance }: HotlineOptions ) => 
    (weight ? weight : defaultOptions.weight) + 
    (tolerance ? tolerance : defaultOptions.tolerance)


function eventPolylines<T>(
    map: Map,
    data: T[] | T[][], getLat: HotlineGetter<T>, getLng: HotlineGetter<T>, 
    options: HotlineOptions, 
    eventHandlers?: HotlineEventHandlers 
)
{
    if ( eventHandlers === undefined ) return [];

    const poylineOptions: PolylineOptions = {
        color: 'red',
        weight: getWeight(options),
        opacity: 0,
    }

    const createPolyline = (_data: T[], i: number) => 
    {
        const latlngs = _data.map( (d: T) => ( { lat: getLat(d, i), lng: getLng(d, i) } ) )
        const polyline = L.polyline( latlngs, poylineOptions )

        Object.entries(eventHandlers).forEach( ([k, v]) => {
            polyline.on( k, e => v(e, i, polyline) )
        } )

        return polyline.addTo( map )
    }
    
    const polylines = Array.isArray(data[0])
        ? (data as T[][]).map( (d: T[], i: number) => createPolyline(d, i) )
        : [createPolyline(data as T[], 0)]

    return polylines;
}

export default eventPolylines; 