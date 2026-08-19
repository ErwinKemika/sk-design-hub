import { useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { MessageCircle, Send, X } from "lucide-react";
import { CONTACT } from "@/lib/site-data";

const GREETING_MESSAGE =
  "Halo, saya ingin bertanya seputar layanan konstruksi/interior SK.INTERIOR.DESIGN.";

export function WhatsAppButton() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (location.pathname === "/contact") return null;

  const chatUrl = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(GREETING_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-72 border border-gold/30 bg-charcoal shadow-2xl sm:w-80">
          <div className="flex items-center justify-between gap-3 bg-gradient-gold px-4 py-3">
            <div>
              <div className="font-serif text-sm font-bold text-black">SK.INTERIOR.DESIGN</div>
              <div className="text-xs text-black/70">Biasanya membalas dalam beberapa menit</div>
            </div>
            <button
              type="button"
              aria-label="Tutup"
              onClick={() => setOpen(false)}
              className="grid h-7 w-7 shrink-0 place-items-center text-black/70 transition-colors hover:text-black"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-4">
            <p className="border border-border bg-background/50 p-3 text-sm text-foreground/85">
              Halo! Ada yang bisa kami bantu seputar konstruksi atau interior?
            </p>
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-gold mt-3 w-full justify-center !text-xs"
            >
              Mulai Chat <Send size={14} />
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Tutup chat WhatsApp" : "Chat via WhatsApp"}
        onClick={() => setOpen((v) => !v)}
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}
