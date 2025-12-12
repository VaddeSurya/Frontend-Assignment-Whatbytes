
import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }){
  const [cart, setCart] = useState({})

  useEffect(()=>{
    try {
      const raw = localStorage.getItem('whatbytes_cart_v1')
      if (raw) setCart(JSON.parse(raw))
    } catch(e){}
  },[])

  useEffect(()=>{
    try { localStorage.setItem('whatbytes_cart_v1', JSON.stringify(cart)) } catch(e){}
  },[cart])

  function addToCart(id, qty=1){
    setCart(prev => {
      const next = {...prev}
      if (!next[id]) next[id] = { id, qty: 0 }
      next[id].qty += qty
      return next
    })
  }
  function updateQty(id, qty){
    setCart(prev => {
      const next = {...prev}
      if (!next[id]) return next
      next[id].qty = qty
      return next
    })
  }
  function removeItem(id){
    setCart(prev => { const next = {...prev}; delete next[id]; return next })
  }
  function clearCart(){ setCart({}) }

  const cartCount = Object.values(cart).reduce((s,it)=>s+it.qty,0)

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}
