import Hero from "@/components/Hero";
import LogoPreview from "@/components/LogoPreview";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background to-secondary/30">
      <Hero />
      <main className="w-full max-w-3xl xl:max-w-4xl px-2">
        <LogoPreview />
      </main>

      <footer className="w-full max-w-5xl mt-16 mb-8 py-6 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>&copy; {new Date().getFullYear()} Cirkular. All rights reserved.</p>
      </footer>
    </div>
  );
}
