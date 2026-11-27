<script lang="ts">
  import "javascript-time-ago/locale/en";
  import TimeAgo, { type FormatStyleName } from "javascript-time-ago";
  const timeAgo = new TimeAgo("en");

  interface Props {
    date: Date;
    format: FormatStyleName;
  }

  const { date, format }: Props = $props();

  let time = $state("");

  $effect(() => {
    time = timeAgo.format(date, format);
  });
</script>

<span>{time}</span>
