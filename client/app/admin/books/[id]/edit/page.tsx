"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { mockBooks, genres } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function AdminEditBookPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const existing = mockBooks.find((b) => b.id === id);

  const [title, setTitle] = useState(existing?.title || "");
  const [author, setAuthor] = useState(existing?.author || "");
  const [genre, setGenre] = useState(existing?.genre || "");
  const [isbn, setIsbn] = useState(existing?.isbn || "");
  const [description, setDescription] = useState(existing?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !genre) {
      alert("Title, Author, and Genre are required.");
      return;
    }
    // TODO: send to API
    alert(`"${title}" has been updated successfully.`);
    router.push("/admin/books");
  };

  if (!existing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/books")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Book not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/books")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Book</h1>
          <p className="text-muted-foreground">
            Editing &quot;{existing.title}&quot;
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Book Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="genre">Genre *</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger>
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
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description"
                rows={4}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/books")}
              >
                Cancel
              </Button>
              <Button type="submit">Update Book</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

