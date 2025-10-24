import path from "path";
import fs from 'fs';
import { FileSystemDataSource } from "./file-system.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('FileSystemDataSource', () => {

    const logPath = path.join(__dirname, '../../../logs/');


    beforeEach(() => {

        fs.rmSync(logPath, { recursive: true, force: true });

    });

    test('should create log files if they do not exits', () => {

        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);

    });

    test('Should save a log in all logs-all.log', () => {

        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'Test log message',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasources.test.ts'
        });

        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, { encoding: 'utf-8' });
        console.log('allLogs --->>>', allLogs);
        // {"level":"low","message":"Test log message","createdAt":"2025-10-21T13:14:03.254Z","origin":"file-system.datasources.test.ts"}

        expect(allLogs).toContain(log.message);
        expect(allLogs).toContain(log.origin);
        expect(allLogs).toContain(log.level);
        expect(allLogs).toContain(JSON.stringify(log));

    });

    test('Should save a log in all logs-all.log and logs-medium.log', () => {

        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'Test log message',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasources.test.ts'
        });

        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, { encoding: 'utf-8' });
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, { encoding: 'utf-8' });

        expect(allLogs).toContain(log.message);
        expect(allLogs).toContain(log.origin);
        expect(allLogs).toContain(log.level);
        expect(allLogs).toContain(JSON.stringify(log));

        expect(mediumLogs).toContain(log.message);
        expect(mediumLogs).toContain(log.origin);
        expect(mediumLogs).toContain(log.level);
        expect(mediumLogs).toContain(JSON.stringify(log));

    });


    test('Should save a log in all logs-all.log and logs-high.log', () => {

        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'Test log message',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasources.test.ts'
        });

        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, { encoding: 'utf-8' });
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, { encoding: 'utf-8' });

        expect(allLogs).toContain(log.message);
        expect(allLogs).toContain(log.origin);
        expect(allLogs).toContain(log.level);
        expect(allLogs).toContain(JSON.stringify(log));

        expect(highLogs).toContain(log.message);
        expect(highLogs).toContain(log.origin);
        expect(highLogs).toContain(log.level);
        expect(highLogs).toContain(JSON.stringify(log));

    });

    test('Should return all logs', async () => {

        const logDataSource = new FileSystemDataSource();
        const logLow = new LogEntity({
            message: 'Test log message low',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasources.test.ts low'
        });
        const logMedium = new LogEntity({
            message: 'Test log message medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasources.test.ts medium'
        });
        const logHigh = new LogEntity({
            message: 'Test log message high',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasources.test.ts high'
        });

        await logDataSource.saveLog(logLow);
        await logDataSource.saveLog(logMedium);
        await logDataSource.saveLog(logHigh);

        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));

    });

    test('Should not throw an error if path exists', () => {

        new FileSystemDataSource();
        new FileSystemDataSource();

        expect(true).toBeTruthy();

    });

    test('Should throw an error if severity level is not denied', async () => {

        const logDataSource = new FileSystemDataSource();
        const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;

        try {
            await logDataSource.getLogs(customSeverityLevel);
            expect(true).toBeFalsy();
        } catch (error) {
            const errorString = `${error}`;
            expect(errorString).toContain(`${customSeverityLevel} not implemented`);

        }

    });

});