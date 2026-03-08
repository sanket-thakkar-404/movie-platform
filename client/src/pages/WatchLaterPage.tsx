import { useEffect } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import Navbar from "@/components/Navbar"
import MovieCard from "@/components/MovieCard"

import { useAuth } from "../features/auth/useAuth"
import { useWatchLater } from "../features/watchLater/useWatchLater"

const WatchLaterPage = () => {

  const { user } = useAuth()

  const { watchLater, getWatchLater } = useWatchLater()

  useEffect(() => {
    if (user) {
      getWatchLater()
    }
  }, [user])

  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      <div className="pt-24 px-4 sm:px-8 max-w-7xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <h1 className="text-3xl font-display flex items-center gap-3 mb-8">
            <Clock className="w-7 h-7 text-primary" />
            Watch Later
          </h1>

          {!user ? (
            <p className="text-muted-foreground">
              Please login to see your watch later list.
            </p>

          ) : watchLater?.length === 0 ? (

            <p className="text-muted-foreground">
              Nothing saved yet. Add movies to watch later!
            </p>

          ) : (

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

              {watchLater.map((movie) => (
                <MovieCard
                key={movie.tmdbId}
                movie={{
                  ...movie,
                  id: movie.tmdbId,
                  poster_path: movie.poster_path,
                  media_type: movie.mediaType
                }}
              />
              ))}

            </div>

          )}

        </motion.div>

      </div>

    </div>
  )
}

export default WatchLaterPage