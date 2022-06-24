

import { FC } from 'react';
import { IHotline } from './types';
import useHotline from './useHotline';

function Hotline<T>( { data, getLat, getLng, getVal, options }: IHotline<T> ): FC<IHotline<T>>
{
    useHotline<T>(data, getLat, getLng, getVal, options)
    return null
}

export default Hotline;