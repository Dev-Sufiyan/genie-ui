export interface ApiResponse<T> {
    status: string;        // Status message (e.g., "success", "error")
    data: T;              // The data of generic type T
    statusCode: number;   // HTTP status code
}
