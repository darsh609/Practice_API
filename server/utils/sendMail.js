const SibApiV3Sdk = require("sib-api-v3-sdk");

// Setup Brevo client
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/*
 * SEND OTP MAIL
 */
const sendOtpMail = async (email, otp) => {
  try {
    const response = await emailApi.sendTransacEmail({
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "Retail Portal",
      },
      to: [{ email }],
      subject: "Your OTP Verification Code",
      htmlContent: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`,
    });

    console.log("OTP MAIL RESPONSE:", response);

    return response;
  } catch (error) {
    console.error("OTP MAIL ERROR:", error.message);
    throw error;
  }
};

/*
 * SEND ORDER MAIL
 */
const sendOrderMail = async ({ to, subject, html }) => {
  try {
    const response = await emailApi.sendTransacEmail({
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "Pizza Store 🍕",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    return response;
  } catch (error) {
    console.error("ORDER MAIL ERROR:", error.message);
    throw error;
  }
};

module.exports = {
  sendOtpMail,
  sendOrderMail,
};


// const nodemailer = require("nodemailer");
// /*
//  * SEND OTP MAIL
//  */
// const sendOtpMail = async (email, otp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//       secure: false,
//     });

//     const info = await transporter.sendMail({
//       from: `"Retail Portal" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: "Your OTP Verification Code",
//       html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`,
//     });

//     console.log(info.response);
//     return info;
//   } catch (error) {
//     console.log(error.message);
//     return error.message;
//   }
// };

// /**
//  * SEND ORDER MAIL
//  */
// const sendOrderMail = async ({ to, subject, html }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//       secure: false,
//     });

//     const info = await transporter.sendMail({
//       from: `"Pizza Store 🍕" <${process.env.MAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log(info.response);
//     return info;
//   } catch (error) {
//     console.log(error.message);
//     return error.message;
//   }
// };

// module.exports = {
//   sendOtpMail,
//   sendOrderMail,
// };







// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//   },
//    secure: false,
// });

// module.exports = async (email, otp) => {
//   await transporter.sendMail({
//     from: '"Retail Portal" <no-reply@retail.com>',
//     to: email,
//     subject: "Your OTP Verification Code",
//     html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`
//   });
// };

// module.exports.sendOrderMail = async ({ to, subject, html }) => {
//   await transporter.sendMail({
//     from: '"Pizza Store 🍕" <no-reply@pizzastore.com>',
//     to,
//     subject,
//     html
//   });
// };




// // const nodemailer = require("nodemailer")

// // const mailSender = async (email, title, body) => {
// //   try {
// //     let transporter = nodemailer.createTransport(
// //       {
// //       host: process.env.MAIL_HOST,
// //       auth: {
// //         user: process.env.MAIL_USER,
// //         pass: process.env.MAIL_PASS,
// //       },
// //       secure: false,
// //     }
// //   )

// //     let info = await transporter.sendMail(
// //       {
// //       from: `"Visalta | NITW" <${process.env.MAIL_USER}>`, // sender address
// //       to: `${email}`, // list of receivers
// //       subject: `${title}`, // Subject line
// //       html: `${body}`, // html body
// //     }
// //   )
// //     console.log(info.response)
// //     return info
// //   } 
// //   catch (error) {
// //     console.log(error.message)
// //     return error.message
// //   }
// // }

// // module.exports = mailSender
