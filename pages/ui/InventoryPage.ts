import { expect, Locator, Page } from "@playwright/test";
import { TITLE } from "../../data/uiTestData";

export class InventoryPage{
    readonly page: Page;
    readonly title: Locator;
    readonly items: Locator;
    readonly addToCartBtn: Locator;
    readonly removeBtn: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator ;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.items = page.locator('.inventory_item');
        this.itemNames = page.locator('[data-test="inventory-item-name"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
        this.addToCartBtn = page.locator('button:has-text("Add to cart")');
        this.removeBtn = page.locator('button:has-text("Remove")');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');       
    }

    async VerifyInventoryPageLoaded(){
        await expect(this.title).toHaveText(TITLE.PRODUCTS);
        //Check if items are loaded
        expect(await this.items.count()).toBeGreaterThan(2);
    }

    async getItemNames(): Promise<string[]>{
        return this.itemNames.allTextContents();
    }

    async getItemPrices(): Promise<number[]>{
        const prices = await this.itemPrices.allTextContents();
        return prices.map(p => +p.replace('$',''));
    }

    async addItemByIndex(index: number){
        await this.addToCartBtn.nth(index).click();
    }

    async removeItemByIndex(index: number){
        await this.removeBtn.nth(index).click();
    }

    async verifyItemsInCart(count: number){
        await expect(this.cartBadge).toHaveText(count.toString());
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'){
        await this.sortDropdown.selectOption(option);
    }
}