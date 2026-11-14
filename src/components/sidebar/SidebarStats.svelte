<script lang="ts">
  import ViewCounter from "@components/widgets/ViewCounter.svelte";
  import { getNekowebStats, type NekowebStats } from "@scripts/nw_stats";
  import "javascript-time-ago/locale/en";
  import "javascript-time-ago/locale/cs";
  import TimeAgo from "javascript-time-ago";
  import { Config } from "@scripts/config";

  type Props = {
    locale: "en" | "cs";
  };
  const { locale }: Props = $props();
  let timeAgo = new TimeAgo("en");
  let timeAgoCs = new TimeAgo("cs");
  let nw_stats: NekowebStats | undefined = $state();
  let backend_alive: boolean | undefined = $state();

  async function getBackendStatus() {
    try {
      let response = await fetch(Config.apiUrl, { signal: AbortSignal.timeout(5000) });
      return response.ok;
    } catch {
      return false;
    }
  }

  getNekowebStats("f1sh.cz").then((data) => (nw_stats = data));
  getBackendStatus().then((state) => (backend_alive = state));

  const componentLocalization = {
    en: {
      statistics: "Statistics",
      views: "Visits",
      updates: "Updates",
      followers: "Followers",
      lastUpdated: "Last Updated",
      backend: "Backend",
    },
    cs: {
      statistics: "Statistiky",
      views: "Návštěvy",
      updates: "Aktualizace",
      followers: "Followeři",
      lastUpdated: "Naposledy aktualizováno",
      backend: "Backend",
    },
  };

  const t = $derived(componentLocalization[locale]);
</script>

<div class="stats">
  <h2>{t.statistics}</h2>

  <h3>{t.views}</h3>

  <div style="display: flex; justify-content: center; align-items: center; padding: 8px 0px;">
    <ViewCounter />
  </div>

  <table>
    <tbody>
      <tr>
        <td>{t.updates}</td>
        <td>{nw_stats?.updates ?? "00"}</td>
      </tr>

      <tr>
        <td>{t.followers}</td>
        <td>{nw_stats?.followers ?? "00"}</td>
      </tr>

      <tr>
        <td>{t.lastUpdated}</td>
        {#if locale === "en"}
          <td>{nw_stats?.updated_at ? timeAgo.format(nw_stats?.updated_at, "mini") : "loading"} ago</td>
        {:else}
          <td>{nw_stats?.updated_at ? timeAgoCs.format(nw_stats?.updated_at, "mini") : "načítání"}</td>
        {/if}
      </tr>

      <tr>
        <td>{t.backend}</td>
        <td>
          {#if backend_alive === true}
            <span style="color: var(--green)">online</span>
          {:else if backend_alive === false}
            <span style="color: var(--red)">offline</span>
          {:else}
            {#if locale === "en"}
              Loading...
            {:else}
              Načítání...
            {/if}
          {/if}
        </td>
      </tr>
    </tbody>
  </table>

  <div>
    {#if locale === "en"}
      You could <a href="https://nekoweb.org/follow/f1sh.cz">follow me</a> on nekoweb... that'd be cool
    {:else}
      Můžeš mě <a href="https://nekoweb.org/follow/f1sh.cz">dát follow</a> na nekowebu... to by bylo cool
    {/if}
  </div>
</div>

<style>
  .stats > * {
    padding: 4px 8px;
  }

  .stats > *:not(:last-child) {
    border-bottom: 1px solid var(--grey);
  }

  h2 {
    color: var(--white);
    text-align: center;
    margin: 0;
    line-height: 24px;
  }

  h3 {
    line-height: 18px;
    text-align: center;
  }

  table,
  tr,
  td {
    font-size: small;
    border-collapse: collapse;
    border: 1px solid var(--grey);
  }

  td {
    padding: 1px 4px;
  }

  table {
    width: 100%;
  }
</style>
