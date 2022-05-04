import express from 'express';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "30d77d75a17392",
      pass: "7a0533c419f1c4"
    }
});

routes.post('/feedbacks', async (request, response) => {
    const { type, comment, screenshot } = request.body; // Desmembrando o json nas 3 variáveis

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository);

    await submitFeedbackUseCase.execute({
        type: type,
        comment: comment,
        screenshot: screenshot
    })

    // await transport.sendMail({
    //     from: "Equipe Feedget <oi@feedget.com>",
    //     to: "João Gabriel <joaogabriel013@gmail.com>",
    //     subject: "Novo Feedback",
    //     html: [
    //         `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
    //         `<p>Tipo do Feedback: ${type}</p>`,
    //         `<p>Comentário: ${comment}</p>`,
    //         `</div>`,
    //     ].join("")
    // });

    return response.status(201).send();
})