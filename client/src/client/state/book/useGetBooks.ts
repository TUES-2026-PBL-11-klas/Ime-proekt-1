"use client";

import { getBooksClient } from "@/client/actions/book/getBooksClient";
import { BookObjectType, GetBooksResponseType } from "@/schemas/book/getBooks";
import { useEffect, useState } from "react";

export const useGetBooks = () => {
    const [books, setBooks] = useState<GetBooksResponseType>([]);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("All");
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        const handleGetBooks = async () => {
            const result = await getBooksClient();

            if (result.success && result.data) {
                setBooks(result.data);
            }
        };

        handleGetBooks();
    }, []);

    const filtered = books.filter((b) => {
        const matchSearch =
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase());
        const matchGenre = genre === "All" || b.genre === genre;
        return matchSearch && matchGenre;
    });

    const genreOptions = [
        "All",
        ...Array.from(new Set(books.map((book) => book.genre))).sort((a, b) =>
            a.localeCompare(b)
        ),
    ];

    const handleDelete = () => {
        if (!deleteId) return;
        setBooks((prev) => prev.filter((b) => b.id !== deleteId));
        setDeleteId(null);
    };

    const setSelectedBookForDelete = (book: BookObjectType) => {
        setDeleteId(book.id);
    };

    return {
        filtered,
        genreOptions,
        search,
        setSearch,
        genre,
        setGenre,
        deleteId,
        setDeleteId,
        handleDelete,
        setSelectedBookForDelete,
    };
};
