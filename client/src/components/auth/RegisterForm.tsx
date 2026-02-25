"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterForm } from "@/client/state/user/useRegisterForm";

export default function RegisterForm() {
  const { handleSubmit, submitError, isSubmitting } = useRegisterForm()

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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="you@university.edu"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="••••••••"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm Password</Label>
          <Input
            name="confirmPassword"
            id="confirm"
            type="password"
            placeholder="••••••••"
            disabled={isSubmitting}
          />
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
