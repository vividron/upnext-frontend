import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

export default function AppLayout() {
  const navLinks = [
    { name: "Rooms", to: "#rooms" },
    { name: "Features", to: "#features" },
    { name: "Applications", to: "#applications" }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-surface-lowest text-main select-none">

      <NavBar navLinks={navLinks} />

      <main className="relative flex-1 px-4 py-6 lg:px-8 lg:py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(30,214,94,0.12),transparent_30%)]"/>
        <Outlet />
      </main>

      <Footer navLinks={navLinks} />

    </div>
  );
}