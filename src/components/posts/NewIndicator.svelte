<script lang="ts">
  const { blog, show = false } = $props();

  const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

  const oldestAllowed = Date.now() - WEEK_MS;
  const shouldShow = $derived.by(() => {
    if (show) return true;

    for (let i = 0; i < blog.length; i++) {
      if (new Date(blog[i].data.published).getTime() > oldestAllowed) {
        return true;
      }
    }

    return false;
  });

  const content = " (new!)";
</script>

<span class="new">{shouldShow ? content : ""}</span>

<style>
  .new {
    color: var(--red) !important;
    font-size: 10px;
    font-style: italic;
    position: absolute;
    right: 1px;
    bottom: 2px;
    rotate: -10deg;
  }
</style>
