import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Grid, Label } from "semantic-ui-react";
import { DisplayType } from "./Home";
import { rateMovie, rateTvShows } from "./mutation";
import { toast } from "react-toastify";

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
  rating?: number;
}
interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
}

export default function ColumnDisplay(props: Props) {
  const { data, displayType, isRated } = props;

  const onSuccess = () => {
    toast.success("Successfully rated!");
  };
  const onError = () => {
    toast.error("Successfully rated!");
  };
  console.log(data, "display Data");
  const [rate, setRate] = useState<Number>(0);

  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ["ratemovie"],
    mutationFn: (id: number) => rateMovie(id, rate.valueOf()),

    onSuccess,
    onError,
  });

  const { mutate: rateTvShowsMutation } = useMutation({
    mutationKey: ["ratemovie"],
    mutationFn: (id: number) => rateTvShows(id, rate.valueOf()),
    onSuccess,
    onError,
  });

  const ratingfn =
    displayType === DisplayType.Movies
      ? rateMovieMutation
      : rateTvShowsMutation;
  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
      // style={{ height: "100vh" }}
    >
      {data &&
        data.map((displayData: DisplayData) => (
          <Grid.Column key={displayData.id}>
            <Card.Group>
              <Link
                to={`/${
                  displayType === DisplayType.Movies ? "movies" : "tvshow"
                }/${displayData.id}`}
              >
                <Card
                  style={{ height: 820 }}
                  fluid
                  image={`https://images.tmdb.org/t/p/original/${displayData.poster_path}`}
                  header={
                    displayType === DisplayType.Movies
                      ? displayData.title
                      : displayData.name
                  }
                  meta={`Release Data: ${displayData.release_date} || Rating: ${displayData.vote_average}`}
                  description={displayData.overview.slice(0, 350) + "..."}
                ></Card>
                {isRated && (
                  <Label color="green">
                    Your Rating : {displayData.rating}
                  </Label>
                )}
              </Link>
              <Form style={{ marginTop: 10 }}>
                <Form.Group>
                  <Form.Field>
                    <Form.Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      onChange={(e) => {
                        setRate(Number(e.target.value));
                      }}
                      action={{
                        color: "violet",
                        labelPosition: "right",
                        icon: "star",
                        content: "Rate",
                        onClick: () => ratingfn(displayData.id),
                      }}
                    ></Form.Input>
                  </Form.Field>
                </Form.Group>
              </Form>
            </Card.Group>
          </Grid.Column>
        ))}
    </Grid>
  );
}
