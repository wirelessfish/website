<script lang="ts">
  import { getNekowebStats, type NekowebStats } from "@scripts/nw_stats";
  import "javascript-time-ago/locale/en";
  import TimeAgo from "javascript-time-ago";

  let timeAgo = new TimeAgo("en");
  let nw_stats: NekowebStats | undefined = $state();
  let backend_alive: boolean | undefined = $state();

  getNekowebStats("wireless.fish").then((data) => (nw_stats = data));
</script>

<div class="site-stats">
  <div class="stats-container">
    <div>Hits</div>
    <div>{nw_stats?.views ?? "0000"}</div>

    <div>Followers</div>
    <div>{nw_stats?.followers ?? "0000"}</div>
  </div>

  <div class="stats-container">
    <div>Updates</div>
    <div>{nw_stats?.updates ?? "0000"}</div>

    <div>Last updated</div>
    <div>{nw_stats ? timeAgo.format(nw_stats.updated_at, "mini") : "0000"} ago</div>
  </div>
</div>

<style>
  .stats-container {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 8px;
  }

  .site-stats {
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 0.5em;

    padding: 2px 1em;
    width: 360px;
    background: linear-gradient(to left, var(--black) 85%, transparent);
  }
</style>
