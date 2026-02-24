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
  BarChart3,
} from "lucide-react";
import { mockBooks, mockLoans, mockMembers } from "@/data/mockData";

export default function AdminDashboardPage() {
  const totalBooks = mockBooks.length;
  const activeLoans = mockLoans.filter((l) => l.status === "active").length;
  const overdueLoans = mockLoans.filter((l) => l.status === "overdue").length;
  const totalUsers = mockMembers.length;
  const recentLoans = mockLoans.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of library system</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Users" value={totalUsers} icon={Users} variant="default" />
        <StatsCard title="Total Books" value={totalBooks} icon={BookOpen} variant="accent" />
        <StatsCard title="Active Loans" value={activeLoans} icon={FileText} variant="success" />
        <StatsCard title="Overdue Loans" value={overdueLoans} icon={AlertTriangle} variant="destructive" />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" /> Loans This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-center justify-center rounded-lg bg-muted/50">
              <div className="flex items-end gap-2">
                {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
                  <div
                    key={i}
                    className="w-8 rounded-t bg-primary/80 transition-all hover:bg-accent"
                    style={{ height: `${h * 1.8}px` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-accent" /> Popular Genres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { genre: "Programming", pct: 85 },
                { genre: "Computer Science", pct: 60 },
                { genre: "AI & ML", pct: 45 },
                { genre: "Databases", pct: 30 },
                { genre: "Networking", pct: 20 },
              ].map((g) => (
                <div key={g.genre}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-foreground">{g.genre}</span>
                    <span className="text-muted-foreground">{g.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-accent transition-all"
                      style={{ width: `${g.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent loans table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Loans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
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
              {recentLoans.map((loan) => (
                <TableRow
                  key={loan.id}
                  className={loan.status === "overdue" ? "bg-destructive/5" : ""}
                >
                  <TableCell className="font-medium">{loan.userName}</TableCell>
                  <TableCell>{loan.bookTitle}</TableCell>
                  <TableCell>{loan.borrowDate}</TableCell>
                  <TableCell>{loan.dueDate}</TableCell>
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
                      {loan.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

