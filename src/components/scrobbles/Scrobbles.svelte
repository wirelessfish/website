<script lang="ts">
  import Track from "./Track.svelte";
  import LastfmProfile from "./LastfmProfile.svelte";
  import TopTracksComponent from "./TopTracksComponent.svelte";
  import TopArtistsComponent from "./TopArtistsComponent.svelte";

  import {
    getRecentTracks,
    getTopArtists,
    getTopTracks,
    getUserInfo,
    type RecentTracks,
    type UserInfo,
  } from "../../scripts/module/lastfm";
  import type { TopArtists, TopTracks } from "../../scripts/types/lastfm";

  type Props = {
    locale: "en" | "cs";
  };
  const { locale = "en" }: Props = $props();

  let recent_tracks: RecentTracks | undefined = $state();
  let user_data: UserInfo | undefined = $state();
  let top_tracks: TopTracks | undefined = $state();
  let top_artists: TopArtists | undefined = $state();

  getRecentTracks(10).then((tracks) => (recent_tracks = tracks));
  getUserInfo().then((data) => (user_data = data));
  getTopTracks(10, "3month").then((tracks) => (top_tracks = tracks));
  getTopArtists(10, "3month").then((artists) => (top_artists = artists));

  const componentLocalization = {
    en: {
      recentTracks: "Recent tracks",
      userInfo: "User info",
      topTracks: "Top tracks (90 days)",
      topArtists: "Top artists (90 days)",
      loading: "Loading...",
    },
    cs: {
      recentTracks: "Nedávné skladby",
      userInfo: "Info uživatele",
      topTracks: "Top skladby (90 dní)",
      topArtists: "Top umělci (90 dní)",
      loading: "Načítání...",
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
    <!-- PROFILE -->
    <h3>{t.userInfo}</h3>
    <div class="recent-tracks">
      {#if !user_data}
        <span>{t.loading}</span>
      {:else}
        <LastfmProfile user={user_data}></LastfmProfile>
      {/if}
    </div>

    <!-- TOP TRACKS -->
    <h3>{t.topTracks}</h3>
    {#if !top_tracks}
      <span>{t.loading}</span>
    {:else}
      <TopTracksComponent {top_tracks} />
    {/if}

    <!-- TOP ARTISTS -->
    <h3>{t.topArtists}</h3>
    {#if !top_artists}
      <span>{t.loading}</span>
    {:else}
      <TopArtistsComponent {top_artists} />
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
