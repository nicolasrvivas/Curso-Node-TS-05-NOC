import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from "./email.service";


describe('email.service.ts', () => {

    const mockSendMail = jest.fn();

    // Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService();

    test('Should send email', async () => {

        const options: SendMailOptions = {
            to: 'buzon.nicolas.vivas@gmail.com',
            subject: 'Test1',
            htmlBody: '<h1>Test</h1>'
        }

        await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith({
            attachements: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "Test1",
            to: "buzon.nicolas.vivas@gmail.com",
        });

    });

    test('Should send email with attachements', async () => {

        const email = 'buzon.nicolas.vivas@gmail.com';
        await emailService.sendEmailWithFilesSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "System Logs",
            html: expect.any(String),
            attachements: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
                { filename: 'logs-high.log', path: './logs/logs-all.log' }
            ])
        });
    });

});