import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-shield-lock me-2"></i>EMS
        </Link>

        {user && (
          <div className="d-flex align-items-center gap-2">
            <span className="badge text-bg-light border">
              {user.role.toUpperCase()}
            </span>

            <Link className="btn btn-outline-dark btn-sm" to="/profile">
              <i className="bi bi-person me-1"></i>Profile
            </Link>

            {/* {user.role === "admin" && (
              <Link className="btn btn-dark btn-sm" to="/admin/users">
                <i className="bi bi-people me-1"></i>Users
              </Link>
            )} */}
            <Link
  className={`btn btn-sm ${user.role === "admin" ? "btn-dark" : "btn-outline-dark"}`}
  to={user.role === "admin" ? "/admin/users" : "/users"}
>
  <i className="bi bi-people me-1"></i>Users
</Link>


            <button onClick={onLogout} className="btn btn-outline-danger btn-sm">
              <i className="bi bi-box-arrow-right me-1"></i>Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
