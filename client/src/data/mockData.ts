export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  status: "available" | "borrowed";
  coverColor: string;
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

export const mockBooks: Book[] = [
  { id: "1", title: "Clean Code", author: "Robert C. Martin", genre: "Programming", isbn: "978-0132350884", description: "A handbook of agile software craftsmanship.", status: "available", coverColor: "hsl(221, 60%, 45%)" },
  { id: "2", title: "The Pragmatic Programmer", author: "David Thomas", genre: "Programming", isbn: "978-0135957059", description: "Your journey to mastery.", status: "borrowed", coverColor: "hsl(174, 63%, 45%)" },
  { id: "3", title: "Design Patterns", author: "Gang of Four", genre: "Computer Science", isbn: "978-0201633610", description: "Elements of reusable object-oriented software.", status: "available", coverColor: "hsl(36, 100%, 65%)" },
  { id: "4", title: "Introduction to Algorithms", author: "Thomas H. Cormen", genre: "Computer Science", isbn: "978-0262033848", description: "Comprehensive textbook on algorithms.", status: "available", coverColor: "hsl(1, 79%, 55%)" },
  { id: "5", title: "Artificial Intelligence", author: "Stuart Russell", genre: "AI & ML", isbn: "978-0136042594", description: "A modern approach to AI.", status: "borrowed", coverColor: "hsl(123, 41%, 45%)" },
  { id: "6", title: "Database Systems", author: "Ramez Elmasri", genre: "Databases", isbn: "978-0133970777", description: "Fundamentals of database systems.", status: "available", coverColor: "hsl(212, 30%, 17%)" },
  { id: "7", title: "Operating System Concepts", author: "Abraham Silberschatz", genre: "Operating Systems", isbn: "978-1119800361", description: "Core concepts of operating systems.", status: "available", coverColor: "hsl(260, 50%, 50%)" },
  { id: "8", title: "Computer Networks", author: "Andrew Tanenbaum", genre: "Networking", isbn: "978-0132126953", description: "Comprehensive networking textbook.", status: "borrowed", coverColor: "hsl(190, 60%, 40%)" },
];

export const mockLoans: Loan[] = [
  { id: "1", userId: "2", userName: "John Student", bookId: "2", bookTitle: "The Pragmatic Programmer", borrowDate: "2026-02-01", dueDate: "2026-02-15", status: "overdue" },
  { id: "2", userId: "2", userName: "John Student", bookId: "5", bookTitle: "Artificial Intelligence", borrowDate: "2026-02-10", dueDate: "2026-03-10", status: "active" },
  { id: "3", userId: "3", userName: "Sarah Reader", bookId: "8", bookTitle: "Computer Networks", borrowDate: "2026-02-05", dueDate: "2026-03-05", status: "active" },
  { id: "4", userId: "2", userName: "John Student", bookId: "1", bookTitle: "Clean Code", borrowDate: "2026-01-01", dueDate: "2026-01-15", returnDate: "2026-01-14", status: "returned" },
  { id: "5", userId: "4", userName: "Alice Walker", bookId: "3", bookTitle: "Design Patterns", borrowDate: "2026-01-20", dueDate: "2026-02-20", returnDate: "2026-02-18", status: "returned" },
];

export const genres = ["All", "Programming", "Computer Science", "AI & ML", "Databases", "Operating Systems", "Networking"];
