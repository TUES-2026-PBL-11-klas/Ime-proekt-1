import type { Metadata } from "next";
import AuthPageLayout from "@/components/auth/AuthPageLayout";
import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register | LibraryMS",
  description: "Create a new LibraryMS account to start browsing books and managing your loans.",
};

export default function RegisterPage() {
  return (
    <AuthPageLayout>
      <AuthCard
        title="Create Account"
        description="Join the library management system"
      >
        <RegisterForm />
      </AuthCard>
    </AuthPageLayout>
  );
}
