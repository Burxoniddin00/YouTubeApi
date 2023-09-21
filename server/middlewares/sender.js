import nodemailer from "nodemailer";

const sendMail = (to, subject, code) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "burxstvoldi@gmail.com",
        pass: "xoaoayyjnyzovdmx",
      },
    });
    let mailOptions = {
      from: "burxstvoldi@gmail.com",
      to,
      subject,
      html: `<h1>Royxatdan o'tish uchun code</h1>
            <h3>${code}</h3>`,
    };
    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};

export default sendMail;

