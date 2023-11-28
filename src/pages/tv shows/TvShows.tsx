import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Grid,
  Header,
  Image,
  List,
  Segment,
  Label,
  Accordion,
  Card,
} from "semantic-ui-react";
import { fetchTvShowDetails } from "./query";

export default function Movies() {
  const { id } = useParams<string>();
  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchTvShowDetails(id),
  });
  console.log(data?.seasons, "Tv Shows Details");
  if (isLoading) {
    <div>Loading....</div>;
  }

  const seasonsPanels = data?.seasons.map((season: any) => ({
    key: season?.id,
    title: `Season ${season?.season_number}`,
    content: {
      content: (
        <Card
          style={{ height: "70px" }}
          meta={season?.air_date}
          description={`${season?.episode_count} episode`}
        />
      ),
    },
  }));

  const cards = () => {
    return data?.seasons.map((items: any) => items);
  };
  console.log(seasonsPanels, "Loading");
  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header>{data?.name}</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  src={`https://images.tmdb.org/t/p/original/${data?.poster_path}`}
                  size="medium"
                  centered
                />
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <List>
                <List.Item>
                  <List.Header>Is the Movie for Adult : </List.Header>
                  {data?.adult ? "YES" : "NO"}
                </List.Item>
                <List.Item>
                  <List.Header>Genres : </List.Header>
                  {data?.genres.map((genre: any) => (
                    <Label>{genre.name}</Label>
                  ))}
                </List.Item>
                <List.Item>
                  <List.Header>First Air Date : </List.Header>
                  {data?.first_air_date}
                </List.Item>
                <List.Item>
                  <List.Header>Popularity : </List.Header>
                  {data?.popularity}
                </List.Item>
                <List.Item>
                  <List.Header>Production Componies : </List.Header>
                  {data?.production_companies
                    .map((companies: any) => companies.name)
                    .join(" , ")}
                </List.Item>
                <List.Item>
                  <List.Header>Production Componies : </List.Header>
                  {data?.release_date}
                </List.Item>
                <List.Item>
                  <List.Header>Vote Average : </List.Header>
                  {data?.vote_average}
                </List.Item>
                <List.Item>
                  <List.Header>Languages : </List.Header>
                  {data?.original_language}
                </List.Item>
                <List.Item>
                  <List.Header>Number Of Episode : </List.Header>
                  {data?.number_of_episodes}
                </List.Item>
                <List.Item>
                  <List.Header>Number Of Seasons : </List.Header>
                  {data?.number_of_seasons}
                </List.Item>
                <List.Item>
                  <List.Header>Number Of Seasons : </List.Header>
                  <List.Description
                    style={{ height: "300px", overflowY: "scroll" }}
                  >
                    <Accordion
                      styled
                      panels={seasonsPanels}
                      defaultActiveIndex={0}
                    />
                  </List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Episode Run time : </List.Header>
                  {data?.episode_run_time}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}
