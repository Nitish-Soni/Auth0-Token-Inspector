# Auth0 Token Inspector Dashboard ([Live](https://auth0-token-inspector.2nison6.com))

A lightweight, responsive React application designed to help developers quickly test Auth0 authentication flows and inspect JSON Web Tokens (JWTs) on the fly.

Instead of hardcoding environment variables, this app allows you to input your Auth0 Tenant Domain, Client ID, and API Audience dynamically.
It then authenticates the user, retrieves the tokens, and displays both the raw and decoded Access and ID tokens.

## Features

- **Dynamic Multi-Tenant Configuration:** No `.env` files required. Swap between different Auth0 tenants, client IDs, and audiences in seconds.
- **B2B Organization Support:** Includes an optional `Organization ID` configuration field to test multi-tenant corporate enterprise login flows.
- **Shareable Test Environments:** Your entire configuration is safely encoded into URL search parameters (`?d=...&c=...&a=...&o=...`), allowing you to bookmark specific environments or share them with teammates.
- **Live JWT Decoder:** Displays both the raw cryptographic strings and fully parsed JSON structures for both `Access` and `ID` tokens.
- **Clean Component Architecture:** Reorganized out of a single file into isolated, modular, and maintainable React components.

## Prerequisites

Before running this app, ensure you have:

- [Node.js](https://nodejs.org/) installed on your machine.
- An active [Auth0](https://auth0.com/) account with a configured Application and API.

### Important Auth0 Configuration

For this app to work, you **must** configure your Application in the Auth0 Dashboard:

1. Follow the below Auth0 Document to Create an Application.<br/>
   https://auth0.com/docs/get-started/auth0-overview/create-applications
2. Once Created, Under **Application URIs**, add URL e.g., `http://localhost:5173` or `http://localhost:3000` (If using Local Development) or `https://auth0-token-inspector.2nison6.com` (If you just want to use my Website) to the following fields:
   - **Allowed Callback URLs**
   - **Allowed Logout URLs**
   - **Allowed Web Origins**
3. Save your Changes.
4. Copy the Domain and Client ID Value from the Settings Tab of the newly created Application.
5. Post which create an API using the below Auth0 Document.<br/>
   https://auth0.com/docs/get-started/auth0-overview/set-up-apis
6. Once the API is created go to Application Access Tab of your newly created API and Grant User Delegated Access to the Application created in the First Step.
7. Copy the Identifier Value from the Settings Tab of the newly created API.

## Getting Started

1. **Clone the repository:** <br/>
   `git clone [https://github.com/Nitish-Soni/Auth0-Token-Inspector.git](https://github.com/Nitish-Soni/Auth0-Token-Inspector)` <br/>
   `cd Auth0-Token-Inspector`
2. **Install Dependencies**<br/>
   `npm install`
3. **Run the Development Server**<br/>
   #If using Vite<br/>
   `npm run dev`<br/>
   #If using Create React App<br/>
   `npm start`

## Limitation

It works with all Application Type, except when Organizations are Involved. It needs to be a Single Page Application if Organization are involved as this App is built without a Server and uses the Auth0 React Library.
