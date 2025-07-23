import { test as base, expect } from '@playwright/test';
import { LoginPage } from './login-page';
import { PimPage } from './pim-page';

// Define custom fixtures
interface CustomFixtures {
    loginPage: LoginPage;
    pimPage: PimPage;
}

export const test = base.extend<CustomFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    pimPage: async ({ page }, use) => {
        const pimPage = new PimPage(page);
        await use(pimPage);
    },
});

export { expect }; 