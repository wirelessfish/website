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

<span>{shouldShow ? content : ""}</span>

<style>
  span {
    color: var(--red) !important;
    font-size: 10px;
    font-style: italic;
    position: absolute;
    transform: translateX(90%) translateY(35%);
    rotate: -10deg;
  }
</style>
