import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {

    public static start() {
        console.log('Server Started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com';
                new CheckService(
                    () => console.log(`Success CallBack executed ${url}  is OK`),
                    (error: string) => console.log(`Error CallBack executed with error: ${error}`),
                ).execute(url);
                //new CheckService().execute('http://localhost:3000/');
            },
        );

    }


}