"use client"

import { getUsersClient } from "@/client/actions/user/getUsersClient";
import { UserObjectType, UserResponseType } from "@/schemas/user/getUsers";
import { useCallback, useEffect, useState } from "react";

export const useGetUsers = () => {
    const [users, setUsers] = useState<UserResponseType>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState<UserObjectType | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        const result = await getUsersClient()

        if(result.success && result.data) {
            setUsers(result.data)
        }
        setLoading(false);
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const refreshUsers = () => {
        fetchUsers()
    }

    const filtered = users.filter((u) => {
        const matchSearch =
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === "all" || u.role === roleFilter;
        return matchSearch && matchRole;
    });

    return { 
        filtered,
        search, setSearch,
        roleFilter, setRoleFilter,
        selectedUser, setSelectedUser,
        refreshUsers,
        loading,
    }
}