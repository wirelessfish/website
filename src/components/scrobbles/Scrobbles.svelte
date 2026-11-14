<script lang="ts">
  import Track from "./Track.svelte";
  import TopArtistsComponent from "./TopArtistsComponent.svelte";

  import { getRecentTracks, getTopAlbums, getTopArtists, type RecentTracks } from "../../scripts/module/lastfm";
  import type { TopAlbums, TopArtists } from "../../scripts/types/lastfm";
  import TopAlbumsComponent from "./TopAlbumsComponent.svelte";

  type Props = {
    locale: "en" | "cs";
  };
  const { locale = "en" }: Props = $props();

  let recent_tracks: RecentTracks | undefined = $state();
  let top_artists: TopArtists | undefined = $state();
  let top_albums: TopAlbums | undefined = $state();

  getRecentTracks(11).then((tracks) => (recent_tracks = tracks));
  getTopArtists(9, "1month").then((artists) => (top_artists = artists));
  getTopAlbums(9, "1month").then((albums) => (top_albums = albums));

  const componentLocalization = {
    en: {
      recentTracks: "Recent tracks",
      topArtists: "Top artists (30 days)",
      loading: "Loading...",
      topAlbums: "Top Albums (30 days)",
    },
    cs: {
      recentTracks: "Nedávné skladby",
      topArtists: "Top umělci (30 dní)",
      loading: "Načítání...",
      topAlbums: "Top Alba (30 dní)",
    },
  };

  const t = $derived(componentLocalization[locale]);
</script>

<section class="scrobbles-container" id="scrobbles-section">
  <div>
    <!-- RECENT TRACKS -->
    <section>
      <h3>{t.recentTracks}</h3>
      <div class="recent-tracks">
        {#if !recent_tracks}
          <span>{t.loading}</span>
        {:else}
          {#each recent_tracks.recenttracks.track as track}
            <Track {track} dynamic_bg={false} />
          {/each}
        {/if}
      </div>
    </section>
  </div>

  <section>
    <h3>{t.topAlbums}</h3>
    {#if !top_albums}
      <span>{t.loading}</span>
    {:else}
      <TopAlbumsComponent {locale} topAlbums={top_albums} />
    {/if}

    <h3>{t.topArtists}</h3>
    {#if !top_artists}
      <span>{t.loading}</span>
    {:else}
      <TopArtistsComponent {locale} {top_artists} />
    {/if}
  </section>
</section>

<style>
  .recent-tracks {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .scrobbles-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 1000px) {
    .scrobbles-container {
      display: flex;
      flex-direction: column;
    }
  }
</style>
