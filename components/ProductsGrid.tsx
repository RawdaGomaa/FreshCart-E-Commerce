'use client';
import {useEffect,useMemo,useState} from 'react';
import {request,Product} from '@/lib/api';
import ProductCard from './ProductCard';
import {ChevronLeft,ChevronRight,RotateCcw} from 'lucide-react';
export default function ProductsGrid({featured=false,search='',category='',brand='',onClearFilters}:{featured?:boolean,search?:string,category?:string,brand?:string,onClearFilters?:()=>void}){
 const [products,setProducts]=useState<Product[]>([]);
 const [page,setPage]=useState(1);
 const [pages,setPages]=useState(1);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const [retry,setRetry]=useState(0);
 // The API filters by brand/category across its entire catalog, not just the currently downloaded page.
 useEffect(()=>{setPage(1)},[brand,category,search,featured]);
 useEffect(()=>{
  let cancelled=false;
  const params=new URLSearchParams({limit:featured?'40':'40',page:String(page)});
  if(brand)params.set('brand',brand);
  if(category)params.set('category[in]',category);
  setLoading(true);setError('');
  request<{data:Product[],metadata?:{numberOfPages:number}}>(`/products?${params}`)
   .then(r=>{if(!cancelled){setProducts(r.data||[]);setPages(r.metadata?.numberOfPages||1)}})
   .catch(e=>{if(!cancelled)setError(e.message||'Unable to load products')})
   .finally(()=>{if(!cancelled)setLoading(false)});
  return()=>{cancelled=true};
 },[page,brand,category,featured,retry]);
 // Free-text search filters the loaded page; category/brand must be filtered on the server.
 const filtered=useMemo(()=>products.filter(p=>!search||p.title.toLowerCase().includes(search.trim().toLowerCase())),[products,search]);
 return <>
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-4">
   {loading?Array.from({length:featured?10:15},(_,i)=><div key={i} className="skeleton h-[385px]"/>):filtered.map(p=><ProductCard key={p._id} product={p}/>)}
  </div>
  {error&&<div role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-600">{error} <button className="ml-2 underline" onClick={()=>setRetry(n=>n+1)}>Try again</button></div>}
  {!loading&&!error&&!filtered.length&&<div className="flex flex-col items-center gap-4 py-16 text-center text-[#839086]"><p>No matching products found.</p>{(brand||category||search)&&onClearFilters&&<button onClick={onClearFilters} className="inline-flex items-center gap-2 rounded-lg border border-[#bce7cc] px-5 py-2.5 font-semibold text-[#128f4b] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#effbf3] hover:shadow-md"><RotateCcw size={16}/> Clear filters</button>}</div>}
  {!featured&&pages>1&&<div className="mt-10 flex justify-center gap-2"><button aria-label="Previous" disabled={page<=1} className="chip px-4 transition-all hover:-translate-y-0.5 hover:border-green-400 hover:bg-green-50" onClick={()=>setPage(n=>Math.max(1,n-1))}><ChevronLeft size={18}/></button><span className="chip">Page {page} of {pages}</span><button aria-label="Next" disabled={page>=pages} className="chip px-4 transition-all hover:-translate-y-0.5 hover:border-green-400 hover:bg-green-50" onClick={()=>setPage(n=>Math.min(pages,n+1))}><ChevronRight size={18}/></button></div>}
 </>;
}
