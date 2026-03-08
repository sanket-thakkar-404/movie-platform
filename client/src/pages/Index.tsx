import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import {useMovies} from "../features/movies/useMovies.js"

const Index = () => {

    const {
  getTrending,
  getPopular,
  getTopRated,
  getNowPlaying,
  getTVPopular,
  trending,
  popular,
  topRated,
  nowPlaying,
  tvPopular,
  loading
} = useMovies()


  useEffect(()=>{
    getTrending()
    getPopular()
    getTVPopular()
    getTopRated()
    getNowPlaying()
  },[])

  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroBanner />
        <div className="relative z-10 -mt-16 sm:-mt-24 pb-16">
          <MovieRow
            title="🔥 Trending This Week"
            movies={trending || []}
            isLoading={trending.isLoading}
          />
          <MovieRow
            title="🎬 Now Playing"
            movies={nowPlaying || []}
            isLoading={nowPlaying.isLoading}
          />
          <MovieRow
            title="⭐ Top Rated"
            movies={topRated || []}
            isLoading={topRated.isLoading}
          />
          <MovieRow
            title="🍿 Popular Movies"
            movies={popular || []}
            isLoading={popular.isLoading}
          />
          <MovieRow
            title="📺 Popular TV Shows"
            movies={tvPopular || []}
            isLoading={tvPopular.isLoading}
          />
        </div>
    </div>
  );
};

export default Index;
