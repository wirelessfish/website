<script lang="ts">
  import AeroButton from "@components/AeroButton.svelte";
  import { colors } from "@scripts/colors";
  import { v4 as uuidv4, v7 as uuidv7, NIL as UUID_NIL } from "uuid";
  let output: string = $state(uuidv4());
  let selected_ver: "V4" | "V7" = $state("V4");

  let uuid_table = {
    V4: uuidv4,
    V7: uuidv7,
  };

  function generateUUID() {
    output = uuid_table[selected_ver]();
  }

  $effect(() => {
    selected_ver;

    generateUUID();
  });
</script>

<div class="uuid-gen">
  <div class="out">
    <div class="uuid">{output}</div>
  </div>

  <form>
    <input type="radio" id="UUIDv4" name="uuid_ver" value="V4" bind:group={selected_ver} />
    <label for="UUIDv4">UUIDv4 (completely random)</label>

    <input type="radio" id="UUIDv7" name="uuid_ver" value="V7" bind:group={selected_ver} />
    <label for="UUIDv7">UUIDv7 (timestamp + randomness)</label>
  </form>

  <AeroButton onclick={generateUUID} color={colors.blue}>
    Regenerate {#if selected_ver == "V4"}
      UUIDv4
    {:else if selected_ver == "V7"}
      UUIDv7
    {:else}
      UUID
    {/if}
  </AeroButton>
</div>

<style>
  .uuid-gen {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    background-color: var(--darkgrey);
    padding: 16px;
  }

  .uuid {
    min-height: 1em;
    background-color: var(--darkgrey);
    padding: 4px 2px;
    border-radius: 2px;
  }

  form > input,
  form > label {
    cursor: pointer;
  }

  .out {
    display: flex;
    font-size: large;
  }
</style>
