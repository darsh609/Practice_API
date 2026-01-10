const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
  },
   secure: false,
});

module.exports = async (email, otp) => {
  await transporter.sendMail({
    from: '"Retail Portal" <no-reply@retail.com>',
    to: email,
    subject: "Your OTP Verification Code",
    html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`
  });
};

module.exports.sendOrderMail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: '"Pizza Store 🍕" <no-reply@pizzastore.com>',
    to,
    subject,
    html
  });
};

// const nodemailer = require("nodemailer")

// const mailSender = async (email, title, body) => {
//   try {
//     let transporter = nodemailer.createTransport(
//       {
//       host: process.env.MAIL_HOST,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//       secure: false,
//     }
//   )

//     let info = await transporter.sendMail(
//       {
//       from: `"Visalta | NITW" <${process.env.MAIL_USER}>`, // sender address
//       to: `${email}`, // list of receivers
//       subject: `${title}`, // Subject line
//       html: `${body}`, // html body
//     }
//   )
//     console.log(info.response)
//     return info
//   } 
//   catch (error) {
//     console.log(error.message)
//     return error.message
//   }
// }

// module.exports = mailSender
