import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import ColumnDisplay from "./ColumnDisplay";
import { fetchMovies, fetchTvShows } from "./query";
export const enum DisplayType {
  Movies = "movies",
  TvShows = "tvshows",
}
const Home = () => {
  const [display, setDisplay] = useState<DisplayType>(DisplayType.Movies);
  const { data: movieData, isLoading: isLoadingMovie } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
  const { data: tvShowsData, isLoading: isLoadingTvshows } = useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchTvShows,
  });

  if (localStorage.getItem("guest_session_id") === null) {
    return <Navigate to="/auth" />;
  }
  return (
    <div style={{ marginTop: 50 }}>
      <Button.Group>
        <Button
          color={display === DisplayType.Movies ? "violet" : undefined}
          onClick={() => {
            setDisplay(DisplayType.Movies);
          }}
        >
          Movies
        </Button>
        <Button
          color={display === DisplayType.TvShows ? "violet" : undefined}
          onClick={() => {
            setDisplay(DisplayType.TvShows);
          }}
        >
          Tv Shows
        </Button>
      </Button.Group>
      {isLoadingMovie && isLoadingTvshows ? (
        <div>Loading</div>
      ) : (
        <div style={{ marginTop: 20 }}>
          {display === DisplayType.Movies ? (
            <ColumnDisplay
              displayType={DisplayType.Movies}
              data={movieData?.results}
            />
          ) : (
            <ColumnDisplay
              displayType={DisplayType.TvShows}
              data={tvShowsData?.results}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
