import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/ui/LoginPage';
import { usersUI } from '../../data/uiTestData';

// Expected error messages
const ERROR_MESSAGES = {
    locked: 'Epic sadface: Sorry, this user has been locked out.',
    empty: 'Epic sadface: Username is required',
    missingUsername: 'Epic sadface: Username is required',
    missingPassword: 'Epic sadface: Password is required',  
    incorrectCombination: 'Epic sadface: Username and password do not match any user in this service'
  };
  
  // User types should expect successful login
  const SUCCESSFUL_LOGIN_TYPES = new Set([
    'standard',
    'problem',
    'performance',
    'error',
    'visual'
  ]);

test.describe('Authentication Tests', () =>{
    for(const [userType, user] of Object.entries(usersUI)){
        test(`Login as ${userType}`, async ({page}) => {
            const loginPage = new LoginPage(page);
            await loginPage.navigate();
            await loginPage.login(user);

            if (SUCCESSFUL_LOGIN_TYPES.has(userType)) {
                // Successful login assertion
                await expect(page).toHaveURL(/inventory/);
              } else {
                // Error case assertions
                await expect(loginPage.errorMessage).toBeVisible();
                
                // Assertion to ensure userType is a key of ERROR_MESSAGES
                if (userType in ERROR_MESSAGES) {
                  await expect(loginPage.errorMessage).toHaveText(
                    ERROR_MESSAGES[userType as keyof typeof ERROR_MESSAGES]
                  );
                }
              }
        });
    }
});