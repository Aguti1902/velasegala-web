import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/Chatbot";
import { CookieConsent } from "@/components/CookieConsent";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main className="min-h-screen pt-[120px] lg:pt-0">{children}</main>
      <Footer />
      <Chatbot />
      <CookieConsent />
    </>
  );
}

