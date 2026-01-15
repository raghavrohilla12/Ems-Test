import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user, reload } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [saving, setSaving] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/api/users/me", { name, profileImage });
      toast.success("Profile updated ✅");
      await reload();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-soft">
            <div className="card-body text-center p-4">
              <img
                src={profileImage || "https://i.pravatar.cc/180?img=3"}
                alt="profile"
                className="rounded-circle border"
                style={{ width: 120, height: 120, objectFit: "cover" }}
              />
              <h5 className="fw-bold mt-3 mb-0">{user?.name}</h5>
              <div className="text-muted">{user?.email}</div>
              <span className="badge text-bg-light border mt-2">
                {user?.role?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-soft">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Edit Profile</h5>

              <form onSubmit={save} className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Profile Image URL</label>
                  <input
                    className="form-control"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className="col-12">
                  <button className="btn btn-dark" disabled={saving}>
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>

              <div className="small text-muted mt-3">
                Note: Image upload not implemented (URL only). If you want upload feature, tell me.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
