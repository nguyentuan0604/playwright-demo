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

    async isNoRecordsFoundVisible() {
        return this.noRecordsFound.isVisible();
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
        // Wait for either results table or no records found to appear
        await Promise.any([
            this.page.locator('span.oxd-text--span:has-text("No Records Found")').waitFor({ timeout: 5000 }),
            this.page.locator('div.oxd-table-card').first().waitFor({ timeout: 5000 })
        ]);
    }
} 