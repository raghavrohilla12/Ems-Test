import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

export default function UsersList() {
  const { token } = useAuth(); // ✅ assuming AuthContext provides token
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = token || localStorage.getItem("token"); // ✅ fallback

    axios
      .get("http://localhost:5000/api/users/view/list", {
        headers: { Authorization: `Bearer ${t}` },
      })
      .then((res) => setUsers(res.data))
      .catch((e) => setErr(e?.response?.data?.message || "Failed to load users"))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h3 className="mb-0">All Users</h3>
          <small className="text-muted">Admin users are hidden</small>
        </div>
        <span className="badge text-bg-light border">{users.length} users</span>
      </div>

      {err && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          <div>{err}</div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />
          <div className="text-muted mt-2">Loading users...</div>
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: 70 }}>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th style={{ width: 120 }}>Role</th>
                  <th style={{ width: 90 }}>Image</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((u, idx) => (
                    <tr key={u._id}>
                      <td className="text-muted">{idx + 1}</td>
                      <td className="fw-semibold">{u.name}</td>
                      <td className="text-muted">{u.email}</td>
                      <td>
                        <span
                          className={`badge ${
                            u.role === "view" ? "text-bg-secondary" : "text-bg-primary"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td>
                        {u.profileImage ? (
                          <img
                            src={u.profileImage}
                            alt={u.name}
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
