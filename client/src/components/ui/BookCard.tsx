import { Book } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface BookCardProps {
  book: Book;
  isAdmin: boolean;
  onBorrow?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function BookCard({ book, isAdmin, onBorrow, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="card-hover animate-fade-in overflow-hidden">
      <div className="flex h-40 items-center justify-center" style={{ backgroundColor: book.coverColor }}>
        <BookOpen className="h-16 w-16 text-white/80" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1">{book.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">{book.genre}</Badge>
          <Badge variant={book.status === "available" ? "success" : "secondary"}>
            {book.status === "available" ? "Available" : "Borrowed"}
          </Badge>
        </div>
        <div className="mt-3 flex gap-2">
          {isAdmin ? (
            <>
              <Button size="sm" variant="outline" className="flex-1" onClick={() => onEdit?.(book.id)}>Edit</Button>
              <Button size="sm" variant="destructive" className="flex-1" onClick={() => onDelete?.(book.id)}>Delete</Button>
            </>
          ) : (
            <Button size="sm" variant="hero" className="w-full" disabled={book.status === "borrowed"} onClick={() => onBorrow?.(book.id)}>
              {book.status === "available" ? "Borrow" : "Unavailable"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}