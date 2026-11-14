<script lang="ts">
  type Props = {
    locale: "en" | "cs";
  };
  const { locale = "en" }: Props = $props();

  let time = $state(new Date(new Date().toLocaleString("cz", { timeZone: "Europe/Prague" })));

  const componentLocalization = {
    en: {
      title: "Webmaster time",
    },
    cs: {
      title: "Čas webmastera",
    },
  };

  const t = $derived(componentLocalization[locale]);
</script>

<div>
  <h3>{t.title}</h3>

  <div class="watch">
    <span>
      {time.getHours().toString().padStart(2, "0")}:{time.getMinutes().toString().padStart(2, "0")}
    </span>

    <img loading="lazy" draggable="false" src="/assets/casio_face.webp" alt="digital watch face" />
  </div>
</div>

<style>
  h3 {
    text-align: center;
    background-color: var(--black);
    border-bottom: 1px solid var(--grey);
  }

  .watch {
    position: relative;
    padding: 0px 8px;
    min-height: 120px;
  }

  .watch > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-51%) translateY(-50%);
    font-size: 40px;
    color: var(--black);
    font-family: "DS Digital", monospace;
    font-weight: bold;
  }
</style>
