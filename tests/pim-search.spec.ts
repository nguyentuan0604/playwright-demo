import { test, expect } from '../pages/fixtures';
import { Constants } from '../utilities/constants';
import { Generate } from '../utilities/generate';

// @pim-search

test.describe('PIM Employee List Search', { tag: ['@pim-search'] }, () => {
    test.beforeEach(async ({ loginPage, pimPage }) => {
        await loginPage.goto(Constants.LOGIN_URL);
        await loginPage.login(Constants.validUsername, Constants.validPassword);
        await pimPage.navigateToEmployeeList();
    });

    test('@007 Verify user can search employees with valid input', async ({ pimPage }) => {
        await pimPage.searchEmployee(Constants.validEmployeeName);
        await expect(pimPage.getResultsTable()).toContainText(Constants.validEmployeeName);
    });

    test('@008 Verify search with empty input returns all employees', async ({ pimPage }) => {
        await pimPage.searchEmployee('');
        await expect(pimPage.getResultsTable()).toBeVisible();
    });

    test('@009 Verify Reset button clears search criteria and resets the list', async ({ pimPage }) => {
        await pimPage.searchEmployee(Constants.validEmployeeName);
        await pimPage.resetSearch();
        expect(await pimPage.getEmployeeNameValue()).toBe('');
        await expect(pimPage.getResultsTable()).toBeVisible();
    });

    test('@010 Verify search using special characters in the name field', async ({ pimPage }) => {
        const specialChars = '@#!$%';
        await pimPage.searchEmployee(specialChars);
        expect(await pimPage.isNoRecordsFoundVisible()).toBeTruthy();
    });

    test('@011 Verify search using extremely long strings (e.g. >255 characters)', async ({ pimPage }) => {
        const longString = Generate.generateRandomString(300);
        await pimPage.searchEmployee(longString);
        await expect(pimPage.characterLimitError).toBeVisible();
    });

    test('@012 Verify case insensitivity in employee name search', async ({ pimPage }) => {
        await pimPage.searchEmployee(Constants.validEmployeeName.toLowerCase());
        await expect(pimPage.getResultsTable()).toContainText(Constants.validEmployeeName);
    });

    test('@013 Verify search with leading/trailing spaces in input', async ({ pimPage }) => {
        await pimPage.searchEmployee(`  ${Constants.validEmployeeName}  `);
        expect(await pimPage.isNoRecordsFoundVisible()).toBeTruthy();
    });

    test('@014 Verify search returns no results with invalid employee name', async ({ pimPage }) => {
        await pimPage.searchEmployee('nonexistingname123');
        expect(await pimPage.isNoRecordsFoundVisible()).toBeTruthy();
    });

    test('@015 Verify behavior when all fields are filled with incorrect values', async ({ pimPage }) => {
        await pimPage.searchEmployee('nonexistingname123');
        expect(await pimPage.isNoRecordsFoundVisible()).toBeTruthy();
    });

}); 