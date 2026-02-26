import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { genres } from "@/data/mockData";

interface AddBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (book: { title: string; author: string; genre: string; isbn: string }) => void;
  editBook?: { title: string; author: string; genre: string; isbn: string } | null;
}

export function AddBookModal({ open, onOpenChange, onSave, editBook }: AddBookModalProps) {
  const [title, setTitle] = useState(editBook?.title || "");
  const [author, setAuthor] = useState(editBook?.author || "");
  const [genre, setGenre] = useState(editBook?.genre || "");
  const [isbn, setIsbn] = useState(editBook?.isbn || "");

  const handleSave = () => {
    if (!title || !author || !genre) return;
    onSave({ title, author, genre, isbn });
    setTitle(""); setAuthor(""); setGenre(""); setIsbn("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="text-foreground">{editBook ? "Edit Book" : "Add New Book"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="author">Author *</Label>
            <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="genre">Genre *</Label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger><SelectValue placeholder="Select genre" /></SelectTrigger>
              <SelectContent className="bg-card">
                {genres.filter((g) => g !== "All").map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="ISBN number" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Book</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}