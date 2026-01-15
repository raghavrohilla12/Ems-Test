import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [editing, setEditing] = useState(null); // user object or null

  const load = async () => {
    const res = await api.get("/api/users/view/list");
    setUsers(res.data || []);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s) ||
        u.role?.toLowerCase().includes(s)
    );
  }, [users, q]);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/users/admin/create", form);
      toast.success("User created ✅");
      setForm({ name: "", email: "", password: "", role: "user" });
      await load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Create failed");
    }
  };

  const startEdit = (u) => {
    setEditing(u);
  };

  const saveEdit = async () => {
    try {
      await api.put(`/api/users/admin/edit/${editing._id}`, {
        name: editing.name,
        role: editing.role,
        profileImage: editing.profileImage || "",
      });
      toast.success("User updated ✅");
      setEditing(null);
      await load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  const del = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await api.delete(`/api/users/admin/delete/${id}`);
      toast.success("User deleted ✅");
      await load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-soft">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Create User</h5>
              <form onSubmit={createUser} className="vstack gap-3">
                <input
                  className="form-control"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <input
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <select
                  className="form-select"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="user">user</option>
                  <option value="view">view</option>
                </select>

                <button className="btn btn-dark">
                  <i className="bi bi-plus-circle me-1"></i>Create
                </button>
              </form>
              <div className="small text-muted mt-3">
                Admin cannot create another admin (backend rule).
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold mb-0">Users</h5>
            <input
              className="form-control"
              style={{ maxWidth: 260 }}
              placeholder="Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="card shadow-soft">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th style={{ width: 140 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u._id}>
                      <td className="fw-semibold">{u.name}</td>
                      <td className="text-muted">{u.email}</td>
                      <td>
                        <span className="badge text-bg-light border">{u.role}</span>
                      </td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => startEdit(u)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => del(u._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!filtered.length && (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edit Modal */}
          {editing && (
            <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,.35)" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ borderRadius: 16 }}>
                  <div className="modal-header">
                    <h5 className="modal-title fw-bold">Edit User</h5>
                    <button className="btn-close" onClick={() => setEditing(null)} />
                  </div>
                  <div className="modal-body vstack gap-3">
                    <input
                      className="form-control"
                      value={editing.name}
                      onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    />
                    <select
                      className="form-select"
                      value={editing.role}
                      onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                    >
                      <option value="user">user</option>
                      <option value="view">view</option>
                      <option value="admin">admin</option>
                    </select>
                    <input
                      className="form-control"
                      placeholder="Profile image URL"
                      value={editing.profileImage || ""}
                      onChange={(e) => setEditing({ ...editing, profileImage: e.target.value })}
                    />
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-outline-secondary" onClick={() => setEditing(null)}>
                      Cancel
                    </button>
                    <button className="btn btn-dark" onClick={saveEdit}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
