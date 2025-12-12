import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-contain cursor-pointer"
        />
      </Link>

      <div className="mt-3">
        
        <Link
          href={`/product/${product.id}`}
          className="font-semibold text-slate-800 hover:underline block"
        >
          {product.title}
        </Link>

        <div className="text-blue-600 font-bold mt-1">
          ${product.price}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => addToCart(product.id, 1)}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
