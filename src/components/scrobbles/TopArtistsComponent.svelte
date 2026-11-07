<script lang="ts">
  import { getArtistImage } from "@scripts/module/lastfm";
  import type { TopArtists } from "../../scripts/types/lastfm";

  interface Props {
    top_artists: TopArtists;
    locale: "en" | "cs";
  }

  let { top_artists, locale = "en" }: Props = $props();
  let a = $derived(top_artists.topartists.artist);

  const componentLocalization = {
    en: {
      plays: "plays",
    },
    cs: {
      plays: "přehrání",
    },
  };

  const t = $derived(componentLocalization[locale]);
</script>

<section>
  {#each a as artist}
    <a href={artist.url}>
      <img src={artist.image[1]["#text"]} alt={artist.name} loading="lazy" />

      <div class="onhover">
        <div style="font-weight: bold;">
          {artist.name}
        </div>

        <div>
          {artist.playcount}
          {t.plays}
        </div>
      </div>
    </a>
  {/each}
</section>

<style>
  a {
    transition: 150ms;
    position: relative;
    padding: 0;
    display: flex;
    color: var(--white);
  }

  section {
    position: relative;
    background-color: var(--darkergrey);
    border: 2px solid var(--darkgrey);
    padding: 8px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    gap: 8px;

    min-height: 300px;
  }

  .onhover {
    transition: 150ms;
    opacity: 0%;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 0;
    backdrop-filter: brightness(60%) blur(2px);
  }

  .onhover > div {
    text-align: center;
  }

  a:hover {
    scale: 105%;

    .onhover {
      opacity: 100%;
    }
  }
</style>
