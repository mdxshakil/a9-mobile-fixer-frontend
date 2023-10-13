import Swal from "sweetalert2";

export const deleteConfirmationModal = (
  title: string,
  text: string,
  confirmCallback: () => void
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    }
  });
};
