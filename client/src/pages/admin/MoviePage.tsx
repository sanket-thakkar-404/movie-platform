import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../../features/movies/useMovies";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

const MoviesPage = () => {
  const { trending, getTrending } = useMovies();
  const navigate = useNavigate();

  useEffect(() => {
    getTrending();
  }, [getTrending]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between overflow-hidden">
        <div>
          <h2 className="text-2xl font-bold">Movies</h2>
          <p className="text-sm text-muted-foreground">
            {trending.length} movies in library
          </p>
        </div>

        <Button onClick={() => navigate("/admin/movies/add")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Movie
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card border rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-muted/40 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Poster</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Release Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>

              {trending.map((movie) => {

                const poster = movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "/placeholder.svg";

                const title =
                  movie.title || movie.original_title || movie.name;

                const release =
                  movie.release_date || movie.first_air_date;

                return (
                  <tr
                    key={movie.id}
                    className="border-b hover:bg-muted/30 transition"
                  >

                    {/* Poster */}
                    <td className="px-4 py-3">
                      <img
                        src={poster}
                        alt={title}
                        className="w-10 h-14 rounded-md object-cover"
                      />
                    </td>

                    {/* Title */}
                    <td className="px-4 py-3">
                      <p className="font-medium">{title}</p>
                    </td>

                    {/* Release */}
                    <td className="px-4 py-3 text-muted-foreground">
                      {release
                        ? new Date(release).toLocaleDateString()
                        : "Unknown"}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            navigate(`/admin/movies/edit/${movie.id}`)
                          }
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>

                      </div>
                    </td>

                  </tr>
                );
              })}

              {trending.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No movies found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default MoviesPage;