import { expect, Locator, Page } from "@playwright/test";
import { TITLE } from "../../data/uiTestData";

export class CartPage{
    readonly page: Page;
    readonly title: Locator;
    readonly cartItems: Locator;
    readonly cartIcon: Locator;
    readonly continueShoppingBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = page.locator('[data-test="title"]')
        this.cartItems = page.locator('[data-test="inventory-item"]')
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');    
    }

    async goToCart(){
        await this.cartIcon.click();
        await expect(this.title).toHaveText(TITLE.CHECKOUT_YOUR_CART);
    }

    async verifyNumberCartItems(expectedCount: number){
        await expect(this.cartItems).toHaveCount(expectedCount);
    }

    async continueShopping(){
        await this.continueShoppingBtn.click();
        await expect(this.title).toHaveText(TITLE.PRODUCTS);
    }
}