import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    use: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        headless: true,
        actionTimeout: 10000,
        navigationTimeout: 10000,
    },
    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'WebKit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    reporter: [['list'], ['html'], ['allure-playwright']],
    testDir: 'tests',
}); 