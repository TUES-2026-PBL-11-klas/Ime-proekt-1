"use client";

import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookOpen,
  Users,
  FileText,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useGetStats } from "@/client/state/stats/useGetStats";

export default function AdminDashboardPage() {
  const { totalUsers, totalBooks, activeLoans, overdueLoans, recentLoans, loading } = useGetStats();

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
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of library system</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Users" value={totalUsers} icon={Users} variant="default" />
        <StatsCard title="Total Books" value={totalBooks} icon={BookOpen} variant="accent" />
        <StatsCard title="Active Loans" value={activeLoans} icon={FileText} variant="success" />
        <StatsCard title="Overdue Loans" value={overdueLoans} icon={AlertTriangle} variant="destructive" />
      </div>

      {/* Recent loans table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Loans</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Borrow Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLoans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No loans yet
                  </TableCell>
                </TableRow>
              ) : (
                recentLoans.map((loan) => {
                  const isOverdue = loan.status === "active" && new Date(loan.due_date) < new Date();
                  const displayStatus = loan.status === "returned" ? "returned" : isOverdue ? "overdue" : "active";
                  return (
                    <TableRow
                      key={loan.id}
                      className={isOverdue ? "bg-destructive/5" : ""}
                    >
                      <TableCell className="font-medium">{loan.username}</TableCell>
                      <TableCell>{loan.book_title}</TableCell>
                      <TableCell>{new Date(loan.loan_date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(loan.due_date).toLocaleDateString()}</TableCell>
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
                          {displayStatus}
                        </Badge>
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

