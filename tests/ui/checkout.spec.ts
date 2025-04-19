import test from "@playwright/test";
import { userInfo } from "os";
import { CartPage } from "../../pages/ui/CartPage";
import { CheckoutPage } from "../../pages/ui/CheckoutPage";
import { InventoryPage } from "../../pages/ui/InventoryPage";
import { LoginPage } from "../../pages/ui/LoginPage";
import { usersUI, checkoutInfo } from "../../data/uiTestData";

test.describe('Checkout Tests', () =>{
    let checkoutPage: CheckoutPage;
    test.beforeEach(async ({page}) => {
            const loginPage = new LoginPage(page);
            await loginPage.navigate();
            await loginPage.login(usersUI.standard);
    
            const inventoryPage = new InventoryPage(page);
            const cartPage = new CartPage(page);
            checkoutPage = new CheckoutPage(page);
    
            await inventoryPage.addItemByIndex(0);
            await cartPage.goToCart();
            await checkoutPage.clickCheckout();         
    });

    test('should complete checkout and return to home page', async () => {
       await checkoutPage.fillInfomation(checkoutInfo.user1);
       await checkoutPage.clickContinueCheckout();
       await checkoutPage.clickFinish();
       await checkoutPage.assertCheckoutComplete();
       await checkoutPage.clickBackToHome();
    });

    test('should navigate back correctly using cancel buttons in checkout flow', async () => {
        await checkoutPage.clickCancelCheckoutStepOne();
        await checkoutPage.clickCheckout();
        await checkoutPage.fillInfomation(checkoutInfo.user1);
        await checkoutPage.clickContinueCheckout();
        await checkoutPage.clickCancelCheckoutStepTwo();     
    });

    test('should not proceed to checkout with empty fields', async () => {
        await checkoutPage.assertEmptyFieldsStepOne();
    });
});