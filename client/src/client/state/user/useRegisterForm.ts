"use client"

import { registerUser } from "@/actions/user/register";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useRegisterForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const formData = new FormData(e.currentTarget);

        const result = await registerUser(formData);

        if (result.success) {
            router.push("/login")
        } else {
            setSubmitError(result?.message ?? DEFAULT_ERROR_MESSAGE)
        }

        setIsSubmitting(false);
    };

    return { handleSubmit, submitError, isSubmitting }
}