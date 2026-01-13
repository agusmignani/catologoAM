import { useEffect, useState, useRef } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    cost_price: "",
    price: "",
    stock: "",
    is_active: true,
    image: null,
  });

  const API = "http://127.0.0.1:8000";

  /* =========================
      AUTH & LOAD
  ========================= */
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* =========================
      HANDLERS
  ========================= */
  const resetForm = () => {
    setForm({
      name: "",
      cost_price: "",
      price: "",
      stock: "",
      is_active: true,
      image: null,
    });
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("cost_price", parseFloat(form.cost_price));
    formData.append("price", parseFloat(form.price));
    formData.append("stock", parseInt(form.stock));
    formData.append("is_active", form.is_active);

    if (form.image) {
      formData.append("image", form.image);
    }

    const url = editingId ? `${API}/products/${editingId}` : `${API}/products`;
    const method = editingId ? "PUT" : "POST";
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        await loadProducts();
        resetForm();
      } else {
        alert("Error al procesar la solicitud");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const editProduct = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      cost_price: p.cost_price || "",
      price: p.price,
      stock: p.stock,
      is_active: p.is_active,
      image: null,
    });
  };

  const toggleActive = async (p) => {
    const token = localStorage.getItem("token");
    await fetch(`${API}/products/${p.id}/toggle`, { 
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
    });
    loadProducts();
  };

  const deleteProduct = async (id) => {
    if (!confirm("¿Eliminar producto permanentemente?")) return;
    const token = localStorage.getItem("token");
    await fetch(`${API}/products/${id}`, { 
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    loadProducts();
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-200 font-sans">
      
      {/* 🧭 SIDEBAR - Mantenido igual */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col fixed h-full">
        <h2 className="text-2xl font-semibold text-rose-300 mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4 text-sm flex-1">
          <a href="/admin" className="p-2 rounded hover:bg-neutral-800">Dashboard</a>
          <a href="/admin/products" className="p-2 rounded bg-neutral-800 text-rose-300 font-bold">Productos</a>
          <a href="/admin/users" className="p-2 rounded hover:bg-neutral-800">Usuarios</a>
          <a href="/admin/sales" className="p-2 rounded hover:bg-neutral-800">Ventas</a>
          <a href="/admin/stock" className="p-2 rounded hover:bg-neutral-800">Stock</a>
        </nav>
        <button onClick={logout} className="mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded transition font-medium">
          Cerrar sesión
        </button>
      </aside>

      {/* 📊 MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-10 text-3xl font-black uppercase tracking-widest text-rose-300 text-center">
            Gestión de Productos
          </h1>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* 📝 FORMULARIO */}
            <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-rose-300 mb-6 flex items-center gap-2 italic">
                <span className="w-2 h-2 bg-rose-300 rounded-full"></span>
                {editingId ? "Actualizar Datos" : "Nuevo Producto"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  placeholder="Nombre del producto"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-neutral-500 font-bold uppercase ml-2">Costo</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="$ 0.00"
                      value={form.cost_price}
                      onChange={(e) => setForm({ ...form, cost_price: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:ring-2 focus:ring-rose-300 outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-rose-300/50 font-bold uppercase ml-2">Venta</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="$ 0.00"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-neutral-800 border border-rose-300/20 text-rose-100 focus:ring-2 focus:ring-rose-300 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-neutral-500 font-bold uppercase ml-2">Stock Inicial</label>
                  <input
                    type="number"
                    placeholder="Unidades"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 outline-none focus:ring-2 focus:ring-rose-300"
                    required
                  />
                </div>

                <div className="relative group">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    className="hidden"
                    id="product-image"
                  />
                  <label
                    htmlFor="product-image"
                    className="flex flex-col items-center justify-center gap-2 w-full p-6 rounded-xl bg-neutral-950 border-2 border-dashed border-neutral-800 group-hover:border-rose-300 transition-all cursor-pointer"
                  >
                    <span className="text-2xl">📷</span>
                    <span className="text-xs text-neutral-400 font-medium">
                      {form.image ? form.image.name : "Seleccionar Imagen del Producto"}
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    disabled={loading}
                    className="flex-1 py-3 rounded-full bg-rose-300 text-neutral-950 font-black uppercase tracking-widest hover:bg-rose-400 transition shadow-lg shadow-rose-300/10 disabled:opacity-50"
                  >
                    {loading ? "PROCESANDO..." : editingId ? "GUARDAR CAMBIOS" : "CREAR PRODUCTO"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </form>
            </section>

            {/* 📦 LISTA DE PRODUCTOS */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl h-fit">
            <h2 className="text-lg font-semibold text-rose-300 mb-6 flex justify-between items-center">
              <span>Inventario Actual</span>
              <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">
                {products.length} Productos
              </span>
            </h2>

            <div
              className="flex flex-col gap-4 overflow-y-auto pr-2"
              style={{
                maxHeight: "540px",
                scrollbarWidth: "thin",
                scrollbarColor: "#262626 transparent",
              }}
            >
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 border border-neutral-800 rounded-xl p-3 hover:border-rose-300 transition-all bg-neutral-950/50"
                >
                  <img
                    src={`${API}${p.image_url}`}
                    className="w-16 h-16 object-cover rounded-lg bg-neutral-800"
                    alt={p.name}
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-neutral-100 truncate">{p.name}</p>
                    <div className="text-xs text-neutral-400 flex flex-wrap gap-x-2">
                      <span>Costo: ${p.cost_price}</span>
                      <span>Venta: <b className="text-rose-200">${p.price}</b></span>
                    </div>
                    <div className="text-[10px] mt-1 flex gap-2 uppercase font-bold">
                      <span className={p.stock < 5 ? "text-rose-400" : "text-green-500"}>
                        Disponible: {p.stock}
                      </span>
                    </div>
                    {p.order_number && (
                      <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1 rounded mt-1 inline-block">
                        Pedido #{p.order_number}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 text-right text-[10px] font-bold uppercase">
                    <button onClick={() => editProduct(p)} className="text-rose-300 hover:text-rose-100 transition">
                      Editar
                    </button>
                    <button
                      onClick={() => toggleActive(p)}
                      className={p.is_active ? "text-yellow-600 hover:text-yellow-400" : "text-green-600"}
                    >
                      {p.is_active ? "Desactivar" : "Activar"}
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="text-red-800 hover:text-red-500">
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>

  </div>
);}