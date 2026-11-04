<script lang="ts">
  import CommentForm from "./CommentForm.svelte";

  import type { GuestbookEntry, GuestbookResponse } from "../../scripts/types/guestbook";
  import { getGuestbook } from "../../scripts/module/guestbook";
  import Comment from "./Comment.svelte";

  type Props = {
    locale: "en" | "cs";
  };
  const { locale = "en" }: Props = $props();
  let guestbook_data: GuestbookResponse | undefined = $state();
  let reply_to: GuestbookEntry | undefined = $state();

  function onReplyClick(entry: GuestbookEntry) {
    reply_to = entry;
  }

  function cancelReply() {
    reply_to = undefined;
  }

  getGuestbook().then((data) => (guestbook_data = data));

  const componentLocalization = {
    en: {
      reply: "Replying to",
      loading: "Loading...",
    },
    cs: {
      reply: "Odpovědět",
      loading: "Loading...",
    },
  };

  const t = $derived(componentLocalization[locale]);
</script>

{#if reply_to}
  <div class="content-padding reply_info">
    ↳ {t.reply} "{reply_to?.name}"
  </div>
{/if}

<CommentForm locale="cs" {reply_to} />

<div class="content-padding comment-container">
  {#if !guestbook_data}
    <span>{t.loading}</span>
  {:else}
    {#each guestbook_data.entries as entry}
      <Comment
        replying_to={reply_to?.id === entry.id}
        oncancelreply={cancelReply}
        onreplyclick={onReplyClick}
        guestbook_entry={entry}
      />
    {/each}
  {/if}
</div>

<style>
  .comment-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .reply_info {
    background-color: var(--grey);
    background: linear-gradient(to bottom, var(--grey), var(--darkgrey));
    padding: 8px;
    font-size: large;
    text-align: center;
  }
</style>
