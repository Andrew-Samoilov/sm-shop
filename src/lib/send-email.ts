'use server';

import nodemailer, { SentMessageInfo } from 'nodemailer';

type EmailPayload = {
    subject: string;
    html?: string;
    text?: string;
};

export async function sendEmail({
    subject,
    html,
    text,
}: EmailPayload): Promise<SentMessageInfo> {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? 'm.itim.com.ua',
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: 'webmaster@shinamix.com',
        replyTo: 'webmaster@shinamix.com',
        to: 'webmaster@shinamix.com',
        subject,
        html,
        text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[sendEmail] Лист надіслано:', info.messageId);
    return info;
}
