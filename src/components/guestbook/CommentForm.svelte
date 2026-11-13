<script lang="ts">
  import AeroButton from "@components/AeroButton.svelte";
  import { colors } from "@scripts/colors";
  import { Config } from "@scripts/config";
  import { sleep } from "@scripts/module/util";
  import type { GuestbookEntry, GuestbookPostBody } from "@scripts/types/guestbook";
  import validator from "validator";

  type Props = {
    locale: "en" | "cs";
    reply_to: GuestbookEntry | undefined;
  };

  let name: string = $state("");
  let website_url: string = $state("");
  let comment_content: string = $state("");
  let valid_comment: boolean = $state(false);

  let submit_status: string | undefined = $state();

  let { reply_to = $bindable(), locale = "en" }: Props = $props();

  const componentLocalization = {
    en: {
      name: "Name",
      website: "Your website",
      optional: "Optional",
      message: "Message",
      messagePlaceholder: "Rat activiy has increased exponentially",
      submit: "Submit",
      sendingState: "Sending...",
      networkError: "Network error. Check your connection.",
    },
    cs: {
      name: "Jméno",
      website: "Tvoje webovka",
      optional: "Volitelné",
      message: "Zpráva",
      messagePlaceholder: "Aktivita krys se exponencionálně zvýšila",
      submit: "Odeslat",
      sendingState: "Odesílám...",
      networkError: "Síťová chyba. Zkontrolujte své připojení.",
    },
  };

  const t = $derived(componentLocalization[locale]);

  function validateForm() {
    if (name.trim().length <= 0) {
      return false;
    }

    if (website_url.trim().length > 0) {
      if (!validator.isURL(website_url.trim())) {
        return false;
      }
    }

    if (comment_content.trim().length <= 0) {
      return false;
    }

    return true;
  }

  function onInput() {
    valid_comment = validateForm();
  }

  const guesbook_post_data: GuestbookPostBody = $derived({
    name,
    content: comment_content,
    site: website_url,
    reply_to: reply_to?.id,
  });

  async function submitComment(e: Event) {
    e.preventDefault();

    submit_status = t.sendingState;

    let resp: Response | undefined;

    try {
      console.log(guesbook_post_data);
      resp = await fetch(Config.apiUrl + "/guestbook", {
        method: "POST",
        body: JSON.stringify(guesbook_post_data),
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (e) {
      submit_status = t.networkError;
      return;
    }

    if (resp.ok) {
      reply_to = undefined;

      name = "";
      website_url = "";
      comment_content = "";

      await sleep(1000);
      window.location.reload();
    } else {
      if (locale === "en") {
        submit_status = `Error while posting (${resp.status}). Please poke me on discord/fluxer/email.`;
      } else {
        submit_status = `Error při zpracování komentáře (${resp.status}). Prosím kontaktuj mě na discordu/fluxeru/emailu.`;
      }
    }
  }
</script>

<form class="content-padding" oninput={onInput}>
  <div class="form_head">
    <!-- NAME -->
    <div class="input_group">
      <label for="form_name">{t.name} <span style="color: var(--red)">*</span></label>
      <input bind:value={name} id="form_name" name="name" placeholder="Jane Doe" type="text" required />
    </div>

    <!-- WEBSITE -->
    <div class="input_group">
      <label for="form_url">{t.website} <span style="color: var(--lightgrey)">({t.optional})</span></label>
      <input bind:value={website_url} id="form_url" name="your website" placeholder="https://example.com" type="url" />
    </div>
  </div>

  <!-- MESSAGE -->
  <div class="input_group">
    <label for="form_message">{t.message} <span style="color: var(--red)">*</span></label>
    <textarea bind:value={comment_content} id="form_message" name="message" placeholder={t.messagePlaceholder} required
    ></textarea>
  </div>

  <div style="display: flex; flex-direction: column; align-items: center;">
    <AeroButton disabled={!valid_comment} onclick={submitComment} color={colors.blue}>{t.submit}</AeroButton>

    {#if submit_status}
      <div class="submit_status">{submit_status}</div>
    {/if}
  </div>
</form>

<style>
  label {
    margin-left: 0.2em;
    margin-bottom: 2px;
  }

  .input_group {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  #form_name,
  #form_url {
    width: 100%;
  }

  #form_message {
    height: 4em;
    text-align: left;
    width: 100%;
  }

  .form_head {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  .submit_status {
    padding: 4px 8px;
  }
</style>
