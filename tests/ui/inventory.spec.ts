import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/ui/LoginPage";
import { InventoryPage } from "../../pages/ui/InventoryPage";
import { usersUI } from "../../data/uiTestData";

test.describe('Inventory Management Tests', () =>{
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(usersUI.standard);

        inventoryPage = new InventoryPage(page);
        await inventoryPage.VerifyInventoryPageLoaded();
    });

    test('Add and remove item from cart, then verify cart badge', async () =>{
        //Add 2 items cart
        await inventoryPage.addItemByIndex(0);
        await inventoryPage.addItemByIndex(1);
        //Check if the item is added to the cart
        await inventoryPage.verifyItemsInCart(2);
        //Remove item
        await inventoryPage.removeItemByIndex(0);
        await inventoryPage.verifyItemsInCart(1);
    });

    test('should sort items A-Z and Z-A', async () => {
        //Verify Sort A-Z
        await inventoryPage.sortBy('az');
        const namesAsc = await inventoryPage.getItemNames();
        const sortedAsc = [...namesAsc].sort((a,b) => a.localeCompare(b));
        expect(namesAsc).toEqual(sortedAsc);

        //Verify Sort Z - A
        await inventoryPage.sortBy('za');
        const namesDes = await inventoryPage.getItemNames();
        const sortedDes = [...namesDes].sort((a,b) => b.localeCompare(a));
        expect(namesDes).toEqual(sortedDes);
    });

    test('should sort items by price low to high and high to low', async () => {
        //Low to high
        await inventoryPage.sortBy('lohi');
        const pricesLH = await inventoryPage.getItemPrices();
        const sortedLH = [...pricesLH].sort((a,b) => a - b);
        expect(pricesLH).toEqual(sortedLH);

        //High to low
        await inventoryPage.sortBy('hilo');
        const pricesHL = await inventoryPage.getItemPrices();
        const sortedHL = [...pricesHL].sort((a,b) => b - a);
        expect(pricesHL).toEqual(sortedHL);
    });
});