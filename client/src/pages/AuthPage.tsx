import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../features/auth/useAuth.js";
import { toast } from "sonner";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData , setFormData] = useState({
    email :"",
    name:"",
    password : ""
  })
  const [showPw, setShowPw] = useState(false);
  const {login,register} = useAuth()
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const {name ,value} = e.target

    setFormData((prev)=> ({
      ...prev,
      [name] : value
    }))
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (isLogin) {

      const res = await login(formData);

      if (res.success) {
        toast.success("Welcome back!");
        navigate("/");
      } else {
        toast.error(res.message || "Login failed");
      }

    } else {

      if (!formData.name.trim()) {
        return toast.error("Name is required");
      }

      const res = await register(formData);

      if (res.success) {
        toast.success("Account created successfully");
        navigate("/");
      } else {
        toast.error(res.message || "Registration failed");
      }

    }

  } catch (error) {

    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Something went wrong. Please try again."
    );

  }
};

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Film className="w-10 h-10 text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-display text-gradient-brand tracking-wider">FilmoraX</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-surface rounded-xl p-6 space-y-4 border border-border/50">
          {!isLogin && (
            <div>
              <label className="block text-sm text-foreground/70 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                name="name"
                onChange={handleChange}
                className="w-full bg-secondary text-foreground px-4 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-primary text-sm"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-foreground/70 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-secondary text-foreground px-4 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-primary text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-foreground/70 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                minLength={6}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-secondary text-foreground px-4 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-primary text-sm pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-lg font-semibold text-sm transition-colors"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthPage;
