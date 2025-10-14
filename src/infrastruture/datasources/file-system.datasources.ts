
import fs from 'fs';

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";




export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFile();
    }

    private createLogsFile = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if (fs.existsSync(path)) return;

            fs.writeFileSync(path, '');

        });

    }

    async saveLog(newlog: LogEntity): Promise<void> {

        const LogAsJson = `${JSON.stringify(newlog)}\n`;

        fs.appendFileSync(this.allLogsPath, LogAsJson);

        if (newlog.level == LogSeverityLevel.low) return;

        if (newlog.level == LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, ` ${JSON.stringify(newlog)}\n`);
            return;
        } else {
            fs.appendFileSync(this.highLogsPath, ` ${JSON.stringify(newlog)}\n`);
            return;
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, { encoding: 'utf-8' });
        if ( content === '' ) return [];
        const logs = content.split('\n').map(LogEntity.fromJson);
        // const logs = content.split('\n').map(
        //     log => LogEntity.fromJson(log)
        // );
        return logs;

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }

}
