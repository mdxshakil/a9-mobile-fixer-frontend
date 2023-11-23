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
    confirmButtonColor: "#FF8551",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    }
  });
};
