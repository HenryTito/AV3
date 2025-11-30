"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../components/Sidebar/Sidebar";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }) {
  const pathname = usePathname();


  const hideSidebar = pathname === "/" || pathname === "/home";

  return (
    <html lang="pt-br">
      <body style={{ display: "flex", minHeight: "100vh" }}>
        
        <AuthProvider>
          {!hideSidebar && <Sidebar />}

          <main
            style={{
              flex: 1,
              marginLeft: hideSidebar ? 0 : "260px", 
              padding: "0",
              transition: "margin-left 0.3s ease",
            }}
          >
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
