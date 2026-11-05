<script lang="ts">
  type Props = {
    locale: "en" | "cs";
  };
  const { locale = "en" }: Props = $props();

  const componentLocalization = {
    en: {
      title: "The 11ty mascot (2026)",
      mascotName: '"Awesome Possum"',
      mascotNote1: "It's actually spelled",
      mascotNote2: '"Opossum" but whatever...',
      imgAlt: "Eleventy mascot (opossum) floating with a baloon strapped to them",
    },
    cs: {
      title: "Maskot 11ty (2026)",
      mascotName: '"Awesome Possum"',
      mascotNote1: "Správně to je hláskováno",
      mascotNote2: '"Opossum" ale co už...',
      imgAlt: "Maskot Eleventy (vačice), který se vznáší pomocí balónku",
    },
  };

  const t = $derived(componentLocalization[locale]);
</script>

<div class="container">
  <img alt={t.imgAlt} src="/assets/post/moving-to-astro/eleventy.svg" />
  <div class="title">{t.title}</div>
  <div>{t.mascotName}</div>
  <div class="note">{t.mascotNote1}</div>
  <div class="note">{t.mascotNote2}</div>
</div>

<style>
  .container {
    float: right;
    display: flex;
    align-items: center;
    flex-direction: column;

    background: linear-gradient(to bottom, var(--darkgrey), var(--grey), var(--darkgrey));
    padding: 8px;
    border-radius: 2px;

    text-shadow: 1px 1px 4px var(--black);

    margin-top: 1em;
    margin-left: 1em;
  }

  .title {
    font-weight: bold;
  }

  .note {
    opacity: 70%;
    font-size: smaller;
    text-align: center;
  }

  img {
    width: 100px;
    margin-top: 8px;
    margin-bottom: 16px;
    filter: drop-shadow(3px 3px 5px var(--black));
  }
</style>
