import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileCallBar from "./MobileCallBar";
import WhatsAppButton from "./WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 pb-14 md:pb-0">{children}</main>
      <Footer />
      <MobileCallBar />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
