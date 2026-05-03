import SpotifyWebApi from "spotify-web-api-node";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ clientId, clientSecret, accessToken }: { clientId?: string, clientSecret?: string, accessToken?: string }) {
  const spotify = new SpotifyWebApi({ clientId, clientSecret, accessToken });
  return {
    me: createResourceProxy("spotify", spotify, "getMe"),
    playlists: createResourceProxy("spotify", spotify, "getUserPlaylists"),
    player: {
      state: createResourceProxy("spotify", spotify, "getMyCurrentPlaybackState"),
      play: spotify.play.bind(spotify),
      pause: spotify.pause.bind(spotify)
    }
  };
}
