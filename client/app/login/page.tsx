import type { Metadata } from "next";
import AuthPageLayout from "@/components/auth/AuthPageLayout";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In | LibraryMS",
  description: "Sign in to your LibraryMS account to browse books and manage your loans.",
};

export default function LoginPage() {
  return (
    <AuthPageLayout>
      <AuthCard
        title="Welcome Back"
        description="Sign in to your library account"
      >
        <Suspense>
          <LoginForm />
        </Suspense>
      </AuthCard>
    </AuthPageLayout>
  );
}
