import { envs } from "../config/plugins/envs.plugins";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastruture/datasources/file-system.datasources";
import { MongoLogDatasource } from "../infrastruture/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastruture/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastruture/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {

    public static async start() {
        console.log('Server Started...(*.*)');

        // todo:A traves de un caso de uso
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute(
        //     ['buzon.nicolas.vivas@gmail.com', 'nicolas.r.vivas@gmail.com']
        // )
        // todo: Mandar email de prueba
        // const emailService = new EmailService(
        //     fileSystemLogRepository,
        // );
        // emailService.sendEmailWithFilesSystemLogs(
        //     ['buzon.nicolas.vivas@gmail.com', 'nicolas.r.vivas@gmail.com']
        // );
        // emailService.sendEmail({
        //     to: 'buzon.nicolas.vivas@gmail.com',
        //     subject: 'Test Email from Node.js',
        //     htmlBody: `
        //     <h3>This is a test email sent from Node.js using Nodemailer!</h3>
        //     <p>If you received this email, it means the email service is working correctly.</p>
        //     <p>Best regards,<br/>Your Node.js App</p>
        //     `,
        // }).then(sent => {
        //     console.log('Email sent status:', sent);
        // });

        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://www.google.com';
        //         //const url = 'http://localhost:3000/';
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => console.log(`Success CallBack executed ${url}  is OK`),
        //             (error) => console.log(error),
        //         ).execute(url);
        //         //new CheckService().execute('http://localhost:3000/');
        //     },
        // );

    }
}