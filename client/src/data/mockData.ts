export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publishedYear: number | null;
  copies: number;
  available: number;
  createdAt: string;
}

export interface Loan {
  id: string;
  userId: string;
  userName: string;
  bookId: string;
  bookTitle: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: "active" | "returned" | "overdue";
}

export interface MemberUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  registeredDate: string;
  status: "active" | "disabled";
}

export const mockMembers: MemberUser[] = [
  { id: "1", name: "Admin User", email: "admin@library.com", role: "admin", registeredDate: "2025-01-01", status: "active" },
  { id: "2", name: "John Student", email: "john@university.edu", role: "user", registeredDate: "2025-06-15", status: "active" },
  { id: "3", name: "Sarah Reader", email: "sarah@university.edu", role: "user", registeredDate: "2025-08-20", status: "active" },
  { id: "4", name: "Alice Walker", email: "alice@university.edu", role: "user", registeredDate: "2025-09-10", status: "active" },
  { id: "5", name: "Bob Mitchell", email: "bob@university.edu", role: "user", registeredDate: "2025-11-01", status: "disabled" },
];

export const mockBooks: Book[] = [
  { id: "1", title: "Clean Code", author: "Robert C. Martin", genre: "Programming", isbn: "978-0132350884", publishedYear: 2008, copies: 3, available: 3, createdAt: "2025-01-01T00:00:00.000Z" },
  { id: "2", title: "The Pragmatic Programmer", author: "David Thomas", genre: "Programming", isbn: "978-0135957059", publishedYear: 2019, copies: 2, available: 0, createdAt: "2025-01-02T00:00:00.000Z" },
  { id: "3", title: "Design Patterns", author: "Gang of Four", genre: "Computer Science", isbn: "978-0201633610", publishedYear: 1994, copies: 4, available: 4, createdAt: "2025-01-03T00:00:00.000Z" },
  { id: "4", title: "Introduction to Algorithms", author: "Thomas H. Cormen", genre: "Computer Science", isbn: "978-0262033848", publishedYear: 2009, copies: 3, available: 3, createdAt: "2025-01-04T00:00:00.000Z" },
  { id: "5", title: "Artificial Intelligence", author: "Stuart Russell", genre: "AI & ML", isbn: "978-0136042594", publishedYear: 2020, copies: 2, available: 0, createdAt: "2025-01-05T00:00:00.000Z" },
  { id: "6", title: "Database Systems", author: "Ramez Elmasri", genre: "Databases", isbn: "978-0133970777", publishedYear: 2015, copies: 5, available: 5, createdAt: "2025-01-06T00:00:00.000Z" },
  { id: "7", title: "Operating System Concepts", author: "Abraham Silberschatz", genre: "Operating Systems", isbn: "978-1119800361", publishedYear: 2021, copies: 3, available: 3, createdAt: "2025-01-07T00:00:00.000Z" },
  { id: "8", title: "Computer Networks", author: "Andrew Tanenbaum", genre: "Networking", isbn: "978-0132126953", publishedYear: 2011, copies: 2, available: 0, createdAt: "2025-01-08T00:00:00.000Z" },
];

export const mockLoans: Loan[] = [
  { id: "1", userId: "2", userName: "John Student", bookId: "2", bookTitle: "The Pragmatic Programmer", borrowDate: "2026-02-01", dueDate: "2026-02-15", status: "overdue" },
  { id: "2", userId: "2", userName: "John Student", bookId: "5", bookTitle: "Artificial Intelligence", borrowDate: "2026-02-10", dueDate: "2026-03-10", status: "active" },
  { id: "3", userId: "3", userName: "Sarah Reader", bookId: "8", bookTitle: "Computer Networks", borrowDate: "2026-02-05", dueDate: "2026-03-05", status: "active" },
  { id: "4", userId: "2", userName: "John Student", bookId: "1", bookTitle: "Clean Code", borrowDate: "2026-01-01", dueDate: "2026-01-15", returnDate: "2026-01-14", status: "returned" },
  { id: "5", userId: "4", userName: "Alice Walker", bookId: "3", bookTitle: "Design Patterns", borrowDate: "2026-01-20", dueDate: "2026-02-20", returnDate: "2026-02-18", status: "returned" },
];

export const genres = ["All", "Programming", "Computer Science", "AI & ML", "Databases", "Operating Systems", "Networking"];
