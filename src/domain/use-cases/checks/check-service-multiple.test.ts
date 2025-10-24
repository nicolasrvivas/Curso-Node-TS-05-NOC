import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";




describe('CheckService Use Case', () => {

    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const successCallBack = jest.fn();
    const errorCallBack = jest.fn();

    const checkService = new CheckServiceMultiple(
        [mockRepo1, mockRepo2, mockRepo3],
        successCallBack,
        errorCallBack,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('should call successCallback when fetch return true', async () => {

        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallBack).toHaveBeenCalled();
        expect(errorCallBack).not.toHaveBeenCalled();

        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));


    });

    test('should cañll errorCallback when fetch return false', async () => {

        const wasOk = await checkService.execute('https://google.noexits.com');

        expect(wasOk).toBe(false);
        expect(successCallBack).not.toHaveBeenCalled();
        expect(errorCallBack).toHaveBeenCalled();

        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));


    });

});