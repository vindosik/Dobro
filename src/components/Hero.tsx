import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden gradient-hero py-20 lg:py-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl lg:text-6xl animate-fade-in">
            Відкрийте найкращі{" "}
            <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              події
            </span>{" "}
            поруч
          </h1>
          <p className="mt-6 text-lg text-secondary-foreground/70 animate-fade-in [animation-delay:0.1s] opacity-0">
            Знаходьте концерти, конференції, воркшопи та зустрічі у вашому місті
          </p>

          {/* Search bar */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:0.2s] opacity-0">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Шукати події..."
                className="h-14 pl-12 pr-4 text-base bg-card border-0 shadow-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button variant="hero" className="h-14">
              Знайти події
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-secondary-foreground/80 animate-fade-in [animation-delay:0.3s] opacity-0">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">500+</div>
              <div className="text-sm">Активних подій</div>
            </div>
            <div className="h-10 w-px bg-secondary-foreground/20" />
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">50k+</div>
              <div className="text-sm">Учасників</div>
            </div>
            <div className="h-10 w-px bg-secondary-foreground/20" />
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">100+</div>
              <div className="text-sm">Міст</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
