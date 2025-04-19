## Playwright Test Automation
This repository contains test automation scripts using Playwright for UI and API testing. 
The tests are designed to validate the functionality of various web applications and APIs, such as the SauceDemo e-commerce site and Restful-Booker API.

## Requirements
To run the tests locally or on a CI/CD pipeline, ensure the following tools are installed:
- Node.js (LTS version)
- Playwright

## Getting Started
Follow the steps below:
### 1. Clone the Repository
Clone this repository to your local machine using the following command:
```sh
git clone https://github.com/Capitec-Assesment/playwright-automation.git
```

## 2. Install Dependencies
Install all required dependencies using npm:
```sh
npm install
```
After the repository is cloned, navigate into the project folder
```sh
cd playwright-automation
```

## 3. Run the Tests Locally
To run the Playwright tests locally, execute the following command:
```sh
npx run test
npx run test:headed
npx run test:ui
npx run mcr 
```
## Test Framework
### Test Targets
#### UI Tests:
- Authentication (multiple user types)
- Inventory management
- Shopping cart functionality
- Checkout process
 
#### API Tests:
- Authentication
- Booking CRUD operations (including DELETE method)
- Response validation
