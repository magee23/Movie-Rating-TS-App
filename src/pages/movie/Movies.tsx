import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, Header, Image, List, Segment, Label } from "semantic-ui-react";
import { fetchMovieDetails } from "./query";

export default function Movies() {
  const { id } = useParams<string>();
  console.log(id, "Movie Id");
  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });
  console.log(data, "Movie Details");
  if (isLoading) {
    <div>Loading....</div>;
  }
  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header>{data?.title}</Header>
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
                  <List.Header>Budget : </List.Header>
                  {data?.budget}
                </List.Item>
                <List.Item>
                  <List.Header>Genres : </List.Header>
                  {data?.genres.map((genre: any) => (
                    <Label>{genre.name}</Label>
                  ))}
                </List.Item>
                <List.Item>
                  <List.Header>IMDB ID : </List.Header>
                  {data?.imdb_id}
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
                  {data?.production_companies
                    .map((companies: any) => companies.name)
                    .join(" , ")}
                </List.Item>
                <List.Item>
                  <List.Header>Production Componies : </List.Header>
                  {data?.release_date}
                </List.Item>
                <List.Item>
                  <List.Header>Revenue : </List.Header>
                  {data?.revenue}
                </List.Item>
                <List.Item>
                  <List.Header>Runtime : </List.Header>
                  {data?.Runtime}
                </List.Item>
                <List.Item>
                  <List.Header>Vote Average : </List.Header>
                  {data?.vote_average}
                </List.Item>
                <List.Item>
                  <List.Header>Languages : </List.Header>
                  {data?.original_language}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}
