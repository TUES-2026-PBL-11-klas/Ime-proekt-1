"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/actions/user/register";

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);

    const result = await registerUser(formData);

    if (result.success) {
      // Validation passed - TODO: handle successful registration
      console.log("Validation successful:", result.data);
    } else {
      // Validation failed
      if ("issues" in result) {
        // Zod validation errors
        const fieldErrors: Record<string, string> = {};
        result.issues.forEach((issue: { path: string; message: string }) => {
          fieldErrors[issue.path] = issue.message;
        });
        setErrors(fieldErrors);
      } else {
        // General error
        setSubmitError(result.error);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitError && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {submitError}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Username</Label>
          <Input
            name="username"
            id="name"
            type="text"
            placeholder="John Doe"
            disabled={isSubmitting}
            aria-invalid={!!errors.username}
          />
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="you@university.edu"
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="••••••••"
            disabled={isSubmitting}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm Password</Label>
          <Input
            name="confirmPassword"
            id="confirm"
            type="password"
            placeholder="••••••••"
            disabled={isSubmitting}
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-accent hover:underline"
        >
          Sign In
        </Link>
      </p>
    </>
  );
}
