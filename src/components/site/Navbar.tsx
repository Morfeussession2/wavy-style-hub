import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? "bg-primary/10 text-primary" : "text-foreground/80 hover:text-foreground"
      }`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-primary">GAB</span>
          <span className="text-accent">GOMES</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavItem to="/agendar">Agendar</NavItem>
          <NavItem to="/produtos">Produtos</NavItem>
          <NavItem to="/novidades">Novidades</NavItem>
          <NavItem to="/sobre">Cultura</NavItem>
        </div>

        <div className="hidden md:block">
          <Button asChild>
            <a
              href="https://wa.me/5599999999999?text=Quero%20agendar%20um%20hor%C3%A1rio!"
              aria-label="Agendar pelo WhatsApp"
            >
              Agendar no WhatsApp
            </a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-md border hover:bg-primary/10"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menu"
        >
          <span className="i-lucide-menu" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t animate-fade-in">
          <div className="container py-3 flex flex-col gap-2">
            <NavItem to="/agendar">Agendar</NavItem>
            <NavItem to="/produtos">Produtos</NavItem>
            <NavItem to="/novidades">Novidades</NavItem>
            <NavItem to="/sobre">Cultura</NavItem>
            <Button asChild className="mt-2">
              <a href="/agendar">Agendar agora</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
