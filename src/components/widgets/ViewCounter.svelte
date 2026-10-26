<script lang="ts">
  import { getNekowebStats } from "@scripts/nw_stats";

  let viewcount = $state(0);
  let viewcountStr: string = $derived(String(viewcount).padStart(5, "0"));

  $effect(() => {
    getNekowebStats("wireless.fish").then((s) => {
      viewcount = s.views;
    });
  });
</script>

<div>
  {#each viewcountStr as digit}
    <img src={`/assets/digits/${digit}.gif`} alt={"number " + digit} loading="lazy" />
  {/each}
</div>

<style>
  div {
    display: flex;
  }

  img {
    height: 75px;
    width: 34px;
  }
</style>
