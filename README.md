# Full-Stack Monorepo Project (Role-Based Access Control)

This project is a full-stack application featuring a React frontend and a Node.js (Express) backend with a comprehensive, database-driven role management system built with TypeORM.

## Architecture

-   **Backend**: Node.js, Express, TypeScript, TypeORM (connects to SQLite, MySQL, etc.)
-   **Frontend**: React, Vite, TypeScript, Bootstrap, Zustand
-   **Database**: The application is configured to use a local `db.sqlite` file for development but can be easily switched to MySQL, PostgreSQL, etc., by changing the `data-source.ts` file.

## Features

-   Database-driven role management system.
-   JWT-based authentication.
-   Hierarchical menu management.
-   Assignment of roles to users.
-   Assignment of menu access to roles.
-   Dynamic UI theming and layout switching.

## Getting Started

### 1. Prerequisites

-   Node.js (v18 or higher recommended)
-   npm

### 2. Backend Setup

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Create a `.env` file and add the following variables.
    ```
    BACKEND_PORT=8080
    JWT_SECRET=dev-secret
    ```
3.  Install dependencies:
    ```sh
    npm install
    ```
4.  **Seed the database**: This will create the `db.sqlite` file and populate it with initial data (admin user, roles, menus).
    ```sh
    npm run seed
    ```

### 3. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```

### 4. Running the Application

1.  From the **root** directory, install the `concurrently` dependency:
    ```sh
    npm install
    ```
2.  Start both frontend and backend servers concurrently:
    ```sh
    npm run dev
    ```

-   Frontend will be available at `http://localhost:5173`.
-   Backend API will be running on `http://localhost:8080`.

### Default Login

-   **Username**: `admin`
-   **Password**: `admin123`
