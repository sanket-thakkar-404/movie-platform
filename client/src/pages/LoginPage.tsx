import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Film, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [email, setEmail] = useState("admin@moviepanel.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  // const { loading, error } = useSelector((s: RootState) => s.auth);
  // const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(clearError());
  //   const result = await dispatch(login({ email, password }));
  //   if (login.fulfilled.match(result)) {
  //     navigate("/");
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl  mb-4">
           <Film className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-display text-gradient-brand tracking-wider">CINEVERSE Admin</h1>
          <p className="text-muted-foreground mt-1">Sign in to your admin account</p>
        </div>

        <form  className="bg-card border rounded-2xl p-6 shadow-sm space-y-5">
          {/* {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
              {error}
            </div>
          )} */}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@moviepanel.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* <Button type="submit" className="w-full" disabled={loading}> */}
            {/* {loading ? "Signing in..." : "Sign In"} */}
          {/* </Button> */}

          <Button type="submit" className="w-full" >
            {/* {loading ? "Signing in..." : "Sign In"} */}
          </Button>


          <p className="text-xs text-center text-muted-foreground">
            Demo: admin@moviepanel.com / admin123
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
