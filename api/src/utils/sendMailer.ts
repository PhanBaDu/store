import nodemailer from 'nodemailer';
import {
    MAILER_HOST,
    MAILER_PASSWORD,
    MAILER_PORT,
    MAILER_USER,
} from '../constants/env';

const transporter = nodemailer.createTransport({
    host: MAILER_HOST,
    port: Number(MAILER_PORT),
    secure: false,
    auth: {
        user: MAILER_USER,
        pass: MAILER_PASSWORD,
    },
});

type Params = {
    to: string;
    subject: string;
    html: string;
};

export const sendEmailer = async ({ to, subject, html }: Params) => {
    try {
        await transporter.sendMail({
            from: MAILER_USER,
            to: to,
            subject: subject,
            html: html,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};
