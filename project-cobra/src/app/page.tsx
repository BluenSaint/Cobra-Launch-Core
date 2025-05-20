import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 py-5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-500">
            CobraUnit<span className="text-white">.</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="text-gray-300 hover:text-white">Features</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white">Pricing</Link>
            <Link href="#about" className="text-gray-300 hover:text-white">About</Link>
            <Link href="#contact" className="text-gray-300 hover:text-white">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">Sign Up</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI-Powered Credit Repair, Legally Guaranteed
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
          Dispute inaccuracies, remove errors, and boost your score 2x faster. 100% FCRA/CROA compliant.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-medium">
            Start Free Analysis
          </Link>
          <Link href="#features" className="border border-gray-700 hover:border-gray-600 px-6 py-3 rounded-lg text-lg font-medium">
            Explore Features
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p className="mb-2">© {new Date().getFullYear()} CobraUnit. All rights reserved.</p>
          <p className="text-sm">
            CobraUnit is not a credit repair organization as defined under federal or state law, including the Credit Repair Organizations Act.
            We provide software that helps users identify and dispute potential inaccuracies on their credit reports.
          </p>
        </div>
      </footer>
    </div>
  );
}
