import { createTransport } from "nodemailer";

const mailer = async (url: string) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_SECRET_KEY
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_TO,
      subject: "Price missing!",
      text: `Reported missing price on URL: ${url} \n check crawler and selectors.`
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.response);
    return
  } catch (error) {
    console.error("Error while sending email:", error);
    throw error;
  }
};

export default mailer;
