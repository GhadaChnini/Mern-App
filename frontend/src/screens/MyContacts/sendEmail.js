import emailjs from "emailjs-com";
import send from "emailjs-com"
const serviceId = "service_qsgp14q";
const templateId = "template_1n3d08u";
const userId = "user_Z5XvgO5kyT5j6CoPlkBlq";

const sendEmail = async (subject, email, message) => {
 if(window.confirm("Are you sure?")){
  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      { subject, email, message },
      userId
    );

    if (response === 200) {
      window.confirm("Successfully sent message.");
    }
  } catch (error) {
    window.confirm("Failed to send email. Error: ", error);
  }
};
}

export default sendEmail;