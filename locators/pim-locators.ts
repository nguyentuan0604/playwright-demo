export const PIMLocators = {
    employeeNameInput: '//label[contains(text(), "Employee Name")]/ancestor::div[contains(@class, "oxd-grid-item--gutters")]//input',
    searchButton: 'button:has-text("Search")',
    resetButton: 'button:has-text("Reset")',
    resultsTable: 'div.oxd-table-body',
    noRecordsFound: 'span.oxd-text--span:has-text("No Records Found")',
    errorText: 'text=Error',
    characterLimitError: 'text=Should not exceed 100 characters',
    pimMenu: 'a.oxd-main-menu-item:has-text("PIM")',
    employeeListLink: 'a.oxd-topbar-body-nav-tab-item:has-text("Employee List")',
}; 