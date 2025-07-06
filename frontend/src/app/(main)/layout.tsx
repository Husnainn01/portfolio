import { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import BackgroundProvider from "../../components/BackgroundProvider";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Galaxy background for main website */}
      <BackgroundProvider />
      <Navbar />
      <main className="pt-20 bg-darkBlue text-white min-h-screen">
        {children}
      </main>
    </>
  );
} 