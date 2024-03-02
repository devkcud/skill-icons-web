<script lang="ts">
  import { toast } from '@zerodevx/svelte-toast';

  export let toastId: string;
  export let message: string;
  export let onAccept: () => void;
  export let onDeny: () => void;

  function accept() {
    onAccept();
    toast.pop(toastId);
  }

  function decline() {
    onDeny();
    toast.pop(toastId);
  }
</script>

<div class="flex flex-col gap-2">
  <span class="font-bold">{message}</span>
  <div class="flex gap-2">
    <button class="flex-1 btn btn-sm btn-primary" on:click={accept}>Yes</button>
    <button class="flex-1 btn btn-sm btn-primary" on:click={decline}>No</button>
  </div>
</div>
