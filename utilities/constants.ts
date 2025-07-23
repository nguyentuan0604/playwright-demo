import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment-specific .env.<environment> file
const loadEnvironmentConfig = (): Record<string, string> => {
    const env = process.env.TEST_ENV ?? 'dev';
    const envPath = path.resolve(__dirname, `../.profiles/.env.${env}`);

    try {
        const result = dotenv.config({ path: envPath });
        return result.parsed ?? {};
    } catch (error) {
        console.warn(`Warning: Could not load .env.${env} file:`, error);
        return {};
    }
};

const config = loadEnvironmentConfig();

export class Constants {
    static readonly BASE_URL = config.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com/web/index.php';
    static readonly LOGIN_URL = config.LOGIN_URL ?? 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    static readonly DASHBOARD_URL = config.DASHBOARD_URL ?? 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';
    static readonly EMPLOYEE_LIST_URL = config.EMPLOYEE_LIST_URL ?? 'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList';
    static readonly validUsername = config.VALID_USERNAME ?? 'Admin';
    static readonly validPassword = config.VALID_PASSWORD ?? 'admin123';
    static readonly validEmployeeName = config.VALID_EMPLOYEE_NAME ?? 'Paul Collings';
    static readonly timeout = parseInt(config.TIMEOUT ?? '10000');
    static readonly headless = config.HEADLESS === 'true';
    static readonly slowMo = parseInt(config.SLOW_MO ?? '1000');
}