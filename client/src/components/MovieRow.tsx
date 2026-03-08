import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "@/lib/tmdb";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
}

const MovieRow = ({ title, movies, isLoading }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const amount = direction === "left" ? -600 : 600;
      rowRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-10 mt-20">
      <h2 className="text-2xl sm:text-3xl font-display text-foreground mb-4 px-4 sm:px-8">
        {title}
      </h2>
      <div className="relative group/row">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-8 z-10 w-10 bg-gradient-to-r from-background to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div
          ref={rowRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-8"
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-8 z-10 w-10 bg-gradient-to-l from-background to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </section>
  );
};

export default MovieRow;
