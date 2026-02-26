"use client";

import { updateBookClient } from "@/client/actions/book/updateBookClient";
import { getBooksClient } from "@/client/actions/book/getBooksClient";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useUpdateBookForm = () => {
    const params = useParams();
    const idParam = params.id as string;
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [isbn, setIsbn] = useState("");
    const [initialTitle, setInitialTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [bookNotFound, setBookNotFound] = useState(false);

    useEffect(() => {
        const handleLoadBook = async () => {
            const id = Number(idParam);
            if (!Number.isInteger(id) || id <= 0) {
                setBookNotFound(true);
                setIsLoading(false);
                return;
            }

            const result = await getBooksClient();
            if (!result.success || !result.data) {
                setSubmitError(result.message ?? DEFAULT_ERROR_MESSAGE);
                setIsLoading(false);
                return;
            }

            const existingBook = result.data.find((book) => book.id === id);
            if (!existingBook) {
                setBookNotFound(true);
                setIsLoading(false);
                return;
            }

            setTitle(existingBook.title);
            setAuthor(existingBook.author);
            setGenre(existingBook.genre);
            setIsbn(existingBook.isbn ?? "");
            setInitialTitle(existingBook.title);
            setIsLoading(false);
        };

        handleLoadBook();
    }, [idParam]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const id = Number(idParam);
        const result = await updateBookClient({
            id,
            title,
            author,
            genre,
            isbn,
        });

        if (result.success) {
            router.push("/admin/books");
        } else {
            setSubmitError(result.message ?? DEFAULT_ERROR_MESSAGE);
        }

        setIsSubmitting(false);
    };

    const handleCancel = () => {
        router.push("/admin/books");
    };

    return {
        title,
        setTitle,
        author,
        setAuthor,
        genre,
        setGenre,
        isbn,
        setIsbn,
        initialTitle,
        isLoading,
        isSubmitting,
        submitError,
        bookNotFound,
        handleSubmit,
        handleCancel,
    };
};
