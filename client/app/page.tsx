import  Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileText, Users, Library, ArrowRight } from "lucide-react";
const heroImage = "/hero-illustration.png";
import Image from "next/image";

const features = [
  { icon: BookOpen, title: "Book Management", description: "Catalog, organize, and track your entire library collection with ease." },
  { icon: FileText, title: "Loan Tracking", description: "Monitor borrowing activity, due dates, and overdue returns in real-time." },
  { icon: Users, title: "User Administration", description: "Manage registered members, roles, and permissions effortlessly." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-md px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <Library className="h-7 w-7 text-accent" />
          <span className="text-xl font-bold text-foreground">LibraryMS</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
              <Link href='/login'>Login</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link href='/register'>Register</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-6xl">
                Smart Library<br />
                <span className="text-accent">Management System</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                Streamline your library operations with our modern, intuitive platform. 
                Manage books, track loans, and administer users — all in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" variant="hero" asChild>
                  <Link href="/register">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none animate-fade-in aspect-video lg:aspect-16/9">
              <Image 
                src={heroImage} 
                fill 
                alt="Library management dashboard preview" 
                className="rounded-xl shadow-2xl object-contain" 
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-card px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-foreground">Everything You Need</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            A complete toolkit for modern library management.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((f, i) => (
              <Card key={i} className="card-hover animate-fade-in border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-navy px-6 py-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <Library className="h-5 w-5 text-accent" />
            <span className="font-semibold text-navy-foreground">LibraryMS</span>
          </div>
          <p className="text-sm text-navy-foreground/60">
            Library Management System • Academic Project
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;