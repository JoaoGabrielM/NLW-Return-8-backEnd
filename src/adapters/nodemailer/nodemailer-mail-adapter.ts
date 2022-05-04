import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "30d77d75a17392",
      pass: "7a0533c419f1c4"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData){
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "João Gabriel <joaogabriel013@gmail.com>",
            subject: subject,
            html: body
        });
    };
}