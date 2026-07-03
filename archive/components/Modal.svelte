<script>
  export let show = false;
  export let onClose = () => {};
  export let onSave = () => {};
  export let text = "";
  export let photo = "";
  export let setText = () => {};
  export let setPhoto = () => {};

  function handleBackgroundClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleBackdropKeydown(e) {
    if (e.key === 'Escape') onClose();
  }

  function getInputValue(e) {
    return e.target && typeof e.target.value === 'string' ? e.target.value : '';
  }
</script>

{#if show}
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    on:click={handleBackgroundClick}
    on:keydown={handleBackdropKeydown}
  >
    <div class="modal-content">
      <button class="modal-close" on:click={onClose} aria-label="Close">×</button>
      <h2>Edit Box Content</h2>
      <label>
        Text:
        <input
          type="text"
          bind:value={text}
          on:input={(e) => setText(getInputValue(e))}
        />
      </label>
      <label>
        Photo URL:
        <input
          type="text"
          bind:value={photo}
          on:input={(e) => setPhoto(getInputValue(e))}
        />
      </label>
      {#if photo}
        <img src={photo} alt="Preview" class="modal-photo-preview" />
      {/if}
      <button class="modal-save" on:click={onSave}>Save</button>
    </div>
  </div>
{/if}

<style>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  min-width: 300px;
  position: relative;
  box-shadow: 0 2px 24px rgba(0,0,0,0.2);
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}
.modal-save {
  margin-top: 1rem;
  background: #322074;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
.modal-photo-preview {
  display: block;
  max-width: 100%;
  max-height: 200px;
  margin: 1rem 0;
}
</style>
