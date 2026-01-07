import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

export default function AdminSales() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [saleType, setSaleType] = useState("individual");

  const [hasPackaging, setHasPackaging] = useState(false);
  const [packagingPrice, setPackagingPrice] = useState(0);

  /* =========================
     CARGA DE PRODUCTOS
  ========================= */
  useEffect(() => {
    fetch(`${API}/products`)
      .then(res => res.json())
      .then(data => setProducts(data.filter(p => p.is_active)));
  }, []);

  const selectedProduct = products.find(p => p.id == productId);

  useEffect(() => {
    if (selectedProduct) {
      setPrice(selectedProduct.price);
    }
  }, [productId]);

  /* =========================
     AGREGAR AL CARRITO
  ========================= */
  const addToCart = () => {
    if (!selectedProduct || quantity <= 0) return;

    setCart([
      ...cart,
      {
        product_id: selectedProduct.id,
        name: selectedProduct.name,
        quantity,
        unit_price: price,
        sale_type: saleType,
        has_packaging: hasPackaging,
        packaging_price: hasPackaging ? packagingPrice : 0
      }
    ]);

    // reset
    setQuantity(1);
    setHasPackaging(false);
    setPackagingPrice(0);
  };

  /* =========================
     ELIMINAR ITEM
  ========================= */
  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  /* =========================
     TOTAL
  ========================= */
  const total = cart.reduce(
    (acc, item) =>
      acc +
      item.quantity * item.unit_price +
      (item.has_packaging ? item.packaging_price : 0),
    0
  );

  /* =========================
     ENVIAR VENTA
  ========================= */
  const submitSale = async () => {
  if (cart.length === 0) return;

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/sales/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
        items: cart.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            sale_type: item.sale_type,
            has_packaging: item.has_packaging,
            packaging_price: item.packaging_price
        }))
    })
  });

  if (res.ok) {
    alert("Venta registrada correctamente");
    setCart([]);
  } else {
    const error = await res.json();
    console.error(error);
    alert("Error al registrar la venta");
  }
};

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">

      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">

        <h2 className="text-xl font-semibold text-rose-300 text-center">
          Nueva venta
        </h2>

        {/* PRODUCTO */}
        <select
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
          value={productId}
          onChange={e => setProductId(e.target.value)}
        >
          <option value="">Seleccionar producto</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* CANTIDAD */}
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
          placeholder="Cantidad"
        />

        {/* PRECIO EDITABLE */}
        <input
          type="number"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
          placeholder="Precio unitario"
        />

        {/* TIPO DE VENTA */}
        <select
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
          value={saleType}
          onChange={e => setSaleType(e.target.value)}
        >
          <option value="individual">Venta individual</option>
          <option value="combo">Combo / Descuento</option>
        </select>

        {/* PACKAGING */}
        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <input
            type="checkbox"
            checked={hasPackaging}
            onChange={e => {
              setHasPackaging(e.target.checked);
              if (!e.target.checked) setPackagingPrice(0);
            }}
          />
          Sumar packaging
        </label>

        {hasPackaging && (
          <input
            type="number"
            value={packagingPrice}
            onChange={e => setPackagingPrice(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
            placeholder="Precio packaging"
          />
        )}

        <button
          onClick={addToCart}
          className="w-full py-3 rounded-full bg-rose-300 text-neutral-950 font-semibold"
        >
          Agregar a la venta
        </button>

        {/* =========================
            RESUMEN
        ========================= */}
        {cart.length > 0 && (
          <div className="border-t border-neutral-800 pt-4 space-y-2">

            {cart.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm text-neutral-200"
              >
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>
                  $
                  {item.quantity * item.unit_price +
                    (item.has_packaging ? item.packaging_price : 0)}
                </span>
                <button
                  onClick={() => removeItem(i)}
                  className="text-red-400"
                >
                  ✕
                </button>
              </div>
            ))}

            <p className="font-semibold text-lg text-right text-neutral-100">
              Total: ${total}
            </p>

            <button
              onClick={submitSale}
              className="w-full py-3 rounded-full bg-green-400 text-neutral-950 font-semibold"
            >
              Confirmar venta
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
