import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";




describe('log.repository.impl.ts', () => {

    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const logRepository = new LogRepositoryImpl(mockLogDataSource);

    beforeEach(() => {
        jest.clearAllMocks();
    });



    test('saveLog should call datasource with arguments', async() => {

        const log = {level: LogSeverityLevel.high, message: 'Hola'} as LogEntity;
        await logRepository.saveLog(log);
        expect( mockLogDataSource.saveLog ).toHaveBeenCalledWith(log);

    });

    test('getLog should call datasource with arguments', async() => {

        const lowSeverity = LogSeverityLevel.low;
        await logRepository.getLogs(lowSeverity);
        expect( mockLogDataSource.getLogs ).toHaveBeenCalledWith(lowSeverity);


    });

});