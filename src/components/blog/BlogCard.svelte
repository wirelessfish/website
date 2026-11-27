<script lang="ts">
  import FormatAgo from "@components/FormatAgo.svelte";
  import type { CollectionEntry } from "astro:content";
  import { format } from "date-fns";

  interface Props {
    post: CollectionEntry<"blog">;
  }

  const { post }: Props = $props();
</script>

<a href={"/blog/" + post.id} class="card">
  {#if post.data.og_img}
    <img src={post.data.og_img} alt={post.data.og_img_alt ?? "blogpost thumbnail"} class="thumbnail" />
  {/if}

  <div class="text-content">
    <div class="title">
      <span>{post.data.title}</span>
      <FormatAgo date={post.data.published} format="round" />
    </div>

    <div>
      {post.data.description}
    </div>
  </div>
</a>

<style>
  .card {
    color: var(--white);
    text-decoration: none;
    border: 2px solid var(--grey);
    background: var(--darkgrey);

    display: flex;
    padding: 0px;
  }

  .card:hover {
    filter: brightness(110%);
  }

  .text-content {
    padding: 4px 8px;
    flex: 1;
  }

  .thumbnail {
    width: 128px;
  }

  .title {
    font-size: 1.2em;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }
</style>
