const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(to, subject, body) {
  try {

    const transporter = nodemailer.createTransport({
        host: process.env.SERVICE_EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.SERVICE_EMAIL_USER,
          pass: process.env.SERVICE_EMAIL_PASS
        }
      });

    const mailOptions = {
      from: '"Appointment BOT👻" <email@gmail.com>',
      to: to,
      subject: subject,
      text: body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Mail has been sent successfully:', info.messageId);

  } catch (error) {
    console.error('Error in email service:', error);
  }
}

module.exports = { sendEmail };
