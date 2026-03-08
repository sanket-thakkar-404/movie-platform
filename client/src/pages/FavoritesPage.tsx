import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { useAuth } from "../features/auth/useAuth.js";
import { useFavorite } from "../features/Favorites/useFavorites.js";

const FavoritesPage = () => {

  const { user } = useAuth();

  const { favorite, getFavorite, loading } = useFavorite();

  useEffect(() => {

    if (user) {
      getFavorite();
    }

  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 px-4 sm:px-8 max-w-7xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <h1 className="text-3xl font-display text-foreground flex items-center gap-3 mb-8">
            <Heart className="w-7 h-7 text-destructive fill-destructive" />
            My Favorites
          </h1>

          {!user ? (

            <p className="text-muted-foreground">
              Please login to see your favorites.
            </p>

          ) : loading ? (

            <p className="text-muted-foreground">
              Loading favorites...
            </p>

          ) : favorite?.length === 0 ? (

            <p className="text-muted-foreground">
              No favorites yet. Start adding movies you love!
            </p>

          ) : (

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

             {favorite.map((movie) => {
                return (
                  <MovieCard
                key={movie.tmdbId}
                movie={{
                  ...movie,
                  id: movie.tmdbId,
                  poster_path: movie.poster_path,
                  media_type: movie.mediaType
                }}
              />
                )
              })}
            </div>

          )}

        </motion.div>

      </div>
    </div>
  );
};

export default FavoritesPage;