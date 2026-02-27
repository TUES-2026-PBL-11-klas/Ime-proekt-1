# Library Management System 📚

Уеб базирана система за управление на библиотека, разработена като първи проект по предметите **ООП, РС, БД, ВОТ**.

## Описание

Системата позволява администриране на книги, потребители и заеми. Поддържа:

- Регистрация и автентикация на потребители (JWT)
- CRUD операции за книги (admin)
- Сортиране на книги по автор (азбучен ред) и филтриране по жанр
- Заемане и връщане на книги
- Проследяване на активни и просрочени заеми

## Tech Stack

| Слой | Технология |
|------|-----------|
| Backend | Node.js + Express |
| База данни | PostgreSQL |
| Автентикация | JWT (jsonwebtoken) + bcrypt |
| Контейнеризация | Docker + Docker Compose |

## Структура на проекта

```
├── src/
│   ├── index.js              # Entry point
│   ├── config/
│   │   └── database.js       # PostgreSQL connection pool
│   ├── models/
│   │   ├── User.js           # ООП модел за потребител
│   │   ├── Book.js           # ООП модел за книга
│   │   └── Loan.js           # ООП модел за заем
│   ├── controllers/
│   │   ├── UserController.js
│   │   ├── BookController.js
│   │   └── LoanController.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── bookRoutes.js
│   │   └── loanRoutes.js
│   ├── middleware/
│   │   └── auth.js           # JWT middleware
│   └── db/
│       └── init.sql          # SQL скрипт за инициализация
├── Dockerfile
├── docker-compose.yml
├── package.json
└── .env.example
```

## Бързо стартиране

### С Docker (препоръчително)

```bash
docker compose up --build
```

Сървърът ще бъде достъпен на `http://localhost:3000`.

### Без Docker (за разработка)

1. Уверете се, че имате работещ PostgreSQL и Node.js 18+.
2. Копирайте `.env.example` в `.env` и настройте стойностите.
3. Стартирайте:

```bash
cp .env.example .env
npm install
npm run dev
```

## API Ендпойнти

### Потребители (`/api/users`)

| Метод | Път | Описание | Достъп |
|-------|-----|----------|--------|
| POST | `/api/users/register` | Регистрация | Публичен |
| POST | `/api/users/login` | Вход (връща JWT) | Публичен |
| GET | `/api/users` | Всички потребители | Admin |

### Книги (`/api/books`)

| Метод | Път | Описание | Достъп |
|-------|-----|----------|--------|
| GET | `/api/books` | Списък книги | Публичен |
| GET | `/api/books?sortBy=author` | Сортиране по автор | Публичен |
| GET | `/api/books?genre=Fiction` | Филтриране по жанр | Публичен |
| GET | `/api/books/:id` | Детайли за книга | Публичен |
| POST | `/api/books` | Добавяне на книга | Admin |
| PUT | `/api/books/:id` | Редактиране | Admin |
| DELETE | `/api/books/:id` | Изтриване | Admin |

### Заеми (`/api/loans`)

| Метод | Път | Описание | Достъп |
|-------|-----|----------|--------|
| POST | `/api/loans` | Заемане на книга | Потребител |
| PUT | `/api/loans/:id/return` | Връщане на книга | Потребител |
| GET | `/api/loans/my` | Моите заеми | Потребител |
| GET | `/api/loans/active` | Активни заеми | Admin |
| GET | `/api/loans/overdue` | Просрочени заеми | Admin |

## База данни

### Таблици

- **users** — потребители (id, username, email, password, role)
- **books** — книги (id, title, author, genre, isbn, published_year, copies, available)
- **loans** — заеми (id, user_id → users, book_id → books, loan_date, due_date, return_date, status)

### Връзки

- `loans.user_id` → `users.id` (FK, ON DELETE CASCADE)
- `loans.book_id` → `books.id` (FK, ON DELETE CASCADE)

## Екип

Име, отбор номер 13

## Лиценз

ISC

## Допълнителни записки

на Филип Github-a не работеше и беше счупен, А. Йосифов комитна вместо него, частта от проекта за User.