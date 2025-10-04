// frontend/components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-lg">
        <Link href="/">AI Product App</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
