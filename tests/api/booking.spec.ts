import test, { APIRequestContext, expect } from "@playwright/test";
import { BookingAPI } from "../../pages/api/BookingAPI";
import { AuthAPI } from "../../pages/api/AuthAPI";
import { bookingData, partialUpdateData, usersAPI } from "../../data/apiTestData";

test.describe('Booking API Tests', () => {
    let bookingAPI: BookingAPI;
    let newBookingId: number;
    let request: APIRequestContext;
    let token: string | undefined;

    test.beforeAll(async ({ playwright }) => {
        // Create a new APIRequestContext manually
        request = await playwright.request.newContext();
        bookingAPI = new BookingAPI(request);

        const auth = new AuthAPI(request);
        await auth.login(usersAPI.admin); // Login to get the token
        token = auth.token; // Store the token for later use

        const response = await bookingAPI.createBooking(bookingData.validBooking);
        const responseBody = await response.json();
        newBookingId = responseBody.bookingid; // Store the new booking ID for later use
    });

    test.afterAll(async () => {
        if (newBookingId) {
            if (token) {
                await bookingAPI.deleteBooking(newBookingId, token);
            } else {
                throw new Error("Token is undefined");
            }
        }
        // Dispose the request context
        await request.dispose();
    });

    test('get booking by ID', async () => {
        const response = await bookingAPI.getBookingById(newBookingId);

        // Validate that the response body contains the expected properties
        expect(response.firstname).toBe( 'Jim');
        expect(response.lastname).toBe('Brown');
        expect(response.totalprice).toBe(111);
        expect(response.depositpaid).toBe(true);
        expect(response.bookingdates.checkin).toBe('2018-01-01');
        expect(response.bookingdates.checkout).toBe('2019-01-01');
        expect(response.additionalneeds).toBe('Breakfast');
    });

    test('create booking', async () => {
        const response = await bookingAPI.createBooking(bookingData.validBooking);
        const responseBody = await response.json();

        // Validate that the response body contains the expected properties
        expect(responseBody.bookingid).toBeTruthy();
        expect(responseBody.booking).toEqual(bookingData.validBooking);
    });

    test('update booking', async () => {
        const response = await bookingAPI.updateBooking(newBookingId, bookingData.updatedBooking, token!);
        const responseBody = await response.json();

        // Validate that the response body contains the expected properties
        expect(responseBody.firstname).toBe('Tulani');
        expect(responseBody.lastname).toBe('Makhonco');
        expect(responseBody.totalprice).toBe(2000);
        expect(responseBody.depositpaid).toBe(false);
        expect(responseBody.bookingdates.checkin).toBe('2020-01-01');
        expect(responseBody.bookingdates.checkout).toBe('2021-01-01');
        expect(responseBody.additionalneeds).toBe('Dinner');
    });

    test('partial update booking', async () => {
        const response = await bookingAPI.partialUpdateBooking(newBookingId, partialUpdateData, token!);
        const responseBody = await response.json();

        // Validate that the response body contains the expected properties
        expect(responseBody.firstname).toBe(partialUpdateData.firstname);
        expect(responseBody.lastname).toBe(partialUpdateData.lastname);
    });

    test('delete booking', async () => {
        const response = await bookingAPI.deleteBooking(newBookingId, token!);
        expect(response.status()).toBe(201); // Check if the status code is 201 (Created)
    });
});