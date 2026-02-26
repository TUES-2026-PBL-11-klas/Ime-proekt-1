"use client"
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Search, LayoutGrid, List, BookOpen } from "lucide-react";
import { useGetBooks } from "@/client/state/book/useGetBooks";
import { borrowBookClient } from "@/client/actions/loan/borrowBookClient";
import { BookObjectType } from "@/schemas/book/getBooks";
import { Navbar } from "@/components/Navbar";

const Books = () => {
  const { filtered, genreOptions, search, setSearch, genre, setGenre } = useGetBooks();
  const [view, setView] = useState<"grid" | "table">("grid");
  const [sortOrder, setSortOrder] = useState("asc");

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author)
  );

  const handleBorrow = async (book: BookObjectType) => {
    await borrowBookClient(book.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Library Catalog</h1>
              <p className="text-muted-foreground">{sorted.length} books found</p>
            </div>
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
                  {genreOptions.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
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
          {sorted.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-muted-foreground">No books found</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sorted.map((book) => {
                const isAvailable = book.available > 0;
                return (
                  <Card key={book.id} className="card-hover animate-fade-in overflow-hidden">
                    <Link href={`/books/${book.id}`}>
                      <div className="flex h-40 items-center justify-center bg-primary/80">
                        <BookOpen className="h-16 w-16 text-white/80" />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link href={`/books/${book.id}`}>
                        <h3 className="font-semibold text-foreground line-clamp-1 hover:underline">{book.title}</h3>
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">{book.genre}</Badge>
                        <Badge variant={isAvailable ? "success" : "secondary"}>
                          {isAvailable ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <Button
                          size="sm"
                          variant="default"
                          className="w-full"
                          disabled={!isAvailable}
                          onClick={() => handleBorrow(book)}
                        >
                          {isAvailable ? "Borrow" : "Unavailable"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="overflow-x-auto p-0">
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
                    {sorted.map((book) => {
                      const isAvailable = book.available > 0;
                      return (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">
                            <Link href={`/books/${book.id}`} className="hover:underline">
                              {book.title}
                            </Link>
                          </TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell><Badge variant="secondary">{book.genre}</Badge></TableCell>
                          <TableCell>
                            <Badge variant={isAvailable ? "success" : "secondary"}>
                              {isAvailable ? "available" : "unavailable"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="default"
                              disabled={!isAvailable}
                              onClick={() => handleBorrow(book)}
                            >
                              {isAvailable ? "Borrow" : "Unavailable"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;