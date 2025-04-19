import { test } from "@playwright/test";
import { LoginPage } from "../../pages/ui/LoginPage";
import { CartPage } from "../../pages/ui/CartPage";
import { InventoryPage } from "../../pages/ui/InventoryPage";
import { usersUI } from "../../data/uiTestData";


test.describe('Cart Tests', () => {
    let cartPage: CartPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({page}) => {
        // Initialize pages for each test
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(usersUI.standard);

        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        //Add item to the cart before each test
        await inventoryPage.addItemByIndex(0);

        //Navigate to the cart page
        await cartPage.goToCart();
        
    });

    test('added items appear in the cart', async () =>{
        await cartPage.verifyNumberCartItems(1);
    });

    test('remove item from the cart', async () => {
        await inventoryPage.removeItemByIndex(0);
        await cartPage.verifyNumberCartItems(0);
    });

    test('continue shoping', async () => {
        await cartPage.continueShopping();
    });
});