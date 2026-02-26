"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getBookById } from "@/actions/book/getBookById";
import { borrowBookClient } from "@/client/actions/loan/borrowBookClient";
import { BookObjectType } from "@/schemas/book/getBooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, Loader2, Calendar, Hash, Layers } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<BookObjectType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const id = Number(params.id);
      if (isNaN(id)) {
        setError("Invalid book ID");
        setLoading(false);
        return;
      }

      const result = await getBookById(id);
      if (result.success && result.data) {
        setBook(result.data);
      } else {
        setError(result.message ?? "Book not found");
      }
      setLoading(false);
    };

    fetchBook();
  }, [params.id]);

  const handleBorrow = async () => {
    if (!book) return;
    const result = await borrowBookClient(book.id);
    if (result.success) {
      setBook((prev) => prev ? { ...prev, available: prev.available - 1 } : prev);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex h-64 flex-col items-center justify-center gap-4">
          <p className="text-lg text-muted-foreground">{error ?? "Book not found"}</p>
          <Button variant="outline" onClick={() => router.push("/books")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  const isAvailable = book.available > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link href="/books" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>

        <Card className="overflow-hidden">
          <div className="flex h-48 items-center justify-center bg-primary/80">
            <BookOpen className="h-24 w-24 text-white/80" />
          </div>

          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-2xl">{book.title}</CardTitle>
                <p className="mt-1 text-lg text-muted-foreground">{book.author}</p>
              </div>
              <Badge variant={isAvailable ? "success" : "secondary"} className="text-sm">
                {isAvailable ? `${book.available} available` : "Unavailable"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Genre</p>
                  <p className="font-medium">{book.genre}</p>
                </div>
              </div>

              {book.isbn && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Hash className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ISBN</p>
                    <p className="font-medium">{book.isbn}</p>
                  </div>
                </div>
              )}

              {book.publishedYear && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <Calendar className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Published</p>
                    <p className="font-medium">{book.publishedYear}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <BookOpen className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Copies</p>
                  <p className="font-medium">{book.copies}</p>
                </div>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={!isAvailable}
              onClick={handleBorrow}
            >
              {isAvailable ? "Borrow This Book" : "Currently Unavailable"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

