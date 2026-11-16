import { ChatBot } from "@/components/chat/ChatBot";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    // Bottom padding keeps the footer clear of the sticky mobile action bar.
    <div className="flex min-h-dvh flex-col overflow-x-clip pb-[calc(4.75rem+env(safe-area-inset-bottom))] xl:pb-0">
      <a
        href="#main-content"
        className="sr-only z-[70] rounded-lg bg-white px-4 py-3 text-sm font-semibold text-navy-deep shadow-lift focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="page-enter w-full min-w-0 flex-1 outline-none">
        {children}
      </main>
      <Footer />
      <MobileActionBar />
      <WhatsAppFloat />
      <ChatBot />
    </div>
  );
}
