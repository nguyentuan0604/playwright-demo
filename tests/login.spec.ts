import { test, expect } from '../pages/fixtures';
import { Constants } from '../utilities/constants';
import { Generate } from '../utilities/generate';

test.describe('Login and Dashboard Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto(Constants.LOGIN_URL);
    });

    test('Verify user can log in with valid credentials', async ({ loginPage, page }) => {
        await loginPage.login(Constants.validUsername, Constants.validPassword);
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Verify Dashboard is accessible after login', async ({ loginPage, page }) => {
        await loginPage.login(Constants.validUsername, Constants.validPassword);
        await expect(page).toHaveURL(/dashboard/);
        await expect(loginPage.dashboardHeader).toBeVisible();
    });

    test('Verify error message is displayed when login fields are empty', async ({ loginPage }) => {
        await loginPage.submitEmpty();
        await expect(loginPage.getUsernameRequiredError()).toHaveText('Required');
        await expect(loginPage.getPasswordRequiredError()).toHaveText('Required');
    });

    test('Verify login fails with long input strings', async ({ loginPage }) => {
        const longString = Generate.generateRandomString(256);
        await loginPage.login(longString, longString);
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('Verify login fails with invalid credentials', async ({ loginPage }) => {
        await loginPage.login('invalidUser', 'invalidPass');
        await expect(loginPage.errorMessage).toContainText('Invalid credentials');
    });

    test('Verify user cannot access Dashboard without logging in', async ({ page }) => {
        await page.goto(Constants.DASHBOARD_URL);
        await expect(page).toHaveURL(Constants.LOGIN_URL);
    });
}); 