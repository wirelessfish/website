<script lang="ts">
  import "javascript-time-ago/locale/en";
  import "javascript-time-ago/locale/cs";
  import TimeAgo, { type FormatStyleName } from "javascript-time-ago";
  let timeAgo = new TimeAgo("en");
  let timeAgoCs = new TimeAgo("cs");

  interface Props {
    date: Date;
    format: FormatStyleName;
    locale: "en" | "cs";
  }

  const { date, format, locale = "en" }: Props = $props();

  let time = $state("");

  $effect(() => {
    time = locale === "en" ? timeAgo.format(date, format) : timeAgoCs.format(date, format);
  });
</script>

<span>{time}</span>
