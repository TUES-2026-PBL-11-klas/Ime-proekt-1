"use client";

import { useState } from "react";
import { mockMembers, type MemberUser } from "@/data/mockData";
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
import { Search, Shield, ShieldOff } from "lucide-react";

export default function AdminManageUsersPage() {
  const [users, setUsers] = useState<MemberUser[]>(mockMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<MemberUser | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const toggleRole = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, role: u.role === "admin" ? ("user" as const) : ("admin" as const) }
          : u
      )
    );
  };

  const toggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              status:
                u.status === "active"
                  ? ("disabled" as const)
                  : ("active" as const),
            }
          : u
      )
    );
  };

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
        <CardContent className="flex flex-wrap gap-3 p-4">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[140px]">
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
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={u.role === "admin" ? "default" : "secondary"}
                    >
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{u.registeredDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        u.status === "active" ? "success" : "destructive"
                      }
                    >
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedUser(u)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleRole(u.id)}
                      >
                        {u.role === "admin" ? (
                          <ShieldOff className="mr-1 h-3 w-3" />
                        ) : (
                          <Shield className="mr-1 h-3 w-3" />
                        )}
                        {u.role === "admin" ? "Demote" : "Promote"}
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          u.status === "active" ? "destructive" : "default"
                        }
                        onClick={() => toggleStatus(u.id)}
                      >
                        {u.status === "active" ? "Disable" : "Enable"}
                      </Button>
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
                <Label className="text-xs text-muted-foreground">Name</Label>
                <p className="font-medium">{selectedUser.name}</p>
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
                <p>{selectedUser.registeredDate}</p>
              </div>
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">Status</Label>
                <Badge
                  variant={
                    selectedUser.status === "active" ? "success" : "destructive"
                  }
                  className="w-fit"
                >
                  {selectedUser.status}
                </Badge>
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

