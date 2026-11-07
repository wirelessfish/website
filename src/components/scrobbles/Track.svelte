<script lang="ts">
  import type { Scrobble } from "../../scripts/types/lastfm";
  import { getScrobbleCover } from "../../scripts/module/lastfm";
  interface Props {
    track: Scrobble;
    dynamic_bg: boolean | undefined;
  }

  let { track, dynamic_bg }: Props = $props();
</script>

<a href={track.url} target="_blank" class="scrobble-track">
  <img
    alt={"Cover of the track: " + track.name}
    src={getScrobbleCover(track, "large")}
    loading="lazy"
    class="scrobble-track_img"
  />

  <div class="scrobble-track_info">
    <div class="scrobble-track_name">{track.name}</div>
    <div class="scrobble-track_artist">{track.artist["#text"]}</div>
  </div>
</a>

<style>
  .scrobble-track,
  .scrobble-track:visited {
    background-color: var(--darkergrey);
    color: var(--white);
    border: 2px solid var(--darkgrey);

    display: flex;
    overflow: hidden;
    padding: 0px;
    position: relative;
    text-decoration: none;
    transition: 150ms;
    z-index: 10;

    max-width: 450px;
  }

  .scrobble-track:hover {
    background-color: var(--grey);
    filter: brightness(120%);
  }

  .scrobble-track_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: inherit;
  }

  .scrobble-track_name {
    display: block;
    font-weight: bold;
    min-width: 0;

    white-space: nowrap;
    z-index: inherit;
  }

  .scrobble-track_img {
    background-image: url("/assets/placeholder.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 30%;
    margin-right: 12px;
  }

  .scrobble-track_img {
    aspect-ratio: 1;
    height: 64px;
    object-fit: cover;
    transition: 150ms;
    z-index: inherit;
  }
</style>
