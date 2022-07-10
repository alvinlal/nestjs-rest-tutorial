import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export default class UtilService {
  async sendMail(options: Mail.Options) {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });

    const info = await transporter.sendMail(options);

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return info;
  }
}
