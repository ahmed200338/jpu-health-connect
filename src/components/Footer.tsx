import { Facebook, Instagram, Linkedin, Send, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-6 text-right">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-foreground">تواصل معنا</h3>
            <div className="flex items-center justify-end gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+963 11 221 7240</span>
            </div>
            <div className="flex items-center justify-end gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>درعا - أوتوستراد غباغب - سوريا</span>
            </div>
            <div className="flex items-center justify-end gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>info@jude.edu.sy</span>
            </div>
          </div>
          <div className="md:col-span-2 flex items-center justify-center md:justify-end">
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/share/1KRKvSwVLQ/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#1877F2] transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-[#E4405F] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://t.me/STUDENTSJPU" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#2AABEE] transition-colors" aria-label="Telegram">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3" style={{ backgroundColor: "hsl(var(--social-bar))" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 text-white">
          <Facebook className="w-5 h-5" />
          <Instagram className="w-5 h-5" />
          <Linkedin className="w-5 h-5" />
          <Send className="w-5 h-5" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
