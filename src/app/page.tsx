import LogoPreview from "@/components/LogoPreview";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background to-secondary/30">
      <header className="w-full max-w-5xl mt-8 mb-10 md:mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary font-montserrat">
            Cirkular
          </h1>
        </div>
        <p className="text-md sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Craft stunning text-based logos and banners with live previews,
          AI-powered design suggestions, and easy export options.
        </p>
      </header>

      <main className="w-full max-w-3xl xl:max-w-4xl px-2">
        <LogoPreview />
      </main>

      <footer className="w-full max-w-5xl mt-16 mb-8 py-6 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>&copy; {new Date().getFullYear()} Cirkular. All rights reserved.</p>
      </footer>
    </div>
  );
}
