import { LogEntity, LogSeverityLevel } from "./log.entity";




describe('LogEntity', () => {

    const dataObj = {
        message: 'This is a log message',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    };

    test('Should create a Logentity instance', () => {

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    test('Should create a LogEntuty instance from json', () => {

        const json = `{"level":"low","message":"Service https://www.google.com working","createdAt":"2025-10-15T13:11:10.072Z","origin":"CheckService"}`;
        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service https://www.google.com working");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe("CheckService");
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('Should create a LogEntity instance from object', () => {

        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    });




});
