// import logo from "../public/logo.png";
// import x from "../public/x-logo.png";
// import linked from "../public/linkenid.png";
// import fb from "../public/facebook.png";

import fb from "../assets/facebook.png";
import linked from "../assets/linkenid.png";
import x from "../assets/x-logo.png";
import logo from "../assets/ACEDH.png";

import { useLocation } from "react-router";
import { useState } from "react";
import { X } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Ressources", href: "/resource" },
    { label: "Programmes", href: "/programs" },
    { label: "Rapports", href: "/rapports" },
    { label: "Actualités", href: "/blogs" },
    { label: "Galerie", href: "/galeries" },
  ];

  const menuItemsMobile = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Ressources", href: "/resource" },
    { label: "Programmes", href: "/programs" },
    { label: "Rapports", href: "/rapports" },
    { label: "Actualités", href: "/blogs" },
    { label: "Galerie", href: "/galeries" },
    { label: "Contacts", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-green-900 p-1.5">
        <div className="flex justify-between w-[70%] m-auto max-sm:w-[97%]">
          <span className="max-sm:text-[14px] text-white">
            info@acedh-rdc.org
          </span>
          <div className="flex items-center">
            <a
              href="https://www.linkedin.com/in/acedh-rdc-178821325?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              className="mx-2"
            >
              <img src={linked} alt="Facebook" width={30} height={30} />
            </a>
            <a
              href="https://x.com/ACEDH_Officiel"
              target="_blank"
              className="mx-2"
            >
              <img src={x} alt="Twitter" width={30} height={30} />
            </a>
            <a
              href="https://www.facebook.com/share/18SZdyeYyU/"
              target="_blank"
              className="mx-2"
            >
              <img src={fb} alt="Facebook" width={25} height={25} />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto w-[70%] max-sm:w-[97%]">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-2xl font-bold text-green-800">
              <img src={logo} alt="" width={80} height={80} />
            </a>
          </div>
          <nav className="hidden lg:flex space-x-6">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  // className="text-gray-700 hover:text-green-600 transition-colors whitespace-nowrap"
                  className={`transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-orange-900 font-semibold border-b-2 border-orange-900 pb-1"
                      : "text-gray-700 hover:text-orange-900"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          {/* Menu mobile */}
          <div className="lg:hidden md:hidden">
            <button className="text-gray-700" onClick={() => setOpen(true)}>
              {open ? (
                <X className="size-6" onClick={() => setOpen(!open)} />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <a
            href="/contact"
            className="hidden md:block bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors"
          >
            Contact
          </a>
        </div>
        {open && (
          <nav className="max-sm:grid max-sm:grid-cols-1 space-y-3 mt-3 lg:hidden">
            {menuItemsMobile.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  // className="text-gray-700 hover:text-green-600 transition-colors whitespace-nowrap"
                  className={`transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-orange-900 font-semibold border-orange-900 pb-1"
                      : "text-gray-700 hover:text-orange-900"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
