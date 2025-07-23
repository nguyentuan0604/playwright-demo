# Playwright Test Framework

A robust and scalable end-to-end testing framework built with Playwright, featuring Page Object Model (POM) design pattern, environment-specific configurations, and comprehensive CI/CD integration.

## Introduction

This framework provides a complete solution for automated testing of web applications with the following key features:

- **Page Object Model (POM)**: Maintainable and reusable test components
- **Environment Management**: Support for multiple environments (dev, staging)
- **Allure Reporting**: Detailed test reports and analytics
- **GitHub Actions CI/CD**: Automated testing pipeline
- **TypeScript Support**: Type-safe test development
- **Modular Architecture**: Organized locators, utilities, and page objects

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playwright-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Set up environment configuration**
   ```bash
   # Copy environment files (if not already present)
   cp .profiles/.env.dev .profiles/.env.dev
   cp .profiles/.env.staging .profiles/.env.staging
   ```

## Test Execution

### Local Test Execution

**Run all tests:**
```bash
npx playwright test
```

**Run tests with specific environment:**
```bash
# Development environment (default)
TEST_ENV=dev npx playwright test

# Staging environment
TEST_ENV=staging npx playwright test
```

**Run specific test file:**
```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/pim-search.spec.ts
```

**Run tests with specific tag:**
```bash
npx playwright test --grep "@login"
npx playwright test --grep "@pim-search"
```

**Run tests in headed mode (visible browser):**
```bash
npx playwright test --headed
```

**Run tests with debug mode:**
```bash
npx playwright test --debug
```

**Run tests with specific browser/project:**
```bash
# Run tests on Chromium only
npx playwright test --project=Chromium

# Run tests on Firefox only
npx playwright test --project=Firefox

# Run tests on WebKit (Safari) only
npx playwright test --project=WebKit

# Run tests on multiple browsers
npx playwright test --project=Chromium --project=Firefox
```

**Run tests with specific browser and environment:**
```bash
# Chromium with development environment
TEST_ENV=dev npx playwright test --project=Chromium

# Firefox with staging environment
TEST_ENV=staging npx playwright test --project=Firefox
```

### Test Reports

**Generate HTML report:**
```bash
npx playwright show-report
```

**Generate Allure report:**
```bash
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

## CI/CD Integration with GitHub Actions

The framework includes a comprehensive CI/CD pipeline using GitHub Actions.

### Manual Workflow Execution

1. **Navigate to GitHub Actions**
   - Go to your repository on GitHub
   - Click on the "Actions" tab

2. **Select Workflow**
   - Choose "Playwright Tests" workflow

3. **Configure Environment**
   - Click "Run workflow"
   - Select environment from dropdown:
     - `dev`: Development environment
     - `staging`: Staging environment
   - Click "Run workflow"

### Workflow Features

- **Environment Selection**: Choose between dev and staging environments
- **Parallel Execution**: Tests run in parallel for faster execution
- **Artifact Generation**: Test reports and screenshots are saved as artifacts
- **Allure Integration**: Comprehensive test analytics and reporting
- **Timeout Management**: 60-minute timeout for complete test execution

### Artifacts

The workflow generates the following artifacts:
- **Playwright Reports**: HTML reports with screenshots and videos
- **Allure Reports**: Detailed test analytics and trends
- **Test Results**: JSON files for further analysis

## Framework Structure

```
playwright-demo/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD pipeline
├── locators/
│   ├── login-locators.ts          # Login page locators
│   └── pim-locators.ts            # PIM page locators
├── pages/
│   ├── base-page.ts               # Base page object class
│   ├── login-page.ts              # Login page object
│   ├── pim-page.ts                # PIM page object
│   └── fixtures.ts                # Custom test fixtures
├── .profiles/
│   ├── .env.dev                   # Development environment config
│   └── .env.staging               # Staging environment config
├── tests/
│   ├── login.spec.ts              # Login test suite
│   └── pim-search.spec.ts         # PIM search test suite
├── utilities/
│   ├── constants.ts               # Environment-aware constants
│   └── generate.ts                # Utility functions
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Project dependencies
└── README.md                      # This file
```

### Key Components

#### **Page Objects (`pages/`)**
- **BasePage**: Common functionality for all page objects
- **LoginPage**: Login functionality and locators
- **PimPage**: PIM module functionality and locators
- **Fixtures**: Custom test fixtures for dependency injection

#### **Locators (`locators/`)**
- Centralized locator definitions
- XPath and CSS selector support
- Environment-specific locators

#### **Utilities (`utilities/`)**
- **Constants**: Environment-aware configuration
- **Generate**: Utility functions for test data

#### **Environment Configuration (`.profiles/`)**
- `.env.dev`: Development environment settings
- `.env.staging`: Staging environment settings
- Dynamic environment loading based on `TEST_ENV`

#### **Test Suites (`tests/`)**
- Organized test files with descriptive names
- Tagged tests for selective execution
- Comprehensive test coverage

### Design Patterns

#### **Page Object Model (POM)**
- Encapsulates page-specific logic
- Reusable page interactions
- Maintainable test structure

#### **Fixture Pattern**
- Dependency injection for page objects
- Shared test setup and teardown
- Clean test code

#### **Environment Management**
- Dynamic configuration loading
- Environment-specific test data
- Flexible deployment options

## Contributing

1. Follow the existing code structure and patterns
2. Add appropriate test tags for new test suites
3. Update environment configurations as needed
4. Ensure all tests pass before submitting changes

## Support

For questions or issues, please refer to:
- [Playwright Documentation](https://playwright.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Allure Framework Documentation](https://docs.qameta.io/allure/)
