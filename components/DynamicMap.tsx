'use client';

import dynamic from 'next/dynamic';

const GoogleMap = dynamic(() => import('@/components/GoogleMap'), { ssr: false });

export default GoogleMap;
