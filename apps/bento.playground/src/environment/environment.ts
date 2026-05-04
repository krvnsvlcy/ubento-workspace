import { type Environment } from "@ubento/engine";
import { Stack } from "./components/stack";
import { Grid } from "./components/grid";
import { Heading } from "./components/heading";
import { Text } from "./components/text";
import { Button } from "./components/button";

export const environment: Environment = {
  components: {
    Stack,
    Grid,
    Heading,
    Text,
    Button,
  },
};
