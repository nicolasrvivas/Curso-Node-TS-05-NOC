import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { Attachment } from 'nodemailer/lib/mailer';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport(
        {
            service: envs.MAILER_SERVICE,
            auth: {
                user: envs.MAILER_EMAIL,
                pass: envs.MAILER_SECRET,
            },
        },
    );

    constructor() { }

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachements = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                // from: envs.MAILER_EMAIL,
                to: to,
                subject: subject,
                html: htmlBody,
                attachements: attachements,
            });

            //console.log({ sentInformation });

            return true;
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithFilesSystemLogs(to: string | string[]) {
        const subject = 'System Logs';
        const htmlBody = `
            <h3>Attached are the system logs.</h3>
            <p>Please find the logs attached to this email.</p>
            <p>Best regards,<br/>Your Node.js App</p>
        `;

        const attachements: Attachement[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-all.log' }
        ];
        return this.sendEmail({
            to, subject, htmlBody, attachements
        });
    }


}