import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info } from "lucide-react";
import { backdropUrl } from "@/lib/imageUrl";
import { useMovies } from "@/features/movies/useMovies";

const HeroBanner = () => {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const {trending , getTrending} = useMovies()

  useEffect(() => {
  getTrending();
}, []);

useEffect(() => {
  if (!trending?.length) return;

  const withBackdrop = trending.filter((m) => m.backdrop_path);
  setMovies(withBackdrop.slice(0, 5));
}, [trending]);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const movie = movies[current];

  if (!movie) {
    return (
      <div className="w-full h-[70vh] sm:h-[85vh] bg-muted animate-shimmer bg-gradient-to-r from-muted via-accent to-muted bg-[length:200%_100%]" />
    );
  }

  const title = movie.title || movie.name || "";
  const mediaType = movie.media_type === "tv" ? "tv" : "movie";

  return (
    <div className="relative w-full h-[70vh] sm:h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={backdropUrl(movie.backdrop_path)!}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-16 sm:bottom-24 left-4 sm:left-8 max-w-xl z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-display text-foreground leading-tight mb-3">
              {title}
            </h1>
            <p className="text-foreground/70 text-sm sm:text-base line-clamp-2 mb-6">
              {movie.overview}
            </p>
            <div className="flex gap-3">
              <Link
                to={`/${mediaType}/${movie.id}`}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                <Play className="w-4 h-4" />
                Watch Trailer
              </Link>
              <Link
                to={`/${mediaType}/${movie.id}`}
                className="inline-flex items-center gap-2 bg-secondary hover:bg-accent text-secondary-foreground px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                <Info className="w-4 h-4" />
                More Info
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-primary w-6" : "bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
