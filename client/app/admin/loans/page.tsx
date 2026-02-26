"use client";

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
import { AlertTriangle, Clock, Search, Loader2 } from "lucide-react";
import { useGetAdminLoans } from "@/client/state/loan/useGetAdminLoans";

export default function AdminManageLoansPage() {
  const { loans, search, setSearch, filter, setFilter, handleReturn, loading } = useGetAdminLoans();

  const getDaysUntilDue = (dueDate: string) => {
    return Math.ceil(
      (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Loans</h1>
        <p className="text-muted-foreground">{loans.length} loans</p>
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
              {loans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No loans found
                  </TableCell>
                </TableRow>
              ) : (
                loans.map((loan) => {
                  const daysLeft = getDaysUntilDue(loan.due_date);
                  return (
                    <TableRow
                      key={loan.id}
                      className={
                        loan.displayStatus === "overdue" ? "bg-destructive/5" : ""
                      }
                    >
                      <TableCell className="font-medium">
                        {loan.username ?? "Unknown"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {loan.book_title ?? "Unknown"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(loan.loan_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {new Date(loan.due_date).toLocaleDateString()}
                          {loan.displayStatus === "active" &&
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
                            loan.displayStatus === "active"
                              ? "accent"
                              : "destructive"
                          }
                        >
                          {loan.displayStatus === "overdue" && (
                            <AlertTriangle className="mr-1 h-3 w-3" />
                          )}
                          {loan.displayStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReturn(loan.id)}
                        >
                          Return
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

