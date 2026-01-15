import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("Admin@123");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      toast.success("Login success ✅");
      if (data.user?.role === "admin") nav("/admin/users");
      else nav("/users"); // ✅ or "/profile" if you prefer
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-soft">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-1">Welcome back</h3>
              <p className="text-muted mb-4">Login to continue</p>

              <form onSubmit={onSubmit} className="vstack gap-3">
                <div>
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                  />
                </div>

                <button className="btn btn-dark py-2" disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </button>

                <div className="small text-muted">
                  Tip: Create users from Admin dashboard after admin login.
                </div>

                {/* ✅ Signup link */}
                <div className="text-center">
                  <small className="text-muted">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-decoration-none">
                      Signup
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center text-muted small mt-3">
            API: {import.meta.env.VITE_API_URL}
          </div>
        </div>
      </div>
    </div>
  );
}
