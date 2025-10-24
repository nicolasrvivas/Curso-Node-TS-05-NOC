
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";




describe('SendEmailLogs Use Case', () => {

    const mockEmailService = {
        sendEmailWithFilesSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mocLogReposiyory: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mocLogReposiyory,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should send email logs when execute is called', async () => {

        const sendEmailLogs = new SendEmailLogs(
            mockEmailService as any,
            mocLogReposiyory,
        );

        const result = await sendEmailLogs.execute('nicolas.r.vivas@gmail.com');

        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFilesSystemLogs).toHaveBeenCalledTimes(1);
        expect(mocLogReposiyory.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mocLogReposiyory.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Log email sent",
            origin: "send-email-logs.ts"
        });
    });

    test('should log in case of error', async () => {

        mockEmailService.sendEmailWithFilesSystemLogs.mockResolvedValueOnce(false);

        const result = await sendEmailLogs.execute('nicolas.r.vivas@gmail.com');

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFilesSystemLogs).toHaveBeenCalledTimes(1);
        expect(mocLogReposiyory.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mocLogReposiyory.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "high",
            message: "Error: Email log not sent",
            origin: "send-email-logs.ts"
        });
    });

});