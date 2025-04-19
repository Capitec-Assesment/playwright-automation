import { Locator, Page } from "@playwright/test";
import { uiBaseUrl } from "../../data/uiTestData";

export class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]')
    }

    async navigate(){
        await this.page.goto(uiBaseUrl);
    }

    async login(user: {username: string; password: string}){
        await this.usernameInput.fill(user.username);
        await this.passwordInput.fill(user.password);
        await this.loginBtn.click();
    }
}