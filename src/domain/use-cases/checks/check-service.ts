interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallBack = () => void;
type ErrorCallBack = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private successCallBack: SuccessCallBack,
        private errorCallBack: ErrorCallBack,
    ) {}

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service for url: ${url}`);
            }

            this.successCallBack();

            // console.log(`Status for ${url}: ${req.status} is OK`);
            return true;

        } catch (error) {

            // console.log(`${error}`);

            this.errorCallBack(`${error}`);

            return false
        }

    }
}