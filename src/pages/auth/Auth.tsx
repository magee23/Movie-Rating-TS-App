import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import { useMutation } from "@tanstack/react-query";
import { mutateLogin } from "./Mutation";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();
  const { data, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: mutateLogin,
  });
  const handleLogin = async () => {
    console.log("items");
    await mutate();
    localStorage.setItem("guest_session_id", data.guest_session_id);
    return navigate("/");
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
      <Grid.Column style={{ width: 450 }}>
        <Header as="h2" color="violet" textAlign="center">
          Welcome! Login by register as a Guest below.
        </Header>
        <Form size="large">
          <Segment stacked>
            <Button color="violet" fluid size="large" onClick={handleLogin}>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
