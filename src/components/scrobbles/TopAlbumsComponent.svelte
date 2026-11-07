<script lang="ts">
  import { getAlbumImage } from "@scripts/module/lastfm";
  import type { TopAlbums } from "../../scripts/types/lastfm";

  interface Props {
    topAlbums: TopAlbums;
    locale: "en" | "cs";
  }

  let { topAlbums, locale = "en" }: Props = $props();

  let a = $derived(topAlbums.topalbums.album);

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
  {#each a as album}
    <a href={album.url}>
      <img src={getAlbumImage(album)} alt={"Cover of " + album.name + " by " + album.name} loading="lazy" />

      <div class="onhover">
        <div style="font-weight: bold;">
          {album.name}
        </div>

        <div>
          {album.playcount}
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
