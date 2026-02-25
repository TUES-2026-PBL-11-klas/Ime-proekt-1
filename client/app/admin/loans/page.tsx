"use client";

import { useState } from "react";
import { mockLoans, type Loan } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { AlertTriangle, Clock, Search } from "lucide-react";

export default function AdminManageLoansPage() {
  const [loans, setLoans] = useState<Loan[]>(mockLoans);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const displayLoans = loans
    .filter((l) => filter === "all" || l.status === filter)
    .filter(
      (l) =>
        l.userName.toLowerCase().includes(search.toLowerCase()) ||
        l.bookTitle.toLowerCase().includes(search.toLowerCase())
    );

  const handleReturn = (id: string) => {
    setLoans((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status: "returned" as const,
              returnDate: new Date().toISOString().split("T")[0],
            }
          : l
      )
    );
  };

  const getDaysUntilDue = (dueDate: string) => {
    return Math.ceil(
      (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Loans</h1>
        <p className="text-muted-foreground">{displayLoans.length} loans</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by user or book..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Loans table */}
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Book</TableHead>
                <TableHead className="hidden md:table-cell">Borrow Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayLoans.map((loan) => {
                const daysLeft = getDaysUntilDue(loan.dueDate);
                return (
                  <TableRow
                    key={loan.id}
                    className={
                      loan.status === "overdue" ? "bg-destructive/5" : ""
                    }
                  >
                    <TableCell className="font-medium">
                      {loan.userName}
                    </TableCell>
                    <TableCell className="font-medium">
                      {loan.bookTitle}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{loan.borrowDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {loan.dueDate}
                        {loan.status === "active" &&
                          daysLeft <= 3 &&
                          daysLeft > 0 && (
                            <Badge variant="warning" className="text-xs">
                              <Clock className="mr-1 h-3 w-3" />
                              {daysLeft}d left
                            </Badge>
                          )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          loan.status === "active"
                            ? "accent"
                            : loan.status === "overdue"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {loan.status === "overdue" && (
                          <AlertTriangle className="mr-1 h-3 w-3" />
                        )}
                        {loan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {loan.status !== "returned" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReturn(loan.id)}
                        >
                          Return
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Returned {loan.returnDate}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

