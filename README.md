# 🐞 Issue Tracker

A simple yet powerful **Issue Tracker** built with **Angular (frontend)** and **Python REST API (backend)**.  
This project demonstrates a clean **full-stack architecture** with features like search, filters, sorting, pagination, and CRUD operations for issues.

---

## ✨ Features

### 🔧 Backend (Python)
- REST API with the following endpoints:
  - `GET /health` → Health check
  - `GET /issues` → Search, filter (status, assignee), sort (priority, updatedAt), paginate
  - `GET /issues/:id` → Fetch single issue
  - `POST /issues` → Create new issue (auto id, timestamps)
  - `PUT /issues/:id` → Update existing issue (refresh updatedAt)
- Auto-generated **id**, `createdAt`, and `updatedAt`

### 🎨 Frontend (Angular)
- **Issues List Page**
  - Table view of issues: `id`, `title`, `status`, `priority`, `assignee`, `updatedAt`
  - Search box with **debounced input**
  - Filters by **status**, **priority**, **assignee**
  - Sorting by **priority** and **updatedAt**
  - Pagination with `page` and `pageSize`
  - Row click → Navigate to **Issue Detail**
  - Row-level **Edit** button

- **Issue Detail Page**
  - Display full **JSON view** of issue
  - Opens in a drawer / separate route

- **Issue Form**
  - Create and update issues
  - Reactive forms with validation

---

## 📂 Project Structure

```bash
frontend/
└── src/app/
    ├── core/                # Models & Services
    │   ├── models/
    │   │   └── issue.model.ts
    │   └── services/
    │       └── issue.service.ts
    ├── features/
    │   └── issues/          # Feature Module
    │       ├── issue-detail/
    │       ├── issue-form/
    │       ├── issue-list/
    │       ├── issues-routing.module.ts
    │       └── issues.module.ts
    └── shared/              # Shared styles & utilities
```
##🚀**Getting Started**
🔹 Backend (Python)

Clone the repo and navigate to backend:

cd backend


Create virtual environment & install dependencies:

python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt


Run the server:

uvicorn main:app --reload


Backend runs at: http://localhost:8000

🔹 Frontend (Angular)

Navigate to frontend:

cd frontend


Install dependencies:

npm install


Start dev server:

ng serve


Frontend runs at: http://localhost:4200

🛠 Tech Stack

Frontend: Angular 18, SCSS, RxJS

Backend: Python (FastAPI / Flask), REST APIs

Database: (In-memory / SQLite / MongoDB – configurable)

Tooling: TypeScript, Angular CLI, Reactive Forms

📸 Screenshots (Optional)

Add screenshots of your UI here, e.g. list page, detail view, create form.

🤝 Contributing

Contributions are welcome!

Fork the repo

Create your feature branch (git checkout -b feature/awesome-feature)

Commit changes (git commit -m 'Add awesome feature')

Push branch (git push origin feature/awesome-feature)

Open a Pull Request 🚀

📜 License

This project is licensed under the MIT License.

🙌 Acknowledgements

Angular team for the amazing framework

Python & FastAPI/Flask for backend simplicity

You, for checking out this project ✨
