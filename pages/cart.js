
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { PRODUCTS } from '../data/products'

export default function CartPage(){
  const { cart, updateQty, removeItem, clearCart } = useContext(CartContext)
  const ids = Object.keys(cart)
  let total = 0
  const rows = ids.map(id=>{
    const p = PRODUCTS.find(x=>x.id===id)
    const qty = cart[id].qty
    const sub = p.price * qty
    total += sub
    return { p, qty, sub }
  })

  return (
    <div>
      <Header />
      <main className="container my-8">
        <h1 className="text-2xl font-semibold mb-4">Cart</h1>
        {rows.length===0 ? <div className="bg-white p-6 rounded">Your cart is empty. <a href="/">Shop products</a></div> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-4 rounded space-y-4">
              {rows.map(({p,qty})=> (
                <div key={p.id} className="flex items-center gap-4">
                  <img src={p.image} className="w-24" />
                  <div className="flex-1">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-slate-500">${p.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" className="w-20 p-1 border rounded" value={qty} onChange={(e)=>updateQty(p.id, Number(e.target.value)||1)} />
                    <button onClick={()=>removeItem(p.id)} className="text-red-600">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 rounded">
              <div className="font-semibold">Summary</div>
              <div className="mt-2">Total: ${total}</div>
              <div className="mt-4 flex gap-2">
                <button onClick={()=>alert('Demo checkout - implement backend')} className="px-3 py-2 bg-blue-600 text-white rounded">Checkout</button>
                <button onClick={()=>clearCart()} className="px-3 py-2 border rounded">Clear</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
