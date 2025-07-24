# Playwright Test Framework

A robust and scalable end-to-end testing framework built with Playwright, featuring Page Object Model (POM) design pattern, environment-specific configurations, and comprehensive CI/CD integration.

## Introduction

This framework provides a complete solution for automated testing of web applications with the following key features:

- **Page Object Model (POM)**: Maintainable and reusable test components
- **Environment Management**: Support for multiple environments (dev, staging)
- **Allure Reporting**: Detailed test reports and analytics
- **GitHub Actions CI/CD**: Automated testing pipeline with manual workflow dispatch
- **TypeScript Support**: Type-safe test development
- **Modular Architecture**: Organized locators, utilities, and page objects
- **Flaky Test Handling**: Robust waiting strategies and conditional synchronization

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

The framework includes a streamlined CI/CD pipeline using GitHub Actions with manual workflow dispatch for maximum control and flexibility.

### Manual Workflow Execution

1. **Navigate to GitHub Actions**
   - Go to your repository on GitHub
   - Click on the "Actions" tab

2. **Select Workflow**
   - Choose "Playwright Tests" workflow

3. **Configure Parameters**
   - Click "Run workflow"
   - Select environment from dropdown:
     - `dev`: Development environment
     - `staging`: Staging environment
   - Select browser/project:
     - `Chromium`: Chrome-based browser
     - `Firefox`: Mozilla Firefox
     - `WebKit`: Safari engine
   - Click "Run workflow"

### Workflow Features

- **Manual Control**: On-demand execution with parameter selection
- **Environment Flexibility**: Choose between dev and staging environments
- **Browser Selection**: Test against specific browsers or all browsers
- **Parallel Execution**: Tests run in parallel for faster execution
- **Comprehensive Reporting**: Both Playwright and Allure reports generated
- **Artifact Management**: Test results and reports saved as downloadable artifacts
- **Timeout Protection**: 60-minute timeout for complete test execution

### Artifacts

The workflow generates the following artifacts:
- **Playwright Reports**: HTML reports with screenshots and videos
- **Allure Reports**: Detailed test analytics and trends
- **Test Results**: JSON files for further analysis

## Framework Structure & Rationale

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

### **Architecture Design Principles**

#### **1. Separation of Concerns**
- **Locators** (`locators/`): Centralized in dedicated files for easy maintenance and updates
- **Page Objects** (`pages/`): Encapsulate page-specific logic and interactions
- **Utilities** (`utilities/`): Reusable functions and environment configurations
- **Tests** (`tests/`): Focus purely on test logic and assertions
- **Environment Config** (`.profiles/`): Environment-specific settings without code changes

#### **2. Maintainability & Scalability**
- **Page Object Model**: Reduces code duplication and improves maintainability
- **Custom Fixtures**: Provides dependency injection for clean test setup
- **Environment Management**: Supports multiple environments without code changes
- **Modular Structure**: Easy to add new pages, locators, and test suites

#### **3. Test Stability & Reliability**
- **Conditional Waits**: Uses `Promise.race` and `waitFor` instead of fixed timeouts
- **Flaky Test Handling**: Implements robust waiting strategies for dynamic content
- **Error Handling**: Graceful handling of environment loading and element interactions
- **Type Safety**: TypeScript ensures compile-time error detection

#### **4. CI/CD Strategy**
- **Manual Workflow Dispatch**: Provides control over when and how tests run
- **Parameter Selection**: Allows testing specific environments and browsers
- **Single Job Design**: Simplified pipeline reduces complexity and execution time
- **Artifact Management**: Comprehensive reporting and result storage

### **Key Design Decisions**

#### **Why Page Object Model?**
- **Reusability**: Page interactions can be reused across multiple tests
- **Maintainability**: UI changes require updates in only one place
- **Readability**: Tests focus on business logic rather than implementation details
- **Testability**: Easier to unit test page interactions independently

#### **Why Custom Fixtures?**
- **Dependency Injection**: Clean separation between test setup and execution
- **Shared State**: Common setup and teardown across test suites
- **Type Safety**: TypeScript ensures correct fixture usage
- **Extensibility**: Easy to add new fixtures for additional functionality

#### **Why Environment Management?**
- **Flexibility**: Test against different environments without code changes
- **Security**: Sensitive data kept separate from code
- **Scalability**: Easy to add new environments (prod, qa, etc.)
- **Consistency**: Same test code works across all environments

#### **Why Manual CI/CD?**
- **Control**: Run tests when needed, not on every commit
- **Resource Management**: Avoid unnecessary CI/CD costs
- **Debugging**: Easier to troubleshoot specific test runs
- **Flexibility**: Choose specific environments and browsers for testing

#### **Why Allure Reporting?**
- **Rich Analytics**: Detailed test trends and metrics
- **Interactive Reports**: Better visualization of test results
- **Integration**: Works seamlessly with CI/CD pipelines
- **Customization**: Extensible reporting capabilities

### **Benefits of This Framework**

#### **For Developers**
- **Fast Feedback**: Parallel execution and efficient waiting strategies
- **Easy Debugging**: Comprehensive logging and error handling
- **Type Safety**: TypeScript prevents common runtime errors
- **Code Reuse**: Shared utilities and page objects reduce duplication

#### **For Test Engineers**
- **Maintainable Tests**: Clear structure and separation of concerns
- **Reliable Execution**: Robust handling of flaky elements and dynamic content
- **Comprehensive Reporting**: Multiple report formats for different stakeholders
- **Environment Flexibility**: Easy testing across different environments

#### **For DevOps**
- **Controlled Execution**: Manual workflow dispatch prevents resource waste
- **Artifact Management**: Organized storage of test results and reports
- **Scalable Pipeline**: Easy to extend for additional environments or browsers
- **Monitoring**: Clear visibility into test execution and results

### **Best Practices Implemented**

1. **Naming Conventions**: Consistent naming for files, classes, and methods
2. **Error Handling**: Graceful handling of environment and element errors
3. **Documentation**: Comprehensive README and inline code comments
4. **Configuration Management**: Environment-specific settings without code changes
5. **Test Organization**: Logical grouping of related test cases
6. **Reporting**: Multiple report formats for different use cases

## Contributing

1. Follow the existing code structure and patterns
2. Add appropriate test tags for new test suites
3. Update environment configurations as needed
4. Ensure all tests pass before submitting changes
5. Maintain the separation of concerns principle
6. Add comprehensive error handling for new features

## Support

For questions or issues, please refer to:
- [Playwright Documentation](https://playwright.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Allure Framework Documentation](https://docs.qameta.io/allure/)
