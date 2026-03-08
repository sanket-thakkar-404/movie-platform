import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import SkeletonCard from "@/components/SkeletonCard";
import { searchMulti } from "@/lib/tmdb";
import { useDebounce, useInfiniteScroll } from "@/hooks/use-debounce";
import { Search as SearchIcon } from "lucide-react";
import {useMovies} from "../features/movies/useMovies.js"

const SearchPage = () => {

  const {trending , getTrending} = useMovies()
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 400);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(
    async (q: string, p: number, append = false) => {
      setLoading(true);
      try {
        const res = q.trim()
          ? await searchMulti(q, p)
          : await getTrending(p);
        const filtered = res.data.results.filter(
          (m) => m.media_type !== "person"
        );
        setMovies((prev) => (append ? [...prev, ...filtered] : filtered));
        setTotalPages(res.data.total_pages);
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    },
    []
  );


  useEffect(() => {
    setPage(1);
    fetchResults(debouncedQuery, 1);
  }, [debouncedQuery, fetchResults]);

  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) {
      const next = page + 1;
      setPage(next);
      fetchResults(debouncedQuery, next, true);
    }
  }, [loading, page, totalPages, debouncedQuery, fetchResults]);

  useInfiniteScroll(loadMore, page < totalPages);

  useEffect(() => {
  if (!debouncedQuery.trim() && trending?.length) {
    setMovies(trending);
  }
}, [trending, debouncedQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="relative mb-8">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies, TV shows..."
            className="w-full bg-secondary text-foreground text-lg px-12 py-4 rounded-xl outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
          />
        </div>

        <h2 className="text-2xl font-display text-foreground mb-6">
          {debouncedQuery.trim() ? `Results for "${debouncedQuery}"` : "Trending"}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={`${movie.id}-${movie.media_type}`} movie={movie} />
          ))}
          {loading &&
            Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}
        </div>

        {!loading && movies.length === 0 && debouncedQuery.trim() && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No results found for "{debouncedQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
