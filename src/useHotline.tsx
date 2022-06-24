

import { HotlineOptions, HotData } from './types';
import LatLngRenderer from './renderers/LatLngRenderer';
import HotPolyline from './core/HotPolyline';
import useCustomHotline from './useCustomHotline';

function useHotline<T>( 
    data: T[], 
    getLat: (t: T) => number, getLng: (t: T) => number, getVal: (t: T) => number, 
    options?: HotlineOptions 
)
{
    const createHotline = useCustomHotline<T, HotData>( LatLngRenderer, HotPolyline<T, HotData> )

    const renderer = createHotline( data, getLat, getLng, getVal, options )

    return renderer;
}

export default useHotline;