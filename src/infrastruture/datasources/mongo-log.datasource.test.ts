import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoDataBase } from "../../data/mongo/init";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongo/index";
import { after } from "node:test";


describe('Test in MongoLogDataSource', () => {

    const logDataSource = new MongoLogDatasource();

    const log = new LogEntity({
        message: 'Test log message',
        level: LogSeverityLevel.medium,
        origin: 'mongo-log.datasource.test.ts'
    });

    beforeAll(async () => {
        await MongoDataBase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });
    });

    afterEach(async () => {
        await LogModel.deleteMany({});
    });

    afterAll(async () => {
        mongoose.connection.close();
    });

    test('should save log to MongoDB', async () => {

        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(log);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created Cambio:", expect.any(String));

    });

    test('Should get logs ', async () => {

        await logDataSource.saveLog(log);

        const logs = await logDataSource.getLogs(LogSeverityLevel.medium);

        //expect(logs.length).toBe(1);
        expect(logs[0]?.level).toBe(LogSeverityLevel.medium);


    });

});