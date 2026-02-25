"use client"

import { UserResponseType } from "@/schemas/user/getUsers";
import { useState } from "react";

export const useGetUsers = () => {
    const [users, setUsers] = useState<UserResponseType[]>([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState<UserResponseType | null>(null);

    const filtered = users.filter((u) => {
        const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === "all" || u.role === roleFilter;
        return matchSearch && matchRole;
    });

    return { 
        filtered,
        search, setSearch,
        roleFilter, setRoleFilter,
        selectedUser, setSelectedUser,
    }
}