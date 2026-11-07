export const API = process.env.NEXT_PUBLIC_API_BASE || 'https://ecommerce.routemisr.com/api/v1';
export type Product={_id:string,title:string,description:string,price:number,priceAfterDiscount?:number,imageCover:string,images?:string[],quantity?:number,ratingsAverage?:number,ratingsQuantity?:number,category?:{_id:string,name:string},brand?:{_id:string,name:string},slug?:string};
export type Category={_id:string,name:string,image:string,slug?:string};
export type Brand={_id:string,name:string,image:string};
export type CartItem={_id?:string,count:number,price:number,product:Product};
export type Cart={_id:string,totalCartPrice:number,products:CartItem[]};
export async function request<T=any>(endpoint:string,options:RequestInit={},token?:string):Promise<T>{
 const res=await fetch(`${API}${endpoint}`,{...options,headers:{'Content-Type':'application/json',...(token?{token}:{}),...options.headers},cache:'no-store'});
 let payload:any;try{payload=await res.json()}catch{throw new Error('The server did not return a valid response')}
 if(!res.ok||payload?.status==='fail')throw new Error(payload?.message||payload?.errors?.msg||`Request failed (${res.status})`);
 return payload as T;
}
export const getProducts=(limit=40,page=1)=>request<{data:Product[],metadata?:{numberOfPages:number}}>('/products?limit='+limit+'&page='+page);
export const getProduct=(id:string)=>request<{data:Product}>('/products/'+encodeURIComponent(id));
export const getCategories=()=>request<{data:Category[]}>('/categories');
export const getBrands=()=>request<{data:Brand[]}>('/brands');
