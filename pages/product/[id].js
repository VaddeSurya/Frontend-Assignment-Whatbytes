
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { PRODUCTS } from '../../data/products'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'

export default function ProductPage(){
  const router = useRouter()
  const { id } = router.query
  const product = PRODUCTS.find(p=>p.id===id)
  const { addToCart } = useContext(CartContext)
  const [qty, setQty] = useState(1)

  if (!product) return (
    <div>
      <Header />
      <main className="container py-20">Product not found. <a href="/">Back</a></main>
      <Footer />
    </div>
  )

  return (
    <div>
      <Header />
      <main className="container py-8">
        <div className="bg-white rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <img src={product.image} alt={product.title} className="max-w-md object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <div className="text-blue-600 text-xl font-semibold mt-2">${product.price}</div>
            <div className="mt-4">{product.description}</div>
            <div className="mt-4"><strong>Category:</strong> {product.category}</div>
            <div className="mt-4 flex items-center gap-3">
              <label>Quantity</label>
              <input type="number" value={qty} min="1" onChange={(e)=>setQty(Number(e.target.value))} className="w-20 p-2 border rounded" />
            </div>
            <div className="mt-4">
              <button onClick={()=>{ addToCart(product.id, qty); alert('Added to cart') }} className="px-4 py-2 bg-blue-600 text-white rounded">Add to Cart</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
