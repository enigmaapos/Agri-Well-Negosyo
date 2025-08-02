import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="#home" className="text-2xl font-bold text-green-700">
          AgriWell
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
          <li><Link href="#home">Home</Link></li>
          <li><Link href="#about">About</Link></li>
          <li><Link href="#features">Features</Link></li>
          <li><Link href="#join">Join Us</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white px-4 pb-4 space-y-3 font-medium text-gray-700">
          <li><Link href="#home" onClick={toggleMenu}>Home</Link></li>
          <li><Link href="#about" onClick={toggleMenu}>About</Link></li>
          <li><Link href="#features" onClick={toggleMenu}>Features</Link></li>
          <li><Link href="#join" onClick={toggleMenu}>Join Us</Link></li>
        </ul>
      )}
    </nav>
  );
}