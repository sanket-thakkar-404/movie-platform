import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Star, Clock, Calendar, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import MovieRow from "@/components/MovieRow";
import TrailerModal from "@/components/TrailerModal";
import { getMovieDetails, getTVDetails, backdropUrl, posterUrl, MovieDetails } from "@/lib/tmdb";
import { toast } from "sonner";
import { useFavorite } from "../features/Favorites/useFavorites.js"
import { useAuth } from "../features/auth/useAuth.js"
import{ useWatchLater } from "../features/watchLater/useWatchLater.js"

const DetailPage = () => {

  const { id, type } = useParams<{ id: string; type: string }>();
  const { user } = useAuth();
  const {favorite , addToFavorite,removeFavorite,getFavorite} = useFavorite()
  const { watchLater , addToWatchLater, getWatchLater, removeWatchLater } = useWatchLater()

  useEffect(()=>{
        getFavorite()
        getWatchLater()
   },[])

  const [movieData ,setMovieData] = useState({
    tmdbId:id,
    title: "",
    posterPath: "", 
    releaseDate:"",
    videoUrl :"",
    mediaType: type
  })
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const { data: movie, isLoading } = useQuery({
    queryKey: ["detail", type, id],
    queryFn: () => {
      const fetcher = type === "tv" ? getTVDetails : getMovieDetails;
      return fetcher(Number(id)).then((r) => r.data);
    },
    enabled: !!id,
  });

const handlePlayTrailer = () => {
  const trailer = movie?.videos?.results.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );
    setTrailerKey(trailer.key);
};



useEffect (() => {
  if (!movie) return;

  const trailer = movie?.videos?.results.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );

  if (trailer) {
    setMovieData((prev) => ({
      ...prev,
      videoUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
    }));
  }
}, [movie]);


const handleFavorite = async (data) => {
  if (!user) return toast.error("Please login first")
  const newData = {
    ...movieData,
    tmdbId: data.id,
    title: data.title || data.name,
    poster_path: data.poster_path,
    release_date: data.release_date || data.first_air_date
  }
  const alreadyFavorite = favorite?.some(
    (f) => Number(f.tmdbId) === Number(data.id)
  )
  if (alreadyFavorite) {
    await removeFavorite(data.id)
    toast.success("Removed from favorites")
    return
  }
  await addToFavorite(newData)
  toast.success("Added to favorites")
}

const handlerWatchLater = async (data) =>{
  if (!user) return toast.error("Please login first")
  const newData = {
    ...movieData,
    tmdbId: data.id,
    title: data.title || data.name,
     poster_path: data.poster_path,
    releaseDate: data.release_date || data.first_air_date
  }
  const alreadyWatchLater = watchLater?.some(
    (f) => Number(f.tmdbId) === Number(data.id)
  )
  if (alreadyWatchLater) {
    await removeWatchLater(data.id)
    toast.success("Removed from watch later")
    return
  }
  await addToWatchLater(newData)
  toast.success("Added from watch later")
}

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="w-full h-[60vh] bg-muted animate-shimmer bg-gradient-to-r from-muted via-accent to-muted bg-[length:200%_100%]" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <p className="text-muted-foreground">Movie not found</p>
      </div>
    );
  }

  const title = movie.title || movie.name || "Untitled";
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
  const hasTrailer = movie.videos?.results.some(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Backdrop */}
      <div className="relative w-full h-[60vh] sm:h-[70vh]">
        {movie.backdrop_path ? (
          <img
            src={backdropUrl(movie.backdrop_path)!}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-48 sm:-mt-64 px-4 sm:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-10"
        >
          {/* Poster */}
          <div className="flex-shrink-0 w-48 sm:w-64 mx-auto sm:mx-0">
            {movie.poster_path ? (
              <img
                src={posterUrl(movie.poster_path, "w500")!}
                alt={title}
                className="w-full rounded-xl shadow-2xl"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-muted rounded-xl flex items-center justify-center">
                <span className="text-muted-foreground">No Poster</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 pt-4">
            <h1 className="text-4xl sm:text-5xl font-display text-foreground mb-2">{title}</h1>

            {movie.tagline && (
              <p className="text-muted-foreground italic mb-4">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-cinema-gold text-cinema-gold" />
                  <span className="text-cinema-gold font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </span>
              )}
              {year && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {year}
                </span>
              )}
              {movie.runtime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {movie.runtime} min
                </span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-foreground/80 leading-relaxed mb-6 max-w-2xl">{movie.overview}</p>

            <div className="flex flex-wrap gap-3">
              {hasTrailer && (
                <button
                  onClick={handlePlayTrailer}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Play Trailer
                </button>
              )}
                          <button
                onClick={() => handleFavorite(movie)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-colors
                  ${
                     favorite?.some((w) => Number(w.tmdbId) === Number(movie.id))
                      ? "bg-white text-black"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }
                `}
              >
                <Heart
                  className={`w-4 h-4 ${
                     favorite?.some((w) => Number(w.tmdbId) === Number(movie.id)) ?" text-black" : ""
                  }`}
                />
                    Favorite
                  </button>
              <button
                onClick={() => handlerWatchLater(movie)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-colors
                  ${
                    watchLater?.some((w) => Number(w.tmdbId) === Number(movie.id))
                      ? "bg-white text-black"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }
                `}
              >
                <Clock
                  className={`w-4 h-4 ${
                    watchLater?.some((w) => Number(w.tmdbId) === Number(movie.id))
                      ? "fill-white"
                      : ""
                  }`}
                />
                Watch Later
              </button>
            </div>

            {/* Cast */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-display text-foreground mb-4">Cast</h3>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  {movie.credits.cast.slice(0, 10).map((c) => (
                    <div key={c.id} className="flex-shrink-0 w-20 text-center">
                      {c.profile_path ? (
                        <img
                          src={posterUrl(c.profile_path, "w185")!}
                          alt={c.name}
                          className="w-20 h-20 rounded-full object-cover mx-auto mb-1"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-1" />
                      )}
                      <p className="text-xs text-foreground truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{c.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Similar */}
        {movie.similar?.results && movie.similar.results.length > 0 && (
          <div className="mt-16">
            <MovieRow title="You May Also Like" movies={movie.similar.results} />
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {trailerKey && (
          <TrailerModal videoKey={trailerKey} onClose={() => setTrailerKey(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DetailPage;
