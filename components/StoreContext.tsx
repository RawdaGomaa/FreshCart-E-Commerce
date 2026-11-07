'use client';
import {createContext,useContext,useEffect,useState,useCallback,ReactNode} from 'react';
import toast from 'react-hot-toast';
import {request,Cart} from '@/lib/api';
type User={name:string,email:string,role?:string,id?:string,_id?:string};
type Store={token:string|null,user:User|null,cart:Cart|null,wishlist:string[],busy:boolean,login:(token:string,user:User)=>void,logout:()=>void,refresh:()=>Promise<void>,addCart:(id:string)=>Promise<void>,changeCount:(id:string,count:number)=>Promise<void>,removeCart:(id:string)=>Promise<void>,clearCart:()=>Promise<void>,toggleWish:(id:string)=>Promise<void>};
const C=createContext<Store|null>(null);
export function StoreProvider({children}:{children:ReactNode}){
 const [token,setToken]=useState<string|null>(null),[user,setUser]=useState<User|null>(null),[cart,setCart]=useState<Cart|null>(null),[wishlist,setWishlist]=useState<string[]>([]),[busy,setBusy]=useState(false);
 const refreshCartFor=useCallback(async(t:string)=>{const response=await request<{data:Cart}>('/cart',{},t);setCart(response.data);},[]);
 const refreshFor=useCallback(async(t:string)=>{const [c,w]=await Promise.allSettled([request<any>('/cart',{},t),request<any>('/wishlist',{},t)]);setCart(c.status==='fulfilled'?c.value.data:null);setWishlist(w.status==='fulfilled'?w.value.data.map((p:{_id:string})=>p._id):[]);},[]);
 useEffect(()=>{const t=localStorage.getItem('fc_token');const u=localStorage.getItem('fc_user');if(t){setToken(t);if(u)try{setUser(JSON.parse(u))}catch{}refreshFor(t).catch(()=>{});}},[refreshFor]);
 const login=(t:string,u:User)=>{localStorage.setItem('fc_token',t);localStorage.setItem('fc_user',JSON.stringify(u));setToken(t);setUser(u);refreshFor(t).catch(()=>{});};
 const logout=()=>{localStorage.removeItem('fc_token');localStorage.removeItem('fc_user');setToken(null);setUser(null);setCart(null);setWishlist([]);};
 const guard=()=>{if(!token){toast.error('Please sign in first');return false}return true};
 const perform=async(fn:()=>Promise<void>)=>{setBusy(true);try{await fn()}catch(e:any){toast.error(e.message||'Something went wrong')}finally{setBusy(false)}};
 const refresh=async()=>{if(token)await refreshFor(token)};
 const addCart=async(id:string)=>{if(!guard())return;await perform(async()=>{await request<any>('/cart',{method:'POST',body:JSON.stringify({productId:id})},token!);await refreshCartFor(token!);toast.success('Added to cart')})};
 const changeCount=async(id:string,count:number)=>{if(!guard())return;await perform(async()=>{if(!/^[0-9a-f]{24}$/i.test(id))throw Error('Product ID is missing. Reload the cart.');await request<any>('/cart/'+id,{method:'PUT',body:JSON.stringify({count})},token!);await refreshCartFor(token!)})};
 const removeCart=async(id:string)=>{if(!guard())return;await perform(async()=>{if(!/^[0-9a-f]{24}$/i.test(id))throw Error('Product ID is missing. Reload the cart.');await request<any>('/cart/'+id,{method:'DELETE'},token!);await refreshCartFor(token!);toast.success('Removed from cart')})};
 const clearCart=async()=>{if(!guard())return;await perform(async()=>{await request('/cart',{method:'DELETE'},token!);setCart(null);toast.success('Cart cleared')})};
 const toggleWish=async(id:string)=>{if(!guard())return;await perform(async()=>{const exists=wishlist.includes(id);const r=await request<any>(exists?'/wishlist/'+id:'/wishlist',{method:exists?'DELETE':'POST',...(!exists?{body:JSON.stringify({productId:id})}:{})},token!);setWishlist(r.data.map((v:string|{_id:string})=>typeof v==='string'?v:v._id));toast.success(exists?'Removed from wishlist':'Added to wishlist')})};
 return <C.Provider value={{token,user,cart,wishlist,busy,login,logout,refresh,addCart,changeCount,removeCart,clearCart,toggleWish}}>{children}</C.Provider>
}
export const useStore=()=>{const c=useContext(C);if(!c)throw new Error('StoreProvider missing');return c};
