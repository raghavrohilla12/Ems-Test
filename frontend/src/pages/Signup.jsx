import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signup() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // user or view
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      toast.success("Signup successful! Please login.");
      nav("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h3 className="mb-1">Create account</h3>
          <p className="text-muted mb-4">Signup as User or View</p>

          <form onSubmit={onSubmit} className="d-grid gap-3">
            <div>
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="john@gmail.com"
                required
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="John@123"
                required
              />
              <div className="form-text">
                Use a strong password (example: John@123)
              </div>
            </div>

            <div>
              <label className="form-label">Role</label>
              <select
                className="form-select"
                name="role"
                value={form.role}
                onChange={onChange}
              >
                <option value="user">user</option>
                <option value="view">view</option>
              </select>
              <div className="form-text text-muted">
                Admin signup is not allowed.
              </div>
            </div>

            <button className="btn btn-dark" disabled={loading}>
              {loading ? "Creating..." : "Signup"}
            </button>

            <div className="text-center">
              <small className="text-muted">
                Already have an account? <Link to="/login">Login</Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
