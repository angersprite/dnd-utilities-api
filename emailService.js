import * as nodemailer from 'nodemailer'
import {} from 'dotenv/config'

// should get an actual smtp domain for this?
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SERVICE_ADDRESS,
      pass: process.env.EMAIL_SERVICE_PASSWORD
    }
  });

export function sendEmail(mailTo, subject, body) {
    var mailOptions = {
        from: 'ktlankton@gmail.com',
        to: mailTo,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}