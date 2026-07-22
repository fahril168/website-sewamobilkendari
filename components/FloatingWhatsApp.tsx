import { MessageCircle } from "lucide-react";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={generateGeneralWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-emerald-500 active:scale-95"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="sr-only">Chat WhatsApp</span>
      </a>
    </div>
  );
}
