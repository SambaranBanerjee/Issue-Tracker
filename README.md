# 🐞 Simple Issue Tracker

This is a simple yet powerful full-stack **Issue Tracker** built with **Angular** for the frontend and a **Python REST API** for the backend. The project is designed to be a clean, practical example of a full-stack application, demonstrating key features like search, filters, sorting, pagination, and full CRUD (Create, Read, Update, Delete) operations for issues.

-----

## ✨ Features

### 🔧 Backend (Python)

The backend is a REST API with the following endpoints:

  * `GET /health` → A simple health check.
  * `GET /issues` → Fetches a list of issues with support for **search**, **filtering** (by status, assignee), and **sorting** (by priority, updatedAt). It also handles **pagination**.
  * `GET /issues/:id` → Fetches a single issue by its ID.
  * `POST /issues` → Creates a new issue. The `id`, `createdAt`, and `updatedAt` fields are auto-generated.
  * `PUT /issues/:id` → Updates an existing issue. This action automatically refreshes the `updatedAt` timestamp.

### 🎨 Frontend (Angular)

The frontend provides a user-friendly interface with the following components:

#### Issues List Page

  * A table view displaying key issue details: `id`, `title`, `status`, `priority`, `assignee`, and `updatedAt`.
  * A search box with **debounced input** for efficient searching.
  * Filters by `status`, `priority`, and `assignee`.
  * Sorting functionality for `priority` and `updatedAt` columns.
  * Pagination controls for navigating through issues with `page` and `pageSize` options.
  * Clicking a table row navigates to the **Issue Detail** page.
  * A dedicated **Edit** button on each row for quick updates.

#### Issue Detail Page

  * Displays the full **JSON view** of a single issue.
  * Can be opened as a separate route or in a drawer.

#### Issue Form

  * A reactive form with validation for both creating and updating issues.

-----

## 📂 Project Structure

```bash
frontend/
└── src/app/
    ├── core/               # Models & Services
    │   ├── models/
    │   │   └── issue.model.ts
    │   └── services/
    │       └── issue.service.ts
    ├── features/
    │   └── issues/         # Feature Module
    │       ├── issue-detail/
    │       ├── issue-form/
    │       ├── issue-list/
    │       ├── issues-routing.module.ts
    │       └── issues.module.ts
    └── shared/             # Shared styles & utilities
```

-----

## 🚀 Getting Started

### 🔹 Backend (Python)

1.  Clone the repository and navigate to the backend directory:

    ```bash
    cd backend
    ```

2.  Create a virtual environment and install the dependencies:

    ```bash
    python -m venv venv
    # For macOS/Linux:
    source venv/bin/activate
    # For Windows:
    venv\Scripts\activate

    pip install -r requirements.txt
    ```

3.  Run the server:

    ```bash
    uvicorn main:app --reload
    ```

    The backend will be running at `http://localhost:8000`.

### 🔹 Frontend (Angular)

1.  Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    ng serve
    ```

    The frontend will be running at `http://localhost:4200`.

-----

## 🛠 Tech Stack

  * **Frontend**: Angular 18, SCSS, RxJS
  * **Backend**: Python (FastAPI / Flask), REST APIs
  * **Database**: (In-memory / SQLite / MongoDB – configurable)
  * **Tooling**: TypeScript, Angular CLI, Reactive Forms

-----

## 📸 Screenshots (Optional)

<img width="1893" height="926" alt="Screenshot 2025-09-11 020838" src="https://github.com/user-attachments/assets/0f1ff553-5cc3-41ea-8f42-56a9ccab9c16" />


-----

## 🤝 Contributing

Contributions are welcome\! Please follow these steps:

1.  Fork the repository.
2.  Create your feature branch: `git checkout -b feature/awesome-feature`.
3.  Commit your changes: `git commit -m 'Add awesome feature'`.
4.  Push to the branch: `git push origin feature/awesome-feature`.
5.  Open a Pull Request.

-----

## 📜 License

This project is licensed under the MIT License.

-----

## 🙌 Acknowledgements

  * The Angular team for the amazing framework.
  * Python & FastAPI/Flask for backend simplicity.
  * You, for checking out this project\!
