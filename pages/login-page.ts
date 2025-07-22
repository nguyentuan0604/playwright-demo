import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { LoginLocators } from '../locators/login-locators';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly dashboardHeader: Locator;
    readonly requiredError: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator(LoginLocators.usernameInput);
        this.passwordInput = page.locator(LoginLocators.passwordInput);
        this.loginButton = page.locator(LoginLocators.loginButton);
        this.errorMessage = page.locator(LoginLocators.errorMessage);
        this.dashboardHeader = page.locator(LoginLocators.dashboardHeader);
        this.requiredError = page.locator(LoginLocators.requiredError);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async submitEmpty() {
        await this.loginButton.click();
    }

    getUsernameRequiredError(): Locator {
        return this.usernameInput.locator('xpath=ancestor::div[contains(@class, "oxd-form-row")]//span[contains(@class, "oxd-input-field-error-message")]');
    }

    getPasswordRequiredError(): Locator {
        return this.passwordInput.locator('xpath=ancestor::div[contains(@class, "oxd-form-row")]//span[contains(@class, "oxd-input-field-error-message")]');
    }
} 