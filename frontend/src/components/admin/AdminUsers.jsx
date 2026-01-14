import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
    is_admin: false,
  });

  const API = "http://127.0.0.1:8000";

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
    localStorage.removeItem("is_admin");

    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";

    window.location.href = "/login";
  };

  const loadUsers = async () => {
    const res = await fetch(`${API}/auth`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const resetForm = () => {
    setForm({ username: "", password: "", is_admin: false });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("username", form.username);
    fd.append("is_admin", form.is_admin);

    if (!editingId) {
      fd.append("password", form.password);
    }

    const url = editingId
      ? `${API}/auth/${editingId}`
      : `${API}/auth`;

    const method = editingId ? "PUT" : "POST";

    await fetch(url, { method, body: fd });

    resetForm();
    loadUsers();
    setLoading(false);
  };

  const editUser = (u) => {
    setEditingId(u.id);
    setForm({
      username: u.username,
      password: "",
      is_admin: u.is_admin,
    });
  };

  const deleteUser = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return;
    await fetch(`${API}/auth/${id}`, { method: "DELETE" });
    loadUsers();
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-200 font-sans">

      {/* SIDEBAR */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col fixed h-full">
        <h2 className="text-2xl font-semibold text-rose-300 mb-8">
          Admin Panel
        </h2>

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

        <button
          onClick={logout}
          className="mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded transition"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">

          <h1 className="mb-10 text-3xl font-black uppercase tracking-widest text-rose-300 text-center">
            USUARIOS
          </h1>

          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* FORMULARIO */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-rose-300 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-300 rounded-full"></span>
                {editingId ? "Editar usuario" : "Nuevo usuario"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <input
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  required
                />

                {!editingId && (
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                    required
                  />
                )}

                <label className="flex items-center gap-2 text-sm text-neutral-300">
                  <input
                    type="checkbox"
                    checked={form.is_admin}
                    onChange={(e) =>
                      setForm({ ...form, is_admin: e.target.checked })
                    }
                    className="accent-rose-300"
                  />
                  Administrador
                </label>

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
                      className="px-4 py-3 rounded-full bg-neutral-700 text-neutral-200"
                    >
                      X
                    </button>
                  )}
                </div>

              </form>
            </div>

            {/* LISTA DE USUARIOS */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl h-fit">
              <h2 className="text-lg font-semibold text-rose-300 mb-6 flex justify-between items-center">
                <span>Usuarios registrados</span>
                <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">
                  {users.length} usuarios
                </span>
              </h2>

              <div
                className="flex flex-col gap-3 overflow-y-auto pr-2"
                style={{
                  maxHeight: "540px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#262626 transparent",
                }}
              >
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="flex justify-between items-center border border-neutral-800 rounded-xl p-3 bg-neutral-950/50 hover:border-rose-300 transition"
                  >
                    <div>
                      <p className="font-bold text-neutral-100">{u.username}</p>
                      <p className="text-xs text-neutral-400">
                        {u.is_admin ? "Administrador" : "Usuario"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 text-xs font-bold uppercase text-right">
                      <button
                        onClick={() => editUser(u)}
                        className="text-rose-300 hover:text-rose-100"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="text-red-500 hover:text-red-400"
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
      </main>

    </div>
  );
}
