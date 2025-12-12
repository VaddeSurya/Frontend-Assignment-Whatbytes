
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { PRODUCTS } from '../data/products'

export default function Sidebar(){
  const router = useRouter();
  const qs = router.query;
  const categories = useMemo(()=> Array.from(new Set(PRODUCTS.map(p=>p.category))).sort(), []);

  function toggleCategory(cat){
    const current = (qs.category || '').toString().split(',').filter(Boolean);
    let next;
    if (current.includes(cat)) next = current.filter(c=>c!==cat);
    else next = [...current, cat];
    const query = {...qs, category: next.length? next.join(',') : undefined};
    router.push({ pathname: '/', query }, undefined, { shallow:true });
  }

  return (
    <aside className="w-64">
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Filters</h3>
        <div className="mb-4">
          <h4 className="font-medium">Category</h4>
          <div className="flex flex-col mt-2 space-y-2">
            <label className="flex items-center gap-2"><input type="checkbox" onChange={()=>{ router.push({ pathname: '/', query: {} }, undefined, { shallow:true }); }} /> All</label>
            {categories.map(cat=> (
              <label key={cat} className="flex items-center gap-2">
                <input type="checkbox" checked={(qs.category||'').toString().split(',').includes(cat)} onChange={()=>toggleCategory(cat)} /> {cat}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium">Price</h4>
          <div className="mt-2">
            <input type="number" placeholder="Min" className="w-full mb-2 p-2 border rounded" onKeyDown={(e)=>{ if(e.key==='Enter'){ const min=e.target.value; const q={...qs, priceMin: min||undefined}; router.push({pathname:'/', query:q}, undefined, {shallow:true}) } }} />
            <input type="number" placeholder="Max" className="w-full p-2 border rounded" onKeyDown={(e)=>{ if(e.key==='Enter'){ const max=e.target.value; const q={...qs, priceMax: max||undefined}; router.push({pathname:'/', query:q}, undefined, {shallow:true}) } }} />
            <div className="text-sm text-slate-500 mt-2">Press Enter to apply</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
