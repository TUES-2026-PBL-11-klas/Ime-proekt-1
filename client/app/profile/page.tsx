"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Loader2,
  RotateCcw,
  AlertTriangle,
  User,
  BookCheck,
  Clock,
  BarChart3,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { getUserInfo, type UserInfo } from "@/actions/auth/getUserInfo";
import { getMyLoansClient } from "@/client/actions/loan/getMyLoansClient";
import { returnLoanClient } from "@/client/actions/loan/returnLoanClient";
import { LoanObjectType } from "@/schemas/loan/loans";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<UserInfo>(null);
  const [loans, setLoans] = useState<LoanObjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<number | null>(null);

  const fetchData = async () => {
    const [userInfo, loansResult] = await Promise.all([
      getUserInfo(),
      getMyLoansClient(),
    ]);
    setUser(userInfo);
    if (loansResult.success && loansResult.data) {
      setLoans(loansResult.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReturn = async (loanId: number) => {
    setReturningId(loanId);
    const result = await returnLoanClient(loanId);
    if (result.success) {
      await fetchData();
    }
    setReturningId(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const activeLoans = loans.filter((l) => l.status === "active");
  const returnedLoans = loans.filter((l) => l.status === "returned");
  const overdueLoans = activeLoans.filter(
    (l) => new Date(l.due_date) < new Date()
  );

  const stats = [
    {
      label: "Total Borrowed",
      value: loans.length,
      icon: BookOpen,
      color: "text-primary",
    },
    {
      label: "Currently Active",
      value: activeLoans.length,
      icon: Clock,
      color: "text-blue-500",
    },
    {
      label: "Returned",
      value: returnedLoans.length,
      icon: BookCheck,
      color: "text-green-500",
    },
    {
      label: "Overdue",
      value: overdueLoans.length,
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="space-y-6">
          {/* User Info */}
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {user?.username ?? "User"}
                </h1>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant={user?.role === "admin" ? "default" : "secondary"}>
                    {user?.role ?? "user"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
              <BarChart3 className="h-5 w-5" />
              Statistics
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Active Loans */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Active Loans ({activeLoans.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {activeLoans.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-8">
                  <BookOpen className="h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">No active loans</p>
                  <Link
                    href="/books"
                    className="text-sm text-primary hover:underline"
                  >
                    Browse the catalog
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Borrow Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeLoans.map((loan) => {
                        const isOverdue = new Date(loan.due_date) < new Date();
                        const isReturning = returningId === loan.id;

                        return (
                          <TableRow
                            key={loan.id}
                            className={isOverdue ? "bg-destructive/5" : ""}
                          >
                            <TableCell className="font-medium">
                              {loan.book_title ?? "Unknown"}
                            </TableCell>
                            <TableCell>{loan.book_author ?? "Unknown"}</TableCell>
                            <TableCell>
                              {new Date(loan.loan_date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(loan.due_date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant={isOverdue ? "destructive" : "accent"}>
                                {isOverdue && (
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                )}
                                {isOverdue ? "overdue" : "active"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={isReturning}
                                onClick={() => handleReturn(loan.id)}
                                className="gap-1.5"
                              >
                                {isReturning ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <RotateCcw className="h-3.5 w-3.5" />
                                )}
                                Return
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Loan History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookCheck className="h-5 w-5 text-green-500" />
                Loan History ({returnedLoans.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {returnedLoans.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-8">
                  <BookOpen className="h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">No returned books yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Borrow Date</TableHead>
                        <TableHead>Return Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {returnedLoans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">
                            {loan.book_title ?? "Unknown"}
                          </TableCell>
                          <TableCell>{loan.book_author ?? "Unknown"}</TableCell>
                          <TableCell>
                            {new Date(loan.loan_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {loan.return_date
                              ? new Date(loan.return_date).toLocaleDateString()
                              : "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
