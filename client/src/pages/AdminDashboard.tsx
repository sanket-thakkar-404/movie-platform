import { useEffect } from "react";
import { Film, Users, TrendingUp } from "lucide-react";
import { useMovies } from "../features/movies/useMovies";
import {useUsers} from "../features/user/useUser.js"

type StatCardProps = {
  icon: any;
  label: string;
  value: number | string;
  color: string;
};

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => {
  return (
    <div className="bg-card border rounded-xl p-6 flex items-center gap-4 hover:shadow-sm transition">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>

      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { trending, getTrending } = useMovies();
  const{users , getUsers} = useUsers()

  console.log(trending)

  useEffect(() => {
    getTrending();
    getUsers()
  }, []);

  const totalMovies = trending.length;

  // fake stats (until backend users API ready)
  const totalUsers = users.length;

  const genres = [
    ...new Set(trending.flatMap((m) => m.genre_ids || []))
  ].length;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Welcome back, Admin</h2>
        <p className="text-muted-foreground">
          Here's an overview of your movie platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={Film}
          label="Total Movies"
          value={totalMovies}
          color="bg-primary/10 text-primary"
        />

        <StatCard
          icon={Users}
          label="Total Users"
          value={totalUsers}
          color="bg-blue-500/10 text-blue-500"
        />

        <StatCard
          icon={TrendingUp}
          label="Genres"
          value={genres}
          color="bg-green-500/10 text-green-500"
        />
      </div>

      {/* Recent Data */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Recent Movies */}
        <div className="bg-card border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Recent Movies</h3>

          <div className="space-y-3">
            {trending.slice(0, 10).map((movie) => (
              <div key={movie.id} className="flex items-center gap-3">

                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "/placeholder.svg"
                  }
                  className="w-10 h-14 rounded-md object-cover"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {movie.title || movie.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {movie.release_date || movie.first_air_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users (Mock UI) */}
        <div className="bg-card border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Recent Users</h3>

          <div className="space-y-3">
            {users.map((user) => (
              <div key={user._id} className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {user[0]}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>

                <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;