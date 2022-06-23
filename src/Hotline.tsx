

import { FC } from 'react';
import { IHotline } from './hotline';
import useHotline from './useHotline';

const Hotline: FC<IHotline> = ( { data, options } ) => {
    useHotline(data, options)
    return null
}

export default Hotline;