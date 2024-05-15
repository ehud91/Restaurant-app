export class ApiResponseDto {
    public success: string;
    public message: string;
    public data: object;
    public status: number;

    constructor(success, message, data, status) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.status = status;
    }
}