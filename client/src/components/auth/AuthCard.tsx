import { Library } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md animate-fade-in shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
          <Library className="h-6 w-6 text-accent" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
