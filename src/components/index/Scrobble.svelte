<script lang="ts">
  import { getRecentTracks, getScrobbleCover } from "@scripts/module/lastfm";
  import type { RecentTracks } from "@scripts/types/lastfm";
  import "javascript-time-ago/locale/en";
  import "javascript-time-ago/locale/cs";
  import TimeAgo from "javascript-time-ago";
  let timeAgo = new TimeAgo("en");
  let timeAgoCs = new TimeAgo("cs");

  const { locale } = $props();

  let recent_tracks: RecentTracks | undefined = $state();
  let track = $derived(recent_tracks?.recenttracks.track[0]);
  let albumArt = $derived(track ? getScrobbleCover(track, "large") : undefined);
  let playbackChar = $derived(track?.["@attr"]?.nowplaying ? "⏸" : "▶");
  let trackDate = $derived(track?.date?.["#text"]);
  let playedAgo = $derived(trackDate ? timeAgo.format(new Date(trackDate), "mini") : undefined);
  let playedAgoCs = $derived(trackDate ? timeAgoCs.format(new Date(trackDate), "mini") : undefined);

  getRecentTracks(1).then((tracks) => (recent_tracks = tracks));
</script>

<div class="scrobble">
  <div class="header">
    {#if track?.["@attr"]?.nowplaying}
      <span style="color: var(--red)">⏺</span>
    {/if}

    {#if locale === "cs"}
      Hudební poslech ({track?.["@attr"]?.nowplaying ? "právě teď" : playedAgoCs})
    {:else}
      Listening activity ({track?.["@attr"]?.nowplaying ? "right now" : playedAgo + " ago"})
    {/if}
  </div>

  <div class="scrobble-content" style:--bg="url({albumArt})">
    {#if track}
      <img loading="lazy" alt="album art" src={albumArt} />

      <div class="interface">
        <div class="track-title">
          {track.name} - {track.artist["#text"]}
        </div>
        <div class="controls">⏮ {playbackChar} ⏭</div>
        <div class="playbar"></div>
      </div>
    {:else}
      {#if locale === "cs"}
        Načítání...
      {:else}
        Loading...
      {/if}
    {/if}
  </div>
</div>

<style style:>
  img {
    height: 80px;
    border: 1px solid var(--grey);
  }

  .header {
    background-color: var(--darkergrey);
    padding: 2px 8px;
    font-family: monospace;
    color: var(--lightgrey);
    border-bottom: 1px solid var(--grey);
  }

  .scrobble {
    border-top: 1px solid var(--grey);
    border-bottom: 1px solid var(--grey);
    background-color: var(--black);
  }

  .scrobble-content {
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    position: relative;
    isolation: isolate;
  }

  .scrobble-content::before {
    content: "";
    position: absolute;
    inset: -2rem; /* overscan so blurred edges stay opaque */
    clip-path: inset(2rem); /* crop back to the element's box */
    z-index: -1;
    background: var(--bg);
    background-size: contain;
    filter: blur(16px) opacity(70%);
  }

  .playbar {
    height: 4px;
    background-color: var(--white);
    background: linear-gradient(90deg, var(--white) 60%, var(--grey) 60%);
    width: 90%;
  }

  .interface {
    width: 100%;
    padding: 0 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .controls {
    font-size: x-large;
    line-height: 1em;
    text-shadow: 1px 1px 2px var(--black);
    margin-bottom: 2px;
  }

  .track-title {
    font-size: larger;
    text-shadow: 1px 1px 2px var(--black);
  }
</style>
