import emailjs from "emailjs-com";
import { useAuth } from "../contexts/AuthContext";

const SendNotification = () => {
  const { students } = useAuth();

  const sendEmail = (title, type) => {
    const filteredStudents = students.filter(
      (student) =>
        student.group === type ||
        student.specialization === type ||
        type === "Universitate"
    );

    const studentEmails = filteredStudents.map((student) => student.email);

    const emailData = {
      title: title,
      type: type,
      email: studentEmails,
    };

    if (studentEmails !== []) {
      emailjs.send(
        "service_g3elv0p",
        "template_xkwc30w",
        emailData,
        "wGFIRDXI0dcdI2h6X"
      );
    }
  };
  //   addNotification({
  //     title: "Supaaaaa",
  //     message: "Lupaaaaaa",
  //     duration: 5000,
  //     native: true, // when using native, your OS will handle theming.
  //   });

  return { sendEmail };
};

export default SendNotification;
