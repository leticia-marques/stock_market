export class AppError
{
    public readonly message: string;
    public readonly errorCode: number;

    constructor(message: string, errorCode = 400)
    {
        this.message = message;
        this.errorCode = errorCode;
    }
}