import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "30d77d75a17392",
      pass: "7a0533c419f1c4"
    }
  });

app.post('/feedbacks', async (request, response) => {
    const { type, comment, screenshot } = request.body; // Desmembrando o json nas 3 variáveis

    const feedback = await prisma.feedback.create({
        data: {
            type: type,
            comment: comment,
            screenshot: screenshot
        }
    })

    await transport.sendMail({
        from: "Equipe Feedget <oi@feedget.com>",
        to: "João Gabriel <joaogabriel013@gmail.com>",
        subject: "Novo Feedback",
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
            `<p>Tipo do Feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`,
        ].join("")
    });

    return response.status(201).json({ data: feedback });
})

app.listen(3333, () => {
    console.log("HTTP server running!");
})