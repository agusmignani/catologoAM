import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

export default function AdminStock() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (token) {
      fetch(`${API}/products`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setProducts(data));
    }
  }, [token]);

  const submitStock = async (e) => {
    e.preventDefault();
    const url = `${API}/stock/?product_id=${productId}&quantity=${quantity}&cost_price=${costPrice}&order_number=${orderNumber}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      alert("¡Stock cargado!");
      window.location.reload();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-200">
      
      {/* SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-neutral-800 bg-neutral-900 p-6 flex flex-col z-50">
        <h2 className="mb-8 text-2xl font-bold text-rose-300 tracking-tight">Admin Panel</h2>
        <nav className="flex flex-col gap-4 text-sm flex-1">
          <a href="/admin" className="p-2 rounded hover:bg-neutral-800">
            Dashboard
          </a>
          <a href="/admin/products" className="p-2 rounded hover:bg-neutral-800">
            Productos
          </a>
          <a href="/admin/users" className="p-2 rounded hover:bg-neutral-800">
            Usuarios
          </a>
          <a href="/admin/sales" className="p-2 rounded hover:bg-neutral-800">
            Ventas
          </a>
          <a href="/admin/stock" className="p-2 rounded hover:bg-neutral-800">
            Stock
          </a>
        </nav>
        <button onClick={logout} className="mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded transition font-medium">
          Cerrar sesión
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="pl-64 flex-1 w-full">
        <div className="p-10 max-w-6xl mx-auto">
          <h1 className="mb-10 text-3xl font-black uppercase tracking-widest text-rose-300 text-center">
            Inventario
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* CARD FORMULARIO */}
            <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-xl">
              <h2 className="mb-6 text-lg font-bold text-rose-300 italic flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-rose-300 rounded-full"></span>
                Ingreso de Stock
              </h2>
              <form onSubmit={submitStock} className="flex flex-col gap-4">
                <select 
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white focus:border-rose-300 focus:ring-1 focus:ring-rose-300 outline-none"
                  value={productId} 
                  onChange={e => setProductId(e.target.value)}
                  required
                >
                  <option value="">Producto...</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="number" 
                    placeholder="Cantidad"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-rose-300"
                    value={quantity} onChange={e => setQuantity(e.target.value)} required
                  />
                  <input 
                    type="number" 
                    placeholder="Costo"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-rose-300"
                    value={costPrice} onChange={e => setCostPrice(e.target.value)} required
                  />
                </div>

                <input 
                  type="text" 
                  placeholder="N° Pedido"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-rose-300"
                  value={orderNumber} onChange={e => setOrderNumber(e.target.value)}
                />

                <button className="mt-4 w-full rounded-full bg-rose-300 py-3 text-sm font-black uppercase tracking-tighter text-neutral-950 hover:bg-rose-400 transition-colors">
                  Confirmar Operación
                </button>
              </form>
            </section>

            {/* CARD LISTADO RAPIDO */}
            <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
              <h2 className="mb-6 text-lg font-bold text-rose-300 italic">Estado Actual</h2>
              <div
              className="flex flex-col gap-4 overflow-y-auto pr-2"
              style={{
                maxHeight: "540px",
                scrollbarWidth: "thin",
                scrollbarColor: "#262626 transparent",
              }}
            >
                {products.map(p => (
                  <div key={p.id} className="flex justify-between items-center p-3 border-b border-neutral-800 last:border-0 hover:bg-neutral-800/30 transition-colors">
                    <span className="text-sm text-neutral-300">{p.name}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${p.stock <= 5 ? 'text-red-400 bg-red-400/10' : 'text-rose-300 bg-rose-300/10'}`}>
                      {p.stock} unidades
                    </span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}