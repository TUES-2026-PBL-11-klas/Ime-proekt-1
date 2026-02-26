"use client"
import { useState } from "react";
import { mockBooks, genres, Book } from "@/data/mockData";
import { BookCard } from "@/components/ui/BookCard";
import { AddBookModal } from "@/components/AddBookModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, LayoutGrid, List } from "lucide-react";
import { useToast } from "@/client/state/use-toast";

const Books = () => {
  const isAdmin = true;
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const filtered = books
    .filter((b) => {
      const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === "All" || b.genre === genre;
      return matchSearch && matchGenre;
    })
    .sort((a, b) => sortOrder === "asc" ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author));

  const handleBorrow = (id: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id && b.available > 0 ? { ...b, available: b.available - 1 } : b
      )
    );
    toast({ title: "Success!", description: "Book borrowed successfully." });
  };

  const handleDelete = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    toast({ title: "Deleted", description: "Book removed from catalog." });
  };

  const handleSave = (data: { title: string; author: string; genre: string; isbn: string }) => {
    const newBook: Book = {
      id: Date.now().toString(),
      ...data,
      publishedYear: null,
      copies: 1,
      available: 1,
      createdAt: new Date().toISOString(),
    };
    setBooks((prev) => [...prev, newBook]);
    toast({ title: "Added!", description: `"${data.title}" added to catalog.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Library Catalog</h1>
          <p className="text-muted-foreground">{filtered.length} books found</p>
        </div>
        {isAdmin && (
          <Button variant="hero" onClick={() => setModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Book
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-wrap gap-3 p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search books..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-card">
              {genres.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="asc">Author A–Z</SelectItem>
              <SelectItem value="desc">Author Z–A</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1 rounded-lg border p-1">
            <Button size="icon" variant={view === "grid" ? "default" : "ghost"} onClick={() => setView("grid")}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button size="icon" variant={view === "table" ? "default" : "ghost"} onClick={() => setView("table")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} isAdmin={isAdmin} onBorrow={handleBorrow} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((book) => {
                  const isAvailable = book.available > 0;
                  return (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell><Badge variant="secondary">{book.genre}</Badge></TableCell>
                      <TableCell>
                        <Badge variant={isAvailable ? "success" : "secondary"}>
                          {isAvailable ? "available" : "unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {isAdmin ? (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(book.id)}>Delete</Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="hero" disabled={!isAvailable} onClick={() => handleBorrow(book.id)}>
                            {isAvailable ? "Borrow" : "Unavailable"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <AddBookModal open={modalOpen} onOpenChange={setModalOpen} onSave={handleSave} />
    </div>
  );
};

export default Books;