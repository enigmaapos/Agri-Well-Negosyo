// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-8 px-4 text-center">
      <p>&copy; {new Date().getFullYear()} Agri-Well Negosyo. All rights reserved.</p>
      <p className="text-sm mt-2">Connect with us: agriwell@example.com</p>
    </footer>
  );
}
