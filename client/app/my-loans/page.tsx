"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, BookOpen, Loader2 } from "lucide-react";
import { useGetMyLoans } from "@/client/state/loan/useGetMyLoans";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function MyLoansPage() {
  const { loans, filter, setFilter, loading } = useGetMyLoans();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Loans</h1>
              <p className="text-muted-foreground">{loans.length} loans</p>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loans.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">No loans found</p>
                <Link href="/books" className="text-sm text-primary hover:underline">
                  Browse the catalog
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="overflow-x-auto p-0">
                <Table className="min-w-[500px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead className="hidden md:table-cell">Borrow Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loans.map((loan) => {
                      const isOverdue =
                        loan.status === "active" && new Date(loan.due_date) < new Date();
                      const displayStatus = loan.status === "returned"
                        ? "returned"
                        : isOverdue
                          ? "overdue"
                          : "active";

                      return (
                        <TableRow
                          key={loan.id}
                          className={isOverdue ? "bg-destructive/5" : ""}
                        >
                          <TableCell className="font-medium">
                            {loan.book_title ?? "Unknown"}
                          </TableCell>
                          <TableCell>{loan.book_author ?? "Unknown"}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(loan.loan_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {new Date(loan.due_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                displayStatus === "active"
                                  ? "accent"
                                  : displayStatus === "overdue"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {displayStatus === "overdue" && (
                                <AlertTriangle className="mr-1 h-3 w-3" />
                              )}
                              {displayStatus}
                            </Badge>
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
}

