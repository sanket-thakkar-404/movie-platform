import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, Clock } from "lucide-react";
import { Movie, posterUrl } from "@/lib/tmdb";
import { useAuth } from "../features/auth/useAuth.js"
import { isFavorite, toggleFavorite, isWatchLater, toggleWatchLater } from "@/lib/store";
import { toast } from "sonner";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { user } = useAuth();
  const title = movie.title || movie.name || "Untitled";
const poster = posterUrl(movie.poster_path , "w500");
  const mediaType =
  movie.media_type ||
  (movie.first_air_date ? "tv" : "movie");
  const rating = movie.vote_average?.toFixed(1);

  const [fav, setFav] = useState(() => user ? isFavorite(user.id, movie.id) : false);
  const [wl, setWl] = useState(() => user ? isWatchLater(user.id, movie.id) : false);

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return toast.error("Please login first");
    const added = toggleFavorite(user.id, movie);
    setFav(added);
    toast.success(added ? "Added to favorites" : "Removed from favorites");
  };

  const handleWL = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return toast.error("Please login first");
    const added = toggleWatchLater(user.id, movie);
    setWl(added);
    toast.success(added ? "Added to watch later" : "Removed from watch later");
  };

  return (
    <Link to={`/${mediaType}/${movie.id}`} className="flex-shrink-0 w-[160px] sm:w-[200px] group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative rounded-lg overflow-hidden"
      >
        {poster ? (
          <img src={poster} alt={title} className="w-full aspect-[2/3] object-cover" loading="lazy" />
        ) : (
          <div className="w-full aspect-[2/3] bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No Poster</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleFav} className="p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
            <Heart className={`w-3.5 h-3.5 ${fav ? "fill-destructive text-destructive" : "text-foreground/70"}`} />
          </button>
          <button onClick={handleWL} className="p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
            <Clock className={`w-3.5 h-3.5 ${wl ? "fill-primary text-primary" : "text-foreground/70"}`} />
          </button>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <div>
            <p className="text-foreground text-sm font-semibold line-clamp-2">{title}</p>
            {rating && (
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 fill-cinema-gold text-cinema-gold" />
                <span className="text-cinema-gold text-xs font-medium">{rating}</span>
              </div>
            )}
          </div>
        </div>

        {/* Rating badge */}
        {rating && Number(rating) > 0 && (
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-1.5 py-0.5 flex items-center gap-1">
            <Star className="w-3 h-3 fill-cinema-gold text-cinema-gold" />
            <span className="text-cinema-gold text-xs font-bold">{rating}</span>
          </div>
        )}
      </motion.div>
      <p className="mt-2 text-sm text-foreground/80 truncate">{title}</p>
    </Link>
  );
};

export default MovieCard;
