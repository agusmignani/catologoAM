import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

export default function AdminSales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [cart, setCart] = useState([]);

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [saleType, setSaleType] = useState("individual");

  const [paymentMethod, setPaymentMethod] = useState("efectivo");

  const [hasPackaging, setHasPackaging] = useState(false);
  const [packagingPrice, setPackagingPrice] = useState("");

  // 🔐 FIX localStorage
  const [token, setToken] = useState(null);

  /* =========================
      AUTH
  ========================= */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      if (!t) {
        window.location.href = "/login";
      } else {
        setToken(t);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  /* =========================
      LOAD DATA
  ========================= */
  useEffect(() => {
    if (!token) return;

    fetch(`${API}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setProducts(data.filter(p => p.is_active)));

    loadSales();
  }, [token]);

  const loadSales = async () => {
    if (!token) return;

    const res = await fetch(`${API}/sales`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setSales(await res.json());
  };

  const selectedProduct = products.find(p => p.id == productId);

  useEffect(() => {
    if (selectedProduct) {
      setPrice(selectedProduct.price);
    }
  }, [productId]);

  /* =========================
      CART
  ========================= */
  const addToCart = () => {
    if (!selectedProduct || quantity <= 0) return;

    setCart([
      ...cart,
      {
        product_id: selectedProduct.id,
        name: selectedProduct.name,
        quantity,
        unit_price: Number(price),
        sale_type: saleType,
        has_packaging: hasPackaging,
        packaging_price: hasPackaging ? Number(packagingPrice) : 0,
      },
    ]);

    setQuantity(1);
    setHasPackaging(false);
    setPackagingPrice("");
    setProductId("");
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce(
    (acc, i) =>
      acc +
      i.quantity * i.unit_price +
      (i.has_packaging ? i.packaging_price : 0),
    0
  );

  /* =========================
      SUBMIT
  ========================= */
  const submitSale = async () => {
    // 1. Obtener el token directamente del storage para evitar problemas de estado asíncrono
    const currentToken = localStorage.getItem("token");
    
    if (!currentToken) {
      alert("Tu sesión ha expirado o no has iniciado sesión.");
      window.location.href = "/login";
      return;
    }

    if (cart.length === 0) return;

    try {
      const res = await fetch(`${API}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentToken}`, // Usamos la variable directa
        },
        body: JSON.stringify({
          payment_method: paymentMethod,
          items: cart.map(i => ({
            product_id: i.product_id,
            quantity: i.quantity,
            unit_price: i.unit_price,
            sale_type: i.sale_type,
            has_packaging: i.has_packaging,
            packaging_price: i.packaging_price,
          })),
        }),
      });

      if (res.status === 401) {
        alert("Sesión inválida. Por favor, reingresa.");
        logout();
        return;
      }

      if (res.ok) {
        setCart([]);
        setPaymentMethod("efectivo");
        loadSales();
        alert("Venta registrada con éxito");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.detail || "No se pudo registrar la venta"}`);
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
};

  const deleteSale = async (id) => {
    if (!confirm("¿Eliminar venta?") || !token) return;

    await fetch(`${API}/sales/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadSales();
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-200 font-sans">

      {/* 🧭 SIDEBAR */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col fixed h-full">
        <h2 className="text-2xl font-semibold text-rose-300 mb-8">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4 text-sm flex-1">
          <a href="/admin" className="p-2 rounded hover:bg-neutral-800 hover:text-rose-300 transition text-neutral-400">
            Dashboard
          </a>
          <a href="/admin/products" className="p-2 rounded hover:bg-neutral-800 hover:text-rose-300 transition text-neutral-400">
            Productos
          </a>
          <a href="/admin/users" className="p-2 rounded hover:bg-neutral-800 hover:text-rose-300 transition text-neutral-400">
            Usuarios
          </a>
          <a href="/admin/sales" className="p-2 rounded bg-neutral-800 text-rose-300 transition font-bold">
            Ventas
          </a>
        </nav>

        <button
          onClick={logout}
          className="mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded transition font-medium"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* 📊 MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <h1 className="text-3xl font-bold text-rose-300 mb-8 text-center uppercase tracking-wider">
            Gestión de Ventas
          </h1>

          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* 📝 FORMULARIO DE VENTA */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-rose-300 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-300 rounded-full"></span>
                Nueva Operación
              </h2>

              <div className="flex flex-col gap-4">
                <select
                  value={productId}
                  onChange={e => setProductId(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300 cursor-pointer"
                >
                  <option value="">Seleccionar producto</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="Cantidad"
                  />
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="Precio Unit."
                  />
                </div>

                <select
                  value={saleType}
                  onChange={e => setSaleType(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300 cursor-pointer"
                >
                  <option value="individual">Venta Individual</option>
                  <option value="combo">Combo / Promoción</option>
                </select>

                <div className="p-4 bg-neutral-950/50 rounded-xl border border-neutral-800">
                  <label className="flex items-center gap-3 text-sm text-neutral-300 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={hasPackaging}
                      onChange={e => setHasPackaging(e.target.checked)}
                      className="w-4 h-4 accent-rose-300"
                    />
                    ¿Sumar Packaging?
                  </label>

                  {hasPackaging && (
                    <input
                      type="number"
                      value={packagingPrice}
                      onChange={e => setPackagingPrice(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-rose-200 text-sm focus:outline-none"
                      placeholder="Precio del empaque"
                    />
                  )}
                </div>

                <button
                  onClick={addToCart}
                  className="py-3 rounded-full bg-neutral-800 text-rose-300 border border-rose-300/30 font-bold hover:bg-rose-300 hover:text-neutral-950 transition-all"
                >
                  + Agregar Item
                </button>

                {/* DETALLE DEL CARRITO + MÉTODO DE PAGO */}
                {cart.length > 0 && (
                  <div className="mt-4 p-4 border border-rose-300/20 bg-rose-300/5 rounded-2xl">
                    <h3 className="text-xs font-bold text-rose-300 uppercase mb-3">Resumen de Venta</h3>
                    <div className="space-y-2 mb-4">
                      {cart.map((i, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-neutral-300">{i.name} x{i.quantity}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-bold">${(i.quantity * i.unit_price) + i.packaging_price}</span>
                            <button onClick={() => removeItem(idx)} className="text-red-500 text-xs">✕</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* NUEVO: SELECTOR DE MÉTODO DE PAGO */}
                    <div className="mb-4">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-2">Método de Pago</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => setPaymentMethod("efectivo")}
                          className={`py-2 rounded-lg text-xs font-bold transition-all border ${paymentMethod === 'efectivo' ? 'bg-rose-300 text-neutral-950 border-rose-300' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}
                        >
                          EFECTIVO
                        </button>
                        <button 
                          onClick={() => setPaymentMethod("transferencia")}
                          className={`py-2 rounded-lg text-xs font-bold transition-all border ${paymentMethod === 'transferencia' ? 'bg-rose-300 text-neutral-950 border-rose-300' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}
                        >
                          TRANSFERENCIA
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-rose-300/20 flex justify-between items-center font-bold">
                      <span>TOTAL</span>
                      <span className="text-xl text-rose-300">${total}</span>
                    </div>
                    <button
                      onClick={submitSale}
                      className="w-full mt-4 py-3 rounded-full bg-rose-300 text-neutral-950 font-black uppercase tracking-widest hover:bg-rose-400 transition-all"
                    >
                      Confirmar Venta
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 📦 HISTORIAL DE VENTAS REGISTRADAS */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl h-fit">
              <h2 className="text-lg font-semibold text-rose-300 mb-6 flex justify-between items-center">
                <span>Ventas Recientes</span>
                <span className="text-[10px] bg-neutral-800 px-2 py-1 rounded text-neutral-400 font-bold uppercase tracking-tighter">
                  {sales.length} operadas
                </span>
              </h2>

              <div
                className="flex flex-col gap-4 overflow-y-auto pr-2"
                style={{
                  maxHeight: "550px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#262626 transparent",
                }}
              >
                {sales.map(s => (
                  <div
                    key={s.id}
                    className="border border-neutral-800 rounded-xl p-4 bg-neutral-950/50 hover:border-rose-300/40 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                          Ticket #{s.id}
                        </span>
                        {/* Mostramos el método de pago en el historial si el backend lo devuelve */}
                        <span className="text-[9px] bg-neutral-800 text-rose-300 px-2 py-0.5 rounded-full w-fit font-bold uppercase">
                          {s.payment_method || "Efectivo"}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteSale(s.id)}
                        className="text-red-900 hover:text-red-500 text-[10px] font-bold uppercase transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="space-y-3 mb-4">
                      {s.items && s.items.map((i, idx) => (
                        <div key={idx} className="flex flex-col border-b border-neutral-800 pb-2 last:border-0">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-neutral-200">
                              {i.product_name || "Producto"}
                            </span>
                            <span className="text-sm font-medium text-neutral-400">
                              ${i.unit_price * i.quantity}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] text-neutral-500 uppercase">
                              Cantidad: {i.quantity} | Unit: ${i.unit_price}
                            </span>
                            {i.has_packaging && (
                              <span className="text-[10px] bg-rose-300/10 text-rose-300 px-1.5 py-0.5 rounded border border-rose-300/20 font-bold">
                                + Packaging (${i.packaging_price})
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-between items-end">
                        <div className="text-[9px] text-neutral-600 uppercase font-bold">
                            Total de Operación
                        </div>
                        <div className="text-lg font-black text-rose-300 leading-none">
                            ${s.total}
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}