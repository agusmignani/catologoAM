import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
    is_admin: false,
  });

  const API = "http://127.0.0.1:8000";

  const loadUsers = async () => {
    const res = await fetch(`${API}/auth`);
    setUsers(await res.json());
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

    const fd = new FormData();
    fd.append("username", form.username);
    fd.append("is_admin", form.is_admin);

    if (!editingId) fd.append("password", form.password);

    const url = editingId
      ? `${API}/auth/${editingId}`
      : `${API}/auth`;

    const method = editingId ? "PUT" : "POST";

    await fetch(url, { method, body: fd });

    resetForm();
    loadUsers();
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
    <div className="min-h-screen flex justify-center py-12 px-4">
      <div className="w-full max-w-3xl">

        <h1 className="text-2xl font-bold text-rose-300 mb-8 text-center">
          Administración de Usuarios
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* FORM */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg text-rose-300 mb-4">
              {editingId ? "Editar usuario" : "Nuevo usuario"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <input
                placeholder="Username"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
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
                  className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
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
                />
                Administrador
              </label>

              <button className="py-3 rounded-full bg-rose-300 text-neutral-950 font-semibold">
                Guardar
              </button>

            </form>
          </div>

          {/* LISTA */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg text-rose-300 mb-4">Usuarios</h2>

            <div className="flex flex-col gap-3">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="flex justify-between items-center border border-neutral-800 rounded-xl p-3"
                >
                  <div>
                    <p className="font-semibold">{u.username}</p>
                    <p className="text-xs text-neutral-400">
                      {u.is_admin ? "Administrador" : "Usuario"}
                    </p>
                  </div>

                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => editUser(u)}
                      className="text-rose-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="text-red-400"
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
