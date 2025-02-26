# Solution: 

Given the limited time for the challenge, I focused on developing a few tests but implementing a feature rich test framework that lays strong foundations. This framework would make automating the remaining test scenarios pretty straight-forward. All we need to do is to follow the patterns and guidance available in the existing tests.

## Tools Used:

- PlayWright with TypeScript
- GitHub Actions for CI

## How to Run locally: 

### Pre-requisites: 
  - [Node JS runtime LTS Recommended](https://nodejs.org/en)
  - NPM
  - `.env` file : You need to create a .env file with following contents at the root of this project
    ```md
    BASEURL="https://opensource-demo.orangehrmlive.com/web/index.php"
    ```
NOTE: `.env` file is generally not checked in as it can have application/test secrets. Hence this is also added to `.gitignore` 
    
1. After cloning the project on your machine, run following from the project directory to install all the dependencies
```sh
# Install dependencies
npm install 
```
2. Running E2E tests locally
```sh
# Run headless mode
npm run test

# Run in UI mode
npm run test-ui

# Show Test reports
npm run report
```

## Observations: 
- The OrangeHRM demo instance periodically changed its language from English to Vietnamese. This affected the locator strategy as only css selectors were a reliable way to find elements.
- Some elements did not translate into the target language which probably indicates some issues with localization files. This need to be explored further before logging bugs around this.

## Framework Structure: 

This framework use [Page Object Model](https://playwright.dev/docs/pom) and follows standard playwright project structure as below: 

```sh
.
├── README.md                     # Start here :) 
├── node_modules
├── package-lock.json
├── package.json                  # Project configurations and run tasks
├── playwright-report
│   └── index.html
├── playwright.config.ts          # PlayWright config file
├── test-results
├── tests                         # Contains all tests
│   ├── orange-hrm-login.spec.ts  # test file are created here with `.spec.ts` extension
│   └── pages                     # Page classes are created here
│       ├── base-page.ts
│       ├── dashboard-page.ts
│       └── login-page.ts
├── .gitignore                    
├── .env                          # Environment configuration goes here
```

# cbus-code-challenge
Test Automation Code Challenge from Cbus Super

Automation Coding challenge:
Website: - https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

Requirement:
1. Create an Automation test suite that tests the above website 

- Login successful user and verify the dashboard is loaded successfully
- Incorrect user login verifies the login credentials are incorrect
- Navigate to admin page and add a new system user by not providing strong password combination showing the expected error message
- Navigate to admin page and add a new system user with all mandatory fields fill in and save the user details successfully
- Edit/ update existing system user
- Navigate to Recruitment page and search for One or two Job title candidates
- Navigate to My Info page and add contact details with attaching a document file and adding a comment
  
2. You are free to choose a programming language and framework that best matches the requirements
3. Choose a testing tool: There are many testing tools available like Selenium, Cypress, Playwright, JUnit, TestNG, and Cucumber that you can use to create the automation frame.
4. Identify test scenarios: Define the various test scenarios and test cases that you want to automate.
5. Write test scripts: Develop test scripts to automate the test scenarios.
6. Integrate with a CI/CD tool: Set up the test framework to integrate with a Continuous Integration/Continuous Deployment (CI/CD) tool, for example, Jenkins, to run the tests automatically whenever changes are made to the code.  If there is not time to implement this, please include a discussion in the README about how it could be integrated.
