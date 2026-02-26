"use client";

import { createBookClient } from "@/client/actions/book/createBookClient";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useCreateBookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [isbn, setIsbn] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const result = await createBookClient({
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
        isSubmitting,
        submitError,
        handleSubmit,
        handleCancel,
    };
};
