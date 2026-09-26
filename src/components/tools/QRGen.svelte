<script lang="ts">
  import AeroButton from "@components/AeroButton.svelte";
  import { colors } from "@scripts/colors";

  import QRCode, { type QRCodeRenderersOptions } from "qrcode";
  import SparkMD5 from "spark-md5";

  let canvas = $state<HTMLCanvasElement>();
  let current_code: QRCode.QRCode | undefined = $state();
  let content = $state<string>("Hello, quick response code!");
  let image_blob = $state<Blob | null>(null);
  let warn = $state("");
  let generated = $state(false);

  let error_correction: QRCodeRenderersOptions["errorCorrectionLevel"] = $state("L");

  let qr_options: QRCodeRenderersOptions = {};

  $effect(() => {
    qr_options.errorCorrectionLevel = error_correction;
    generate();
  });

  async function generate() {
    generated = false;

    if (!content) {
      warn = "No content.";
      return;
    }

    try {
      current_code = await QRCode.create(content, qr_options);

      if (canvas && current_code) {
        await QRCode.toCanvas(canvas, content, qr_options);
      }

      await canvas?.toBlob((blob) => {
        image_blob = blob;
      }, "image/png");
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes("too big")) {
          warn = "Too much data!";
        }
        return;
      }

      warn = "Something went wrong!";
      console.log(e);
      return;
    }

    warn = "";
    generated = true;
  }

  function downloadQRCode() {
    if (image_blob === null) {
      alert("QR Code not generated yet! Cannot download nothing!");
      return;
    }

    const url = URL.createObjectURL(image_blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `qrcode-${SparkMD5.hash(content).slice(0, 8)}.png`;
    link.click();

    URL.revokeObjectURL(url);
  }

  async function copyQRCode() {
    if (image_blob === null) {
      alert("QR Code not generated yet! Cannot copy nothing into the clipboard!");
      return;
    }

    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": image_blob,
      }),
    ]);
  }

  $effect(() => {
    generate();
  });
</script>

<div class="qrcode">
  <div class="control">
    <textarea bind:value={content}></textarea>

    <div class="options">
      {#if warn !== ""}
        <div class="red-text">{warn}</div>
        <div style="flex: 1;"></div>
      {/if}

      <label>
        Error correction:
        <select bind:value={error_correction}>
          <option value="L">Low (7%)</option>
          <option value="M">Medium (15%)</option>
          <option value="Q">Quarterly (25%)</option>
          <option value="H">High (30%)</option>
        </select>
      </label>

      <div style="flex: 1;"></div>

      <AeroButton onclick={generate} color={colors.blue}>Generate!</AeroButton>
      <AeroButton disabled={!generated} onclick={copyQRCode} color={colors.blue}>Copy</AeroButton>
      <AeroButton disabled={!generated} onclick={downloadQRCode} color={colors.blue}>Download</AeroButton>
    </div>
  </div>

  <canvas bind:this={canvas}></canvas>
</div>

<style>
  canvas {
    background-color: var(--white);
    width: 256px !important;
    height: 256px !important;
    image-rendering: pixelated;
  }

  .qrcode {
    display: flex;
    gap: 16px;
    justify-content: center;
    background-color: var(--darkgrey);
    padding: 16px;
    margin: 0 auto;
    border-radius: 2px;
  }

  .control {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 2;
  }

  .control > textarea {
    flex: 1;
  }

  .options {
    display: flex;
    gap: 8px;
  }

  .red-text {
    color: var(--red);
  }
</style>
