import { Button, Card, Grid, Heading, Stack, Text } from "@ubento/bento.arlo";
import { createEnvironment } from "@ubento/bento.engine";

export const environment = createEnvironment({
  components: { Stack, Grid, Heading, Text, Button, Card },
});
