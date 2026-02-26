"use client";

import { useCreateBookForm } from "@/client/state/book/useCreateBookForm";
import { genres } from "@/data/genres";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function AdminAddBookPage() {
  const {
    title,
    setTitle,
    author,
    setAuthor,
    genre,
    setGenre,
    isbn,
    setIsbn,
    isSubmitting,
    submitError,
    handleSubmit,
    handleCancel,
  } = useCreateBookForm();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New Book</h1>
          <p className="text-muted-foreground">Fill in the book details</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Book Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-5">
            {submitError && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {submitError}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book title"
                disabled={isSubmitting}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                disabled={isSubmitting}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="genre">Genre *</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger disabled={isSubmitting}>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {genres
                    .filter((g) => g !== "All")
                    .map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="ISBN number"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Book"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

