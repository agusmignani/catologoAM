import { useEffect, useState } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    cost_price: "",
    price: "",
    stock: "",
    image: null,
    is_active: true,
  });

  const API = "http://127.0.0.1:8000";

  // 🔄 cargar productos
  const loadProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // 🧹 reset form
  const resetForm = () => {
    setForm({
      name: "",
      cost_price: "",
      price: "",
      stock: "",
      image: null,
      is_active: true,
    });
    setEditingId(null);
  };

  // 📤 crear / editar
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("cost_price", form.cost_price);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("is_active", form.is_active);

    if (form.image) {
      formData.append("image", form.image);
    }

    const url = editingId
      ? `${API}/products/${editingId}`
      : `${API}/products`;

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

  // ✏️ editar
  const editProduct = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      cost_price: p.cost_price,
      price: p.price,
      stock: p.stock,
      image: null,
      is_active: p.is_active,
    });
  };

  // ❌ eliminar
  const deleteProduct = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;

    await fetch(`${API}/products/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  };

  // 🚫 activar / desactivar (USA LA RUTA /toggle)
  const toggleActive = async (p) => {
    await fetch(`${API}/products/${p.id}/toggle`, {
      method: "PATCH",
    });

    loadProducts();
  };

return (
  <div className="min-h-screen flex justify-center items-start py-12 px-4">
    <div className="w-full max-w-5xl">

      <h1 className="text-2xl font-bold text-rose-300 mb-8 text-center">
        Panel de Productos
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* 📝 FORM */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-rose-300 mb-4">
            {editingId ? "Editar producto" : "Nuevo producto"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input
              placeholder="Nombre"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
              required
            />

            <input
              type="number"
              placeholder="Precio de costo"
              value={form.cost_price}
              onChange={(e) =>
                setForm({ ...form, cost_price: e.target.value })
              }
              className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
              required
            />

            <input
              type="number"
              placeholder="Precio"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
              className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
              required
            />

            {/* 📸 imagen */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
              className="text-sm text-neutral-300"
            />

            {editingId && (
              <label className="flex items-center gap-2 text-sm text-neutral-300">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      is_active: e.target.checked,
                    })
                  }
                />
                Producto activo
              </label>
            )}

            <div className="flex gap-2 pt-2">
              <button
                disabled={loading}
                className="flex-1 py-3 rounded-full bg-rose-300 text-neutral-950 font-semibold hover:bg-rose-400 transition"
              >
                {loading
                  ? "Guardando..."
                  : editingId
                  ? "Actualizar"
                  : "Crear"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-3 rounded-full bg-neutral-700 text-neutral-200 hover:bg-neutral-600 transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* 📦 LISTA */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-rose-300 mb-4">
            Productos
          </h2>

          <div className="flex flex-col gap-4 max-h-[520px] overflow-y-auto pr-2">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 border border-neutral-800 rounded-xl p-3 hover:border-rose-300 transition"
              >
                <img
                  src={`${API}${p.image_url}`}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <p className="font-semibold text-neutral-100">
                    {p.name}
                  </p>
                  <p className="text-sm text-neutral-400">
                    Costo: ${p.cost_price} · Venta: ${p.price} · Stock: {p.stock}
                  </p>
                  {!p.is_active && (
                    <p className="text-xs text-red-400">
                      Desactivado
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1 text-right text-xs">
                  <button
                    onClick={() => editProduct(p)}
                    className="text-rose-300 hover:underline"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => toggleActive(p)}
                    className="text-yellow-400 hover:underline"
                  >
                    {p.is_active
                      ? "Desactivar"
                      : "Activar"}
                  </button>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-400 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>
);
}
