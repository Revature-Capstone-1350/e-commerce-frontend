
# SkyView Frontend

SkyView is an online shop dedicated to selling photos of our beautiful sky. With SkyView, people are able to easily view and purchase photos while making it fun!

[_Click here to view the official SkyView backend_](https://github.com/Revature-Capstone-1350/e-commerce-backend)

[![Node.js CI](https://github.com/Revature-Capstone-1350/e-commerce-frontend/actions/workflows/workflowUI.yml/badge.svg)](https://github.com/Revature-Capstone-1350/e-commerce-frontend/actions/workflows/workflowUI.yml)

# About SkyView

SkyView is a project written by Revature's May 9th, 2022 batch. As a  _first sprint_, it contains a functional e-commerce frontend. Users are able to:

-   Register and login to an account
-   View and edit their user profile
-   View products and add them to their cart
-   Checkout their products


### SkyView's frontend is written using the following technologies:

-   Node.js v16.14.2 -  _open-source backend JavaScript Runtime Environment_
-   TypeScript v4.6.4 - _highly compatible JS superset that adds strong typing_ 
-   React.js v18.1.0 -  _open-source library used to create Single Page Applications_
-   React Redux v4.2.0 - _JavaScript library for React to manage application state_
-   ESLint v8.20.0 - _code "linter" that enforces code convention and formatting_
-   Prettier v2.7.1 - _plugin that automates code formatting enforced by ESLint_
-   Axios v0.27.2 - _promise-based HTTP client_
- Jest v27.5.1 - _library for unit and integration testing_

# Building SkyView

Building SkyView requires the following:
- Node.js v16.14.2
- npm v8.5.0

### It is highly recommended that you stick with v16.14.2 as it is a LTS release and any future version may break compatibility or features may not work correctly.

To build, ensure that the backend is running. After cloning from the repository, change the Node.js version to v16.14.2 (if applicable) and run `npm i` to pull all required packages from the `package.json`. The `package.json` contains scripts to make an instance of the frontend or perform other actions, shown below.

 `build` and `start` have remote and local versions; the only difference is where the backend is located. Set the `REACT_APP_API_URL` variable in `.env` to the remote path of the backend. Otherwise, set it in-line for the local version of the backend.

`npm run start/npm start` - _creates an instance of the frontend without running ESLint._

`npm run build` - _attempts to build the frontend while running ESLint._

`npm run lint` - _runs ESLint to check for any formatting or convention issues._

`npm run lint:fix` - _attempts to fix any formatting and convention issues automatically._

`npm run format` - _reformats code based on the `.prettierrc` file._

`npm test` - _runs tests via Jest._