import {Suspense} from 'react';import Pages from '@/components/Pages';
export default function CatchAll(){return <Suspense fallback={<div className="wrap py-24"><div className="skeleton h-96"/></div>}><Pages/></Suspense>}
