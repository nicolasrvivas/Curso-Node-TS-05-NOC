import { envs } from "./envs.plugin";



describe('envs.plugin.ts', () => {

    test('Should return env options', () => {

        //console.log(envs);

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'nicolas.r.vivas@gmail.com',
            MAILER_SECRET: 'wgxdjghfooyfnazm',
            PROD: false,
            MONGO_URL: 'mongodb://nicolas:123456789@127.0.0.1:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'nicolas',
            MONGO_PASS: '123456789'
        });
    });

    test('Should return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false); // Si no lanza error, falla el test
        } catch (error) {
            //console.log(error);
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });
});


///Users/nvivasl/VisuaL Studio Code/Curso Node JS/05-NOC/src/config/plugins/envs.plugin.test.ts