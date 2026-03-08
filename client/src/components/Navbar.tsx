import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Film, X, Heart, Clock, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {useAuth} from "../features/auth/useAuth.js"

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {user , logout} = useAuth()
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Film className="w-7 h-7 text-primary" />
          <span className="text-2xl font-display text-gradient-brand tracking-wider">
            FilmoraX
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
         <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm transition-colors ${
                isActive ? "text-white font-semibold" : "text-foreground/70 hover:text-foreground"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `text-sm transition-colors ${
                isActive ? "text-white font-semibold" : "text-foreground/70 hover:text-foreground"
              }`
            }
          >
            Movies
          </NavLink>
          {user && (
            <>
             <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `text-sm flex items-center gap-1 transition-colors ${
                    isActive ? "text-white font-semibold" : "text-foreground/70 hover:text-foreground"
                  }`
                }
              >
                <Heart className="w-4 h-4" /> Favorites
              </NavLink>
              <NavLink
                to="/watchlater"
                className={({ isActive }) =>
                  `text-sm flex items-center gap-1 transition-colors ${
                    isActive ? "text-white font-semibold" : "text-foreground/70 hover:text-foreground"
                  }`
                }
              >
                <Clock className="w-4 h-4" /> Watch Later
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {searchOpen && (
              <motion.form
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSearch}
                className="overflow-hidden"
              >
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies, shows..."
                  className="w-full bg-secondary text-foreground text-sm px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                />
              </motion.form>
            )}
          </AnimatePresence>
          {/* <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button> */}

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-xs text-muted-foreground">{user.name}</span>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="p-2 text-foreground/70 hover:text-destructive transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-1 text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors"
            >
              <User className="w-4 h-4" /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
