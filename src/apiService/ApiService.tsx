import { ApiResponse } from "../models/ApiResponse";

class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Generic GET method
    public async get<T>(endpoint: string): Promise<T> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result: ApiResponse<T> = await response.json();
            return result.data;
        } catch (error) {
            throw error
        }
    }

    public async post<T>(endpoint: string, payload: any): Promise<T> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result: ApiResponse<T> = await response.json();
            return result.data;
        } catch (error) {
            throw error
        }
    }
}

export default ApiService;