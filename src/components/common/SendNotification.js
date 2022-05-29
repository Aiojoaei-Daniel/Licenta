import emailjs from "emailjs-com";
import { useAuth } from "../../contexts/AuthContext";
// import { posts } from "../../contexts/";
// import addNotification from "react-push-notification";
// const { students } = useAuth();

const sendNotification = (data) => {
  if (data !== []) {
    emailjs.send(
      "service_g3elv0p",
      "template_xkwc30w",
      data,
      "wGFIRDXI0dcdI2h6X"
    );
  }
  //   addNotification({
  //     title: "Supaaaaa",
  //     message: "Lupaaaaaa",
  //     duration: 5000,
  //     native: true, // when using native, your OS will handle theming.
  //   });
};

export default sendNotification;
