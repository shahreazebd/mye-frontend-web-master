import { toast } from "react-toastify";

const openSuccessNotification = ({ description = "Successfully sent!" }) => {
  toast.success(description, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const openErrorNotification = ({ description = "Something went wrong!" }) => {
  toast.error(description, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export { openErrorNotification, openSuccessNotification };
