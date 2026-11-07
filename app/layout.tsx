import type {Metadata} from 'next';
import './globals.css';
import {StoreProvider} from '@/components/StoreContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {Toaster} from 'react-hot-toast';
export const metadata:Metadata={title:'FreshCart | Shop Smarter, Live Fresher',description:'Browse categories, brands and products with FreshCart'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><StoreProvider><Header/><main className="min-h-[60vh]">{children}</main><Footer/><Toaster position="top-right"/></StoreProvider></body></html>}
