<script lang="ts">
  import { getSCafeData, type StatusCafe } from "@scripts/statuscafe.ts";

  type Props = {
    locale: "en" | "cs";
  };
  const { locale = "en" }: Props = $props();
  let scafe: StatusCafe | undefined = $state();

  getSCafeData().then((data) => (scafe = data));

  const componentLocalization = {
    en: {
      loading: "Loading...",
    },
    cs: {
      loading: "Načítání...",
    },
  };

  const t = $derived(componentLocalization[locale]);
</script>

<div class="main">
  <h3>status.cafe</h3>

  <div class="content">
    {#if !scafe}
      <div>{t.loading}</div>

      <div class="user">
        [
        <span>{t.loading}</span>
        <span>{t.loading}</span>
        ]
      </div>
    {:else}
      <div>{scafe.content}</div>

      <div class="user">
        [
        <a href="https://status.cafe/users/sharky" target="_blank">{scafe.author}</a>
        <span>{scafe.timeAgo}</span>
        ]
      </div>
    {/if}
  </div>
</div>

<style>
  h3 {
    background-color: var(--black);
    text-align: center;
    border-bottom: 1px solid var(--grey);
  }

  .main {
    border-top: 1px solid var(--grey);
    border-bottom: 1px solid var(--grey);
    padding-bottom: 4px;
  }

  .user {
    display: flex;
    gap: 2px;
    justify-content: center;
  }

  .user > span {
    color: var(--lightergrey);
    font-style: italic;
  }

  .content {
    padding: 4px 8px;
  }
</style>
