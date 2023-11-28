import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Header, Menu, Segment } from "semantic-ui-react";
import ColumnDisplay from "../home/ColumnDisplay";
import { DisplayType } from "../home/Home";
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
export default function Rated() {
  const [activeTab, setActiveTab] = useState<DisplayType>(DisplayType.Movies);
  const { data: ratedMovies, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["rated movies"],
    queryFn: fetchRatedMovies,
  });
  const { data: ratedTvShows, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ["rated tv shows"],
    queryFn: fetchRatedTvShows,
  });

  if (localStorage.getItem("guest_session_id") === null) {
    return <Navigate to="/auth" />;
  }
  return (
    <Container style={{ marginTop: 50 }}>
      <Menu pointing secondary>
        <Menu.Item
          name="Movies"
          active={activeTab === DisplayType.Movies}
          onClick={() => setActiveTab(DisplayType.Movies)}
        />
        <Menu.Item
          name="TV Shows"
          active={activeTab === DisplayType.TvShows}
          onClick={() => setActiveTab(DisplayType.TvShows)}
        />
      </Menu>

      <Segment>
        {activeTab === DisplayType.Movies ? (
          <div>
            <Header as={"h2"}> Rated Movies</Header>
            <ColumnDisplay
              data={ratedMovies?.results}
              displayType={DisplayType.Movies}
              isRated={true}
            />
          </div>
        ) : (
          <div>
            <Header as={"h2"}> Rated TV Shows</Header>
            <ColumnDisplay
              data={ratedTvShows?.results}
              displayType={DisplayType.TvShows}
              isRated={true}
            />
          </div>
        )}
      </Segment>
    </Container>
  );
}
