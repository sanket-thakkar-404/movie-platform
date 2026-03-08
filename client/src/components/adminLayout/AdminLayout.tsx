import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth.js";
import { LayoutDashboard, Film, Users, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Movies", icon: Film, path: "/admin/movies" },
  { label: "Users", icon: Users, path: "/admin/users" },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

 const isActive = (path: string) => {
  if (path === "/admin") {
    return location.pathname === "/admin";
  }

  return location.pathname.startsWith(path);
};

  const pageTitle =
    location.pathname === "/admin"
      ? "Dashboard"
      : location.pathname.split("/")[2]?.toUpperCase() || "Dashboard";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      
      {/* Sidebar */}
      <aside className={`fixed lg:static w-64 bg-card border-r h-screen flex flex-col transition-transform duration-300 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b">
          <div className="w-8 h-8  rounded-md flex items-center justify-center">
            <Film className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-display text-gradient-brand tracking-wider">FilmoraX</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
              ${
                isActive(item.path)
                  ? "bg-primary text-white"
                  : "hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t px-4 py-4">
          <div className="mb-3">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/auth");
            }}
            className="flex items-center gap-2 text-destructive hover:bg-destructive/10 w-full px-3 py-2 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex flex-col flex-1 h-screen">

        {/* Header */}
        <header className="flex items-center gap-4 px-6 py-3 border-b bg-background sticky top-0 z-20">
          <button
            className="lg:hidden p-2 hover:bg-muted rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <h1 className="text-lg font-semibold">{pageTitle}</h1>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 py-6 overflow-y-auto no-scrollbar">
          <div className="max-w-7xl mx-auto w-full ">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;