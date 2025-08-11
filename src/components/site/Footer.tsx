const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-bold mb-2">Gab Gomes</h3>
          <p className="text-sm text-foreground/70">
            Beleza que celebra sua textura natural. Agende online e acompanhe as novidades.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Navegação</h4>
          <ul className="space-y-1 text-sm">
            <li><a className="story-link" href="/agendar">Agendar</a></li>
            <li><a className="story-link" href="/produtos">Produtos</a></li>
            <li><a className="story-link" href="/novidades">Novidades</a></li>
            <li><a className="story-link" href="/sobre">Cultura</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contato</h4>
          <p className="text-sm text-foreground/70">WhatsApp: (99) 99999-9999</p>
          <a className="story-link text-sm" href="https://wa.me/5599999999999" target="_blank" rel="noreferrer">Fale conosco</a>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto py-4 text-xs text-foreground/60 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Gab Gomes</span>
          <a href="/" className="story-link">Voltar ao topo</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
