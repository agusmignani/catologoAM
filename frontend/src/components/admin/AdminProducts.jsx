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
    initial_stock: "", 
    order_number: "", 
    image: null,
    is_active: true,
  });

  const API = "http://127.0.0.1:8000";

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; 
  };

  const loadProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      cost_price: "",
      price: "",
      stock: "",
      initial_stock: "",
      order_number: "",
      image: null,
      is_active: true,
    });
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("cost_price", form.cost_price);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("initial_stock", form.initial_stock);
    formData.append("order_number", form.order_number);
    formData.append("is_active", form.is_active);

    if (form.image) {
      formData.append("image", form.image);
    }

    const url = editingId ? `${API}/products/${editingId}` : `${API}/products`;
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: formData,
    });

    if (!res.ok) {
      alert("Error al guardar producto");
      setLoading(false);
      return;
    }

    await loadProducts();
    resetForm();
    setLoading(false);
  };

  const editProduct = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      cost_price: p.cost_price,
      price: p.price,
      stock: p.stock,
      initial_stock: p.initial_stock || p.stock,
      order_number: p.order_number || "",
      image: null,
      is_active: p.is_active,
    });
  };

  const deleteProduct = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    await fetch(`${API}/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  const toggleActive = async (p) => {
    await fetch(`${API}/products/${p.id}/toggle`, { method: "PATCH" });
    loadProducts();
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-200 font-sans">

      {/* 🧭 SIDEBAR (Copiado de tu Dashboard) */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col fixed h-full">
        <h2 className="text-2xl font-semibold text-rose-300 mb-8">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4 text-sm flex-1">
          <a href="/admin" className="p-2 rounded hover:bg-neutral-800 hover:text-rose-300 transition">
            Dashboard
          </a>
          <a href="/admin/products" className="p-2 rounded bg-neutral-800 text-rose-300 transition font-bold">
            Productos
          </a>
          <a href="/admin/users" className="p-2 rounded hover:bg-neutral-800 hover:text-rose-300 transition">
            Usuarios
          </a>
          <a href="/admin/sales" className="p-2 rounded hover:bg-neutral-800 hover:text-rose-300 transition">
            Ventas
          </a>
        </nav>

        <button
          onClick={logout}
          className="mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded transition"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* 📊 CONTENIDO PRINCIPAL */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          <h1 className="text-3xl font-bold text-rose-300 mb-8 text-center">
            GESTIÓN DE PRODUCTOS
          </h1>

          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* 📝 FORMULARIO */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-rose-300 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-300 rounded-full"></span>
                  {editingId ? "Editar producto" : "Nuevo ingreso de producto"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  placeholder="Nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Precio de costo"
                      value={form.cost_price}
                      onChange={(e) => setForm({ ...form, cost_price: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Precio venta"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                      required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Stock Actual"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Stock Ingresado"
                      value={form.initial_stock}
                      onChange={(e) => setForm({ ...form, initial_stock: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-rose-200 font-bold focus:outline-none focus:ring-2 focus:ring-rose-300"
                      required
                    />
                </div>

                <input
                  placeholder="Número de pedido"
                  value={form.order_number}
                  onChange={(e) => setForm({ ...form, order_number: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />

                {/* BOTÓN DE IMAGEN ESTÉTICO */}
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-neutral-700 border-2 border-dashed border-neutral-500 text-neutral-300 cursor-pointer hover:bg-neutral-600 hover:border-rose-300 transition-all"
                  >
                    <span className="text-sm truncate">
                      {form.image ? form.image.name : "Subir imagen"}
                    </span>
                  </label>
                </div>

                {editingId && (
                  <label className="flex items-center gap-2 text-sm text-neutral-300">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      className="accent-rose-300"
                    />
                    Producto activo
                  </label>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    disabled={loading}
                    className="flex-1 py-3 rounded-full bg-rose-300 text-neutral-950 font-semibold hover:bg-rose-400 transition"
                  >
                    {loading ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-3 rounded-full bg-neutral-700 text-neutral-200 transition"
                    >
                      X
                    </button>
                  )}
                </div>
              </form>
            </div>

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
                      <span className="text-neutral-500">Total Ingreso: {p.initial_stock || 0}</span>
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