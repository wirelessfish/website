<script lang="ts">
  import { getSCafeData, type StatusCafe } from "@scripts/statuscafe.ts";

  let scafe: StatusCafe | undefined = $state();

  getSCafeData().then((data) => (scafe = data));
</script>

<div class="main">
  <h3>status.cafe</h3>

  <div class="content">
    {#if !scafe}
      <div>Loading...</div>

      <div class="user">
        [
        <span>Loading...</span>
        <span>Loading...</span>
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
    text-align: center;
    border-bottom: 1px solid var(--lightgrey);
  }

  .main {
    background-color: var(--blacker);
    border: 1px solid var(--lightgrey);
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
