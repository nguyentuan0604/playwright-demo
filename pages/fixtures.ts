import { test as base, expect } from '@playwright/test';
import { LoginPage } from './login-page';

// Define custom fixtures
interface CustomFixtures {
    loginPage: LoginPage;
}

export const test = base.extend<CustomFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});

export { expect }; 