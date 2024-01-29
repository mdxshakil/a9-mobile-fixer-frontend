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
    iconColor:"#FF8551",
    showCancelButton: true,
    confirmButtonColor: "#FF8551",
    cancelButtonColor: "#111827",
    confirmButtonText: "Confirm",
    customClass:"bg-white/40 backdrop-blur-md",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    }
  });
};
