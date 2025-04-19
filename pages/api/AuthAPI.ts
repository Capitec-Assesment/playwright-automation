import { APIRequestContext, expect } from "@playwright/test";
import { apiBaseUrl } from "../../data/apiTestData";

export class AuthAPI{
    readonly request: APIRequestContext;
    token: string | undefined;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async login(user: {username: string, password: string}) {
        const response = await this.request.post(`${apiBaseUrl}/auth`, {
            data: {
                username: user.username,
                password: user.password
            }
        });

        const responseBody = await response.json();
        this.token = responseBody.token;

        if (responseBody.token) {
            //successful login
            expect(this.token).toBeTruthy();
            expect(typeof this.token).toBe('string');
        }
        else {
            //failed login
            expect(responseBody).toHaveProperty('reason');
            expect(responseBody.reason).toEqual('Bad credentials');
        }
    }
}