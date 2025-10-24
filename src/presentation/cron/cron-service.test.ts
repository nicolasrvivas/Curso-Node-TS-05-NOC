import { CronService } from "./cron-service";


describe('Cron-service.ts', () => {

    test('Should create a Job', (done) => {

        const mockTick = jest.fn();

        const job = CronService.createJob('* * * * * * ', mockTick);

        setTimeout(() => {
            expect( mockTick ).toHaveBeenCalledTimes(2);
            job.stop();
            done();
        }, 2000);

    });

});