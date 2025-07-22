import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    async waitForVisible(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
    }
} 