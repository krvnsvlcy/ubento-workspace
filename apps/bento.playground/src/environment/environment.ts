import { createEnvironment, type Environment } from "@ubento/engine";
import { Button } from "./components/button";
import { Card } from "./components/card";
import { Grid } from "./components/grid";
import { Heading } from "./components/heading";
import { Stack } from "./components/stack";
import { Text } from "./components/text";

export const environment: Environment = createEnvironment({
  components: {
    Stack,
    Grid,
    Text,
    Heading,
    Button,
    Card,
  },
});
