
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { ShoppingCart } from 'lucide-react'

export default function Header(){ 
  const router = useRouter();
  const { cartCount } = useContext(CartContext);
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-4 shadow">
      <div className="container flex items-center gap-4">
        <div className="flex-none text-xl font-bold">
          <Link href="/">Whatbytes</Link>
        </div>
        <div className="flex-1">
          <input defaultValue={router.query.q||''} onKeyDown={(e)=>{ if(e.key==='Enter'){ const q=e.target.value; router.push({ pathname: '/', query: {...router.query, q} }) } }} placeholder="Search for products..." className="w-full max-w-2xl px-3 py-2 rounded-lg text-slate-800" />
        </div>
        <div className="flex-none flex items-center gap-4">
          <Link href="/cart" className="flex ...">
            <ShoppingCart size={18} /> 
            <span>Cart</span> 
            <span className="ml-1 bg-red-600 ...">{cartCount}</span>
          </Link>

          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">AJ</div>
        </div>
      </div>
    </header>
  )
}
