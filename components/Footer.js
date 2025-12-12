
export default function Footer(){
  return (
    <footer className="mt-12 bg-slate-800 text-white py-8">
      <div className="container grid grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold">Filters</h4>
          <div className="text-sm text-slate-300">Category • Price</div>
        </div>
        <div>
          <h4 className="font-semibold">About Us</h4>
          <div className="text-sm text-slate-300">Whatbytes demo store</div>
        </div>
        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <div className="text-sm text-slate-300">Twitter • Facebook • Instagram</div>
        </div>
      </div>
      <div className="container mt-6 text-sm text-slate-400">© Whatbytes</div>
    </footer>
  )
}
