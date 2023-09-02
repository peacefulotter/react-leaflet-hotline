

import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

import useEventPolylines from './useEventPolylines';
import { HotlineProps, NewableHotPolyline, NewableRenderer } from '../types';
import Renderer from '../renderers/Renderer';
import HotPolyline from '../core/HotPolyline';
import Converter from '../converter';

function useCustomHotline<T, U>( 
    RendererClass: NewableRenderer<U>, 
    HotPolylineClass: NewableHotPolyline<T, U>, 
    { data, getLat, getLng, getVal, options, eventHandlers }: HotlineProps<T>,
    ...params: any[]
) 
{
    if ( !L.Browser.canvas ) 
        throw new Error('no Browser canvas')

    const map = useMap()

    const [renderer,  setRenderer]  = useState<Renderer<U>>(undefined)
    const [hotline,   setHotline]   = useState<HotPolyline<T, U>>(undefined)

    // transparent polyline on top of the hotline that handles the events
    if (eventHandlers)
        useEventPolylines( map, hotline, data, getLat, getLng, options, eventHandlers )

    // separate useEffect to avoid recreating a new hotline when some options change
    useEffect( () => {
        if ( hotline === undefined ) return;
        hotline.setOptions(options)
    }, [options] )
    
    useEffect( () => {
        const _renderer = new RendererClass(options, params);
        const _hotline = new HotPolylineClass( _renderer, data, getLat, getLng, getVal );

        _hotline.addTo(map);

        setRenderer(_renderer);
        setHotline(_hotline);
        
        return () => { 
            _renderer.remove()
            _hotline.remove()
        }
    }, [])

    useEffect( () => {
        if ( hotline === undefined ) return;
        const latlngs = Converter.toLatLngs( data, getLat, getLng, getVal )
        hotline.setLatLngs( latlngs )
    }, [data] )

    return { renderer, hotline }
}

export default useCustomHotline;