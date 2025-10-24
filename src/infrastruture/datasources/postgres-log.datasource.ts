import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../generated/prisma/client";

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];

        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level
            }
        });
        console.log('Postgres saved')
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const dbLogs = await prismaClient.logModel.findMany({
            where: { level }
        });

        return dbLogs.map(LogEntity.fromObject)
    }

}

/**
 async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        // await newLog.save();
        console.log('Mongo Log created Cambio:', newLog.id);
    }
 */
// const prisma = new PrismaClient();
// const newLog = await prisma.logModel.create({
//     data: {
//         level: 'HIGH',
//         message: 'Test message',
//         origin: 'App.ts'
//     }
// });
// console.log({ newLog })