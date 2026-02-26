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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, ShieldCheck, ShieldOff, Loader2 } from "lucide-react";
import { useGetUsers } from "@/client/state/user/useGetUsers";
import { updateUserRoleClient } from "@/client/actions/user/updateUserRoleClient";
import { useState, useEffect } from "react";
import { UserObjectType } from "@/schemas/user/getUsers";
import { getUserInfo } from "@/actions/auth/getUserInfo";

export default function AdminManageUsersPage() {
  const { 
    filtered,
    search, setSearch,
    roleFilter, setRoleFilter,
    selectedUser, setSelectedUser,
    refreshUsers,
    loading,
  } = useGetUsers()

  const [updatingRole, setUpdatingRole] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    getUserInfo().then((info) => {
      if (info) setCurrentUserId(info.id);
    });
  }, []);

  const handleRoleChange = async (user: UserObjectType) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    setUpdatingRole(user.id);
    const result = await updateUserRoleClient(user.id, newRole);
    if (result.success) {
      refreshUsers();
    }
    setUpdatingRole(null);
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
        <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
        <p className="text-muted-foreground">
          {filtered.length} registered users
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden lg:table-cell">Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {u.username.charAt(0)}
                      </div>
                      <span className="font-medium">{u.username}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{u.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={u.role === "admin" ? "default" : "secondary"}
                    >
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{new Date(u.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setSelectedUser(u)}
                      >
                        View
                      </Button>
                      {u.id !== currentUserId && (
                      <Button
                        size="sm"
                        variant={u.role === "admin" ? "secondary" : "default"}
                        className="w-full sm:w-auto gap-1"
                        disabled={updatingRole === u.id}
                        onClick={() => handleRoleChange(u)}
                      >
                        {u.role === "admin" ? (
                          <>
                            <ShieldOff className="h-3 w-3" />
                            <span className="hidden sm:inline">Demote</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="h-3 w-3" />
                            <span className="hidden sm:inline">Promote</span>
                          </>
                        )}
                      </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User detail dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>{selectedUser?.email}</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-3 py-2">
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">Username</Label>
                <p className="font-medium">{selectedUser.username}</p>
              </div>
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">Role</Label>
                <Badge
                  variant={
                    selectedUser.role === "admin" ? "default" : "secondary"
                  }
                  className="w-fit"
                >
                  {selectedUser.role}
                </Badge>
              </div>
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">
                  Registered
                </Label>
                <p>{new Date(selectedUser.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedUser(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

