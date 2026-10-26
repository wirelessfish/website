<script lang="ts">
  import ViewCounter from "@components/widgets/ViewCounter.svelte";
  import { getNekowebStats, type NekowebStats } from "@scripts/nw_stats";
  import "javascript-time-ago/locale/en";
  import TimeAgo from "javascript-time-ago";

  let timeAgo = new TimeAgo("en");
  let nw_stats: NekowebStats | undefined = $state();
  let backend_alive: boolean | undefined = $state();

  async function getBackendStatus() {
    try {
      let response = await fetch("https://api.wireless.fish/", { signal: AbortSignal.timeout(5000) });
      return response.ok;
    } catch {
      return false;
    }
  }

  getNekowebStats("wireless.fish").then((data) => (nw_stats = data));
  getBackendStatus().then((state) => (backend_alive = state));
</script>

<div class="stats">
  <h2>Statistics</h2>

  <h3>Views</h3>

  <div style="display: flex; justify-content: center; align-items: center; padding: 8px 0px;">
    <ViewCounter />
  </div>

  <table>
    <tbody>
      <tr>
        <td>Updates</td>
        <td>{nw_stats?.updates ?? "00"}</td>
      </tr>

      <tr>
        <td>Nw followers</td>
        <td>{nw_stats?.followers ?? "00"}</td>
      </tr>

      <tr>
        <td>Last updated</td>
        <td>{nw_stats?.updated_at ? timeAgo.format(nw_stats?.updated_at, "mini") : "loading"} ago</td>
      </tr>

      <tr>
        <td>Backend</td>
        <td>
          {#if backend_alive === true}
            <span style="color: var(--green)">online</span>
          {:else if backend_alive === false}
            <span style="color: var(--red)">offline</span>
          {:else}
            Loading...
          {/if}
        </td>
      </tr>
    </tbody>
  </table>

  <div>
    You could <a href="https://nekoweb.org/follow/wireless.fish">follow me</a> on nekoweb... that'd be cool
  </div>
</div>

<style>
  .stats {
    background-color: var(--blacker);
    border: 1px solid var(--lightgrey);
    border-radius: 2px;
  }

  .stats > * {
    padding: 4px 8px;
  }

  .stats > *:not(:last-child) {
    border-bottom: 1px solid var(--lightgrey);
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
