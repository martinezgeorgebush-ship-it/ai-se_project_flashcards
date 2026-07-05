const modalEl = document.querySelector("#confirmation-modal");
const confirmBtn = modalEl.querySelector(".modal__btn_type_confirm");
const cancelBtn = modalEl.querySelector(".modal__btn_type_cancel");

function closeModal() {
  modalEl.style.display = "none";
}

function openModal(onConfirm) {
  modalEl.style.display = "flex";

  function handleConfirm() {
    onConfirm();
    closeModal();
    cleanup();
  }

  function handleCancel() {
    closeModal();
    cleanup();
  }

  function cleanup() {
    confirmBtn.removeEventListener("click", handleConfirm);
    cancelBtn.removeEventListener("click", handleCancel);
  }

  confirmBtn.addEventListener("click", handleConfirm);
  cancelBtn.addEventListener("click", handleCancel);
}

export { openModal };
