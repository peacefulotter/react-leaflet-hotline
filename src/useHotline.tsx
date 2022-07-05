

import { HotlineOptions, HotData, HotlineProps } from './types';
import LatLngRenderer from './renderers/LatLngRenderer';
import HotPolyline from './core/HotPolyline';
import useCustomHotline from './useCustomHotline';

function useHotline<T>( opts: HotlineProps<T> )
{
    const hotline = useCustomHotline<T, HotData>( 
        LatLngRenderer, HotPolyline<T, HotData>, 
        opts 
    )

    return hotline;
}

export default useHotline;