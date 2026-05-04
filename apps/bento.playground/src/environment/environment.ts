import { type Environment } from "@ubento/engine";
import { createDomStore } from "../../../../packages/bento/engine/build/environment/dom";
import { Button } from "./components/button";
import { Grid } from "./components/grid";
import { Heading } from "./components/heading";
import { Stack } from "./components/stack";
import { Text } from "./components/text";

export const environment: Environment = {
  domStore: createDomStore(),
  components: {
    Stack,
    Grid,
    Heading,
    Text,
    Button,
  },
};
