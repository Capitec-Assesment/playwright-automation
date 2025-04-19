import { Page, Locator, expect } from "@playwright/test";
import { CHECKOUT_COMPLETE_MESSAGE, checkoutInfo, ERROR_MESSAGE, TITLE } from "../../data/uiTestData";

export class CheckoutPage{
    readonly page: Page;
    readonly title: Locator;
    readonly checkoutBtn: Locator;
    readonly firstname: Locator;
    readonly lastname: Locator;
    readonly postalCode: Locator;
    readonly continueBtn: Locator;
    readonly cancelBtn: Locator;
    readonly cartList: Locator;
    readonly summaryInfo: Locator;
    readonly finishBtn: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backToHomeBtn: Locator;
    readonly error: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = page.locator('[data-test="title"]')
        this.checkoutBtn = page.locator('[data-test="checkout"]');
        this.firstname = page.locator('[data-test="firstName"]');
        this.lastname = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.cancelBtn = page.locator('[data-test="cancel"]');
        this.cartList = page.locator('[data-test="cart-list"]');
        this.summaryInfo = page.locator('.summary_info');
        this.finishBtn = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.backToHomeBtn = page.locator('[data-test="back-to-products"]');
        this.error = page.locator('[data-test="error"]');
    }

    async clickCheckout(){
        await this.checkoutBtn.click();
        expect(this.title).toHaveText(TITLE.CHECKOUT_YOUR_INFORMATION);
    }

    async fillInfomation(user: {firstname: string; lastname: string; postalCode: string}){
        await this.firstname.fill(user.firstname);
        await this.lastname.fill(user.lastname);
        await this.postalCode.fill(user.postalCode);
    }

    async clickCancel(){
        await this.cancelBtn.click();
    }

    async clickCancelCheckoutStepOne(){
        await this.cancelBtn.click();
        await expect(this.title).toHaveText(TITLE.CHECKOUT_YOUR_CART);
    }

    async clickCancelCheckoutStepTwo(){
        await this.cancelBtn.click();
        await expect(this.title).toHaveText(TITLE.PRODUCTS);
    }

    async clickContinueCheckout(){
        await this.continueBtn.click();
        await expect(this.title).toHaveText(TITLE.CHECKOUT_OVERVIEW);
        await expect(this.cartList).toBeVisible();
        await expect(this.summaryInfo).toBeVisible();
    }

    async clickFinish(){
        await this.finishBtn.click();
    }

    async assertCheckoutComplete(){
        await expect(this.title).toHaveText(TITLE.CHECKOUT_COMPLETE);
        await expect(this.completeHeader).toHaveText(CHECKOUT_COMPLETE_MESSAGE.HEADER);
        await expect(this.completeText).toHaveText(CHECKOUT_COMPLETE_MESSAGE.TEXT);
        await expect(this.backToHomeBtn).toBeVisible();
    }

    async clickBackToHome(){
        await this.backToHomeBtn.click();
        await expect(this.title).toHaveText(TITLE.PRODUCTS);
        await expect(this.page).toHaveURL(/inventory\.html/);
    }

    async assertEmptyFieldsStepOne(){
        // Click the continue button with empty fields
        await this.continueBtn.click();
        await expect(this.error).toHaveText(ERROR_MESSAGE.FIRST_NAME_REQUIRED);

        //fill only the first name field
        await this.firstname.fill(checkoutInfo.user1.firstname);
        await this.continueBtn.click();
        await expect(this.error).toHaveText(ERROR_MESSAGE.LAST_NAME_REQUIRED);

        //fill last name field
        await this.lastname.fill(checkoutInfo.user1.lastname);
        await this.continueBtn.click();
        await expect(this.error).toHaveText(ERROR_MESSAGE.POSTAL_CODE_REQUIRED);

        //postal code field and clear first name field
        await this.postalCode.fill(checkoutInfo.user1.postalCode);
        await this.firstname.fill('');
        await this.continueBtn.click();
        await expect(this.error).toHaveText(ERROR_MESSAGE.FIRST_NAME_REQUIRED);
    }
}