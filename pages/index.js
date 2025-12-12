
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import ProductCard from '../components/ProductCard'
import { useRouter } from 'next/router'
import { PRODUCTS } from '../data/products'

export default function Home(){
  const router = useRouter()
  const q = (router.query.q||'').toString().toLowerCase()
  const categoryQuery = (router.query.category||'').toString().split(',').filter(Boolean)
  const priceMin = Number(router.query.priceMin||0)
  const priceMax = Number(router.query.priceMax||1e9)

  const filtered = PRODUCTS.filter(p=>{
    if (categoryQuery.length && !categoryQuery.includes(p.category)) return false
    if (p.price < priceMin || p.price > priceMax) return false
    if (q && !(p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))) return false
    return true
  })

  return (
    <div>
      <Head><title>Whatbytes - Products</title></Head>
      <Header />
      <main className="container my-8 flex gap-6">
        <Sidebar />
        <section className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Product Listing</h2>
          {filtered.length===0 ? <div className="p-8 bg-white rounded">No products found. Try changing filters.</div> : 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p=> <ProductCard key={p.id} product={p} />)}
            </div>
          }
        </section>
      </main>
      <Footer />
    </div>
  )
}
