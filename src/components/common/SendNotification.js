import addNotification from "react-push-notification";

const sendNotification = (title, type) => {
  addNotification({
    title: title,
    message: type,
    duration: 5000,
    native: true, // when using native, your OS will handle theming.
  });
};

export default sendNotification;
