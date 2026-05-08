import { Button, Card, Grid, Heading, Stack, Text } from "@ubento/bento.arlo";
import { createEnvironment, type Environment } from "@ubento/bento.core";

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
