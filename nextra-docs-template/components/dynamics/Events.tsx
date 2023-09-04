import dynamic from 'next/dynamic';

export default dynamic(() => import('../Events'), {
    ssr: false
});