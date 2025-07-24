import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { PIMLocators } from '../locators/pim-locators';

export class PimPage extends BasePage {
    readonly employeeNameInput: Locator;
    readonly searchButton: Locator;
    readonly resetButton: Locator;
    readonly resultsTable: Locator;
    readonly noRecordsFound: Locator;
    readonly errorText: Locator;
    readonly characterLimitError: Locator;
    readonly pimMenu: Locator;
    readonly employeeListLink: Locator;

    constructor(page: Page) {
        super(page);
        this.employeeNameInput = page.locator(PIMLocators.employeeNameInput);
        this.searchButton = page.locator(PIMLocators.searchButton);
        this.resetButton = page.locator(PIMLocators.resetButton);
        this.resultsTable = page.locator(PIMLocators.resultsTable);
        this.noRecordsFound = page.locator(PIMLocators.noRecordsFound);
        this.errorText = page.locator(PIMLocators.errorText);
        this.characterLimitError = page.locator(PIMLocators.characterLimitError);
        this.pimMenu = page.locator(PIMLocators.pimMenu);
        this.employeeListLink = page.locator(PIMLocators.employeeListLink);
    }

    async navigateToEmployeeList() {
        await this.pimMenu.click();
        await this.employeeListLink.click();
    }

    async searchEmployee(name: string) {
        await this.employeeNameInput.fill(name);
        await this.searchButton.click();
        await this.waitForSearchResults();
    }

    async resetSearch() {
        await this.resetButton.click();
    }

    getResultsTable() {
        return this.resultsTable;
    }

    async isNoRecordsFound(): Promise<boolean> {
        // Toast selector
        const infoToast = this.page.locator('div.oxd-toast-container.oxd-toast-container--bottom div.oxd-toast.oxd-toast--info.oxd-toast-container--toast');
        // No Records span selector
        const noRecordsSpan = this.noRecordsFound;

        // Wait up to 5s for either to appear
        const toastPromise = infoToast.waitFor({ timeout: 5000 }).then(() => true).catch(() => false);
        const spanPromise = noRecordsSpan.waitFor({ timeout: 5000 }).then(() => true).catch(() => false);

        // If either appears, consider it as "no records found"
        const result = await Promise.race([toastPromise, spanPromise]);
        // If toast appeared, wait for it to disappear before returning
        if (await infoToast.isVisible().catch(() => false)) {
            await infoToast.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => { });
        }
        return result;
    }

    async isErrorVisible() {
        return this.errorText.isVisible();
    }

    async isCharacterLimitErrorVisible() {
        return this.characterLimitError.isVisible();
    }

    async fillEmployeeName(name: string) {
        await this.employeeNameInput.fill(name);
    }

    async getEmployeeNameValue() {
        return this.employeeNameInput.inputValue();
    }

    async waitForSearchResults() {
        // Wait for either results table or toast to appear
        const tableLocator = this.page.locator('div.oxd-table-card').first();
        const infoToast = this.page.locator('div.oxd-toast-container.oxd-toast-container--bottom div.oxd-toast.oxd-toast--info.oxd-toast-container--toast');

        const appeared = await Promise.race([
            tableLocator.waitFor({ timeout: 5000 }).then(() => 'table').catch(() => null),
            infoToast.waitFor({ timeout: 5000 }).then(() => 'toast').catch(() => null)
        ]);

        // If toast appeared, wait for it to disappear
        if (appeared === 'toast') {
            await infoToast.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => { });
        }
    }
} 