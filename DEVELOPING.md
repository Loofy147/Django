# Developing the Business Logic Academy

This document provides instructions for setting up and developing the Business Logic Academy application locally.

## Getting Started

To get started with the Business Logic Academy, you'll need to have the following installed on your local machine:

*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [pnpm](https://pnpm.io/)

Once you have these installed, you can follow these steps to get the project up and running:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/business-logic-academy.git
    ```

2.  **Install the dependencies:**

    ```bash
    pnpm install
    ```

3.  **Create a `.env` file:**

    Create a `.env` file in the root of the project and add the following environment variables:

    ```bash
    # .env

    # LLM Provider API Key (e.g., OpenAI)
    BUSINESS_AI_API_KEY="your-api-key-here"

    # LLM Model (optional, defaults to 'gpt-4o')
    BUSINESS_AI_MODEL="gpt-4o"

    # LLM API Endpoint (optional, defaults to OpenAI's public endpoint)
    BUSINESS_AI_ENDPOINT="https://api.openai.com/v1"
    ```

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    This will start the development server on [http://localhost:3000](http://localhost:3000).

## Scripts

The following scripts are available in the `package.json` file:

*   `dev`: Starts the development server.
*   `build`: Builds the application for production.
*   `start`: Starts the production server.
*   `lint`: Lints the codebase.

## Contributing

We welcome contributions from the community! If you'd like to contribute to the Business Logic Academy, please fork the repository and submit a pull request.
