import dynamic from 'next/dynamic'

export default dynamic(() => import('../Tracker'), {
  ssr: false,
})
