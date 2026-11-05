<script lang="ts">
  import { sleep } from "@scripts/module/util";

  type Props = {
    locale: "en" | "cs";
  };
  const { locale = "en" }: Props = $props();

  let words = $state(new Array());

  $effect(() => {
    if (locale === "en") {
      words = ["I can", "make these", "words change", "very easily", "with Svelte!"];
    } else {
      words = ["Můžu tyhle", "slova měnit", "dost jednodužše", "za pomocí", "Svelte komponentů!"];
    }
  });

  let current_word: number = $state(0);

  async function loop() {
    while (true) {
      current_word += 1;

      if (current_word >= words.length) {
        current_word = 0;
      }

      await sleep(1500);
    }
  }

  loop();
</script>

<div>
  {words[current_word]}
</div>

<style>
  div {
    color: var(--orange);
    font-weight: bold;

    background-color: var(--grey);
    width: 150px;
    text-align: center;
    padding: 8px;
  }
</style>
