# Full-Stack Monorepo Project (React + Node.js)

This project is a full-stack application with a React frontend and a Node.js (Express) backend, set up in a monorepo-style structure.

## Project Structure

- `frontend/`: Contains the React (Vite + TypeScript) application.
- `backend/`: Contains the Node.js (Express + TypeScript) API.
- `package.json`: Root package file to manage and run both applications concurrently.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## Getting Started

1.  **Clone the repository**

2.  **Install root dependencies:**
    From the root directory, install the `concurrently` package.
    ```sh
    npm install
    ```

3.  **Install backend dependencies:**
    Navigate to the `backend` directory and install its dependencies.
    ```sh
    cd backend
    npm install
    cd ..
    ```

4.  **Install frontend dependencies:**
    Navigate to the `frontend` directory and install its dependencies.
    ```sh
    cd frontend
    npm install
    cd ..
    ```

## Available Scripts

All scripts should be run from the **root directory**.

-   `npm run dev`: Starts both the frontend and backend development servers concurrently.
    -   Frontend will be available at `http://localhost:5173`.
    -   Backend will be available at `http://localhost:8080`.
-   `npm run build`: Builds both the frontend and backend applications for production.
-   `npm run lint`: Lints the code in both the `frontend` and `backend` directories.

## API Endpoints

Here are the available API endpoints and examples of how to use them with `curl`.

### Health Check

-   **URL:** `/api/health`
-   **Method:** `GET`
-   **Description:** Checks the status of the API.
-   **Example:**
    ```sh
    curl http://localhost:8080/api/health
    ```
-   **Success Response:**
    ```json
    {
      "ok": true,
      "service": "api",
      "time": "2023-10-27T10:00:00.000Z"
    }
    ```

### Get Users

-   **URL:** `/api/v1/users`
-   **Method:** `GET`
-   **Description:** Retrieves a list of users.
-   **Example:**
    ```sh
    curl http://localhost:8080/api/v1/users
    ```
-   **Success Response:**
    ```json
    [
      {
        "id": 1,
        "name": "Alice"
      }
    ]
    ```
