import AuthPageLayout from "@/components/auth/AuthPageLayout";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthPageLayout>
      <AuthCard
        title="Welcome Back"
        description="Sign in to your library account"
      >
        <LoginForm />
      </AuthCard>
    </AuthPageLayout>
  );
}
