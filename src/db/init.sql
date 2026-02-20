CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    username    VARCHAR(100) NOT NULL UNIQUE,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(20)  NOT NULL DEFAULT 'user',   -- 'user' | 'admin'
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS books (
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    author          VARCHAR(255) NOT NULL,
    genre           VARCHAR(100) NOT NULL,
    isbn            VARCHAR(20)  UNIQUE,
    published_year  INTEGER,
    copies          INTEGER NOT NULL DEFAULT 1,
    available       INTEGER NOT NULL DEFAULT 1,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS loans (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER   NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id     INTEGER   NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    loan_date   TIMESTAMP NOT NULL DEFAULT NOW(),
    due_date    TIMESTAMP NOT NULL DEFAULT (NOW() + INTERVAL '14 days'),
    return_date TIMESTAMP,
    status      VARCHAR(20) NOT NULL DEFAULT 'active'  -- 'active' | 'returned' | 'overdue'
);

CREATE INDEX IF NOT EXISTS idx_books_author ON books (author);
CREATE INDEX IF NOT EXISTS idx_books_genre  ON books (genre);
CREATE INDEX IF NOT EXISTS idx_loans_status ON loans (status);

INSERT INTO users (username, email, password, role)
VALUES ('admin', 'admin@library.com',
        '$2b$10$XURQ4Y8s0Rk/OiIBl3MFnOcSZGbgC5aJz0FDRIqHbEiKfNwBmWGHa',
        'admin')
ON CONFLICT (username) DO NOTHING;
