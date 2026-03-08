import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";
import FavoritesPage from "./pages/FavoritesPage";
import WatchLaterPage from "./pages/WatchLaterPage";
import NotFound from "./pages/NotFound";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import MovieFormPage from "./pages/admin/MovieFormPage";
import UsersPage from "./pages/admin/UsersPage";
import AdminLayout from "./components/adminLayout/AdminLayout";
import MoviePage from "./pages/admin/MoviePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/movies" element={<SearchPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/watchlater" element={<WatchLaterPage />} />
            <Route path="/:type/:id" element={<DetailPage />} />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminDashboard />} />

                <Route path="movies" element={<MoviePage />} />

                <Route path="movies/add/" element={<MovieFormPage />} />
                <Route path="movies/edit/:id" element={<MovieFormPage />} />

                <Route path="users" element={<UsersPage />} />
              </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>
);

export default App;
