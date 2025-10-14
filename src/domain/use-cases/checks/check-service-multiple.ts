import { LogRepositoryImpl } from "../../../infrastruture/repositories/log.repository.impl";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallBack = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private successCallBack: SuccessCallBack,
        private errorCallBack: ErrorCallBack,
    ) { }
    private callLogs(log: LogEntity) {
        this.logRepository.forEach(logRepository => {
            logRepository.saveLog(log);
        });
    }
    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service for url: ${url}`);
            }

            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: 'CheckService'
            });
            this.callLogs(log);
            this.successCallBack && this.successCallBack();

            // console.log(`Status for ${url}: ${req.status} is OK`);
            return true;

        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: 'CheckService'
            });
            this.callLogs(log);
            this.errorCallBack && this.errorCallBack(errorMessage);

            return false
        }

    }
}