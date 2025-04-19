import { APIRequestContext, expect } from '@playwright/test';
import { apiBaseUrl } from '../../data/apiTestData';

export class BookingAPI{
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async getBookingById(bookingId: number): Promise<any> {
        return (await this.request.get(`${apiBaseUrl}/booking/${bookingId}`)).json();
       
    }

    async createBooking(bookingData: any): Promise<any> {
        const response = await this.request.post(`${apiBaseUrl}/booking`, {
            data: bookingData
        });
        return response;
    }

    async updateBooking(bookingId: number, bookingData: any, token: string): Promise<any> {
        const response = await this.request.put(`${apiBaseUrl}/booking/${bookingId}`, {
            data: bookingData,
            headers: {
                'Cookie': `token=${token}`,
            }
        });
        expect(response.ok()).toBeTruthy();
        return response;
    }

    async partialUpdateBooking(bookingId: number, bookingData: any, token: string): Promise<any> {
        const response = await this.request.patch(`${apiBaseUrl}/booking/${bookingId}`, {
            data: bookingData,
            headers: {
                'Cookie': `token=${token}`,
            }
        });
        expect(response.ok()).toBeTruthy();
        return response;
    }
    async deleteBooking(bookingId: number, token: string): Promise<any> {
        const response = await this.request.delete(`${apiBaseUrl}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`,
            }
        });
        return response;
    }

}